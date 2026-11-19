// Builds the bunkhouse content-review .docx and a label→source map from the site's source files.
//
// Usage (from this folder):
//   npm install        # first time only; installs docx + jszip into ./node_modules
//   npm run build      # or: node make_content_doc.js
//
// Writes ../bunkhouse-content-review.docx and ../bunkhouse-content-map.json, overwriting both.
// Requires Node and Ruby (Ruby is only used to parse the Jekyll YAML data files).
//
// When the site's bunkhouse pages change structure (new pages, new includes), update the
// "DOCUMENT CONTENT" section below. Text changes inside existing files are picked up automatically.
const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');
const JSZip = require('jszip');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, CommentRangeStart, CommentRangeEnd,
  CommentReference, PageBreak,
} = require('docx');

const REPO = path.resolve(__dirname, '../../..');
const OUTDIR = path.resolve(__dirname, '..');
const yaml = file => JSON.parse(execFileSync('ruby', ['-ryaml', '-rjson', '-e', 'puts JSON.dump(YAML.load_file(ARGV[0]))', path.join(REPO, file)], {encoding: 'utf8'}));
const data = {faqs: yaml('_data/bunkhouse_faqs.yml'), settings: yaml('_data/bunkhouse_settings.yml')};
const S = data.settings;
const git = args => execFileSync('git', ['-C', REPO, ...args], {encoding: 'utf8'}).trim();
const COMMIT = git(['rev-parse', '--short', 'HEAD']);
const BRANCH = git(['rev-parse', '--abbrev-ref', 'HEAD']);
const DIRTY = git(['status', '--porcelain', '--', '_pages', '_data', '_layouts', '_includes']) ? ' plus uncommitted changes' : '';
const NOW = new Date();
const ISO_DATE = NOW.toISOString().slice(0, 10);
const LONG_DATE = NOW.toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
const read = p => fs.readFileSync(path.join(REPO, p), 'utf8');

const FONT = 'Arial';
const GREY = '7F7F7F';
const manifest = [];

// ---------- comments ----------
const comments = [];
const commentFor = {}; // label id -> comment id
function addComment(labelId, text) {
  const id = comments.length;
  comments.push({id, author: 'Website review', initials: 'WR', date: NOW,
    children: text.split('\n').map(t => new Paragraph({children: [new TextRun(t)]}))});
  commentFor[labelId] = id;
}

// ---------- inline markdown → runs ----------
function inline(text, base = {}) {
  text = text.replace(/%donate_link%/g, S.donate_link).replace(/---/g, '—').replace(/\s*\n\s*/g, ' ');
  const out = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({text: text.slice(last, m.index), ...base}));
    if (m[1] !== undefined) out.push(...inline(m[1], {...base, bold: true}));
    else out.push(new ExternalHyperlink({link: m[3], children: [new TextRun({text: m[2], style: 'Hyperlink', ...base})]}));
    last = re.lastIndex;
  }
  if (last < text.length) out.push(new TextRun({text: text.slice(last), ...base}));
  return out;
}

// ---------- markdown blocks → paragraphs ----------
function blocks(md) {
  const paras = [];
  const lines = md.split('\n');
  let buf = [];
  const flush = () => { if (buf.length) { paras.push({type: 'p', text: buf.join('\n')}); buf = []; } };
  for (const line of lines) {
    const t = line.trim();
    if (!t) { flush(); continue; }
    if (t.startsWith('{%') || t.startsWith('{:')) { flush(); continue; }
    let m;
    if ((m = t.match(/^<img\s+src="([^"]+)"\s+alt="([^"]*)"/))) { flush(); paras.push({type: 'img', src: m[1], alt: m[2]}); continue; }
    if ((m = t.match(/^\*\s+(.*)/))) { flush(); paras.push({type: 'li', text: m[1]}); continue; }
    if ((m = t.match(/^>\s*(.*)/))) { flush(); paras.push({type: 'quote', text: m[1]}); continue; }
    if ((m = t.match(/^(#+)\s+(.*)/))) { flush(); paras.push({type: 'h', text: m[2]}); continue; }
    buf.push(t);
  }
  flush();
  return paras;
}
function body(mdFile) { return read(mdFile).replace(/^---[\s\S]*?\n---\n/, ''); }

// ---------- builders ----------
const children = [];
const P = (runs, opts = {}) => new Paragraph({children: Array.isArray(runs) ? runs : [new TextRun(runs)], ...opts});
const H1 = t => new Paragraph({heading: HeadingLevel.HEADING_1, children: [new TextRun(t)]});
const H2 = t => new Paragraph({heading: HeadingLevel.HEADING_2, children: [new TextRun(t)]});
const note = t => P([new TextRun({text: t, italics: true, color: GREY, size: 20})], {spacing: {after: 160}});

function label(id, where, file, locator, snapshot) {
  manifest.push({id, where, file, locator, snapshot});
  return new Paragraph({keepNext: true, spacing: {before: 200, after: 40},
    children: [new TextRun({text: `[${id}]`, bold: true, color: GREY, size: 16}),
      new TextRun({text: `  ${where}`, color: GREY, size: 16})]});
}
// content paragraph, wrapping comment range around the first paragraph of a labelled block if requested
function contentParas(labelId, items, opts = {}) {
  const out = [];
  items.forEach((it, i) => {
    let runs, popts = {};
    if (it.type === 'img') {
      runs = [new TextRun({text: `[Image: ${path.basename(it.src)}]  Alt text: `, italics: true, color: GREY}), new TextRun(it.alt)];
    } else if (it.type === 'li') { runs = inline(it.text, opts.base); popts = {numbering: {reference: 'bullets', level: 0}}; }
    else if (it.type === 'quote') { runs = inline(it.text, opts.base); popts = {indent: {left: 720}, spacing: {after: 0}}; }
    else runs = inline(it.text, opts.base);
    if (i === 0 && commentFor[labelId] !== undefined) {
      const c = commentFor[labelId];
      runs = [new CommentRangeStart(c), ...runs, new CommentRangeEnd(c), new TextRun({children: [new CommentReference(c)]})];
    }
    out.push(new Paragraph({children: runs, ...popts}));
  });
  return out;
}
function block(id, where, file, locator, items, opts) {
  const snap = items.map(i => i.type === 'img' ? `[img ${i.src}] ${i.alt}` : i.text).join('\n');
  children.push(label(id, where, file, locator, snap), ...contentParas(id, items, opts));
}
const txt = t => [{type: 'p', text: t}];

// ---------- comments for open questions (anchored to relevant blocks) ----------
const QUESTIONS = [
  ['Money', 'Does the $468K raised include funds already spent on Phase 1? What is the current Phase 2 budget, and has the $1.3M estimate been updated since 2022?', 'SET-raised'],
  ['Schedule', 'What funding level, and by what date, lets construction start? Is "Coming 2027" the completion target or the start?', 'HERO-2'],
  ['Thermometer', 'Should the thermometer show Phase 2 only or the whole campaign? Received money only, or pledges too?', 'SET-goal'],
  ['Giving options', 'Which non-cash and pledge options (stock, donor-advised funds, IRA distributions, multi-year pledges) does MIT support for fund 3892696? Who is the named contact for larger gifts? Is there any donor recognition or naming policy?', 'FAQ-donating'],
  ['Matching', 'What should employer-matching donors enter in their company\'s matching portal (recipient, designation)? Can MIT provide a link for this?', 'FAQ-donating-1'],
  ['Capacity and fee', 'How many people can sleep at Camelot now, and is the planned bunkhouse fee $10 or $20 per person per night?', 'FAQ-cost-3'],
  ['Photos and data', 'Are there photos of the finished Phase 1 work (bridge, parking lot, trail)? Can the cabin managers provide usage figures (visitor-nights per year, trips, capacity before and after the loft closure)?', 'OV-3'],
  ['Volunteering', 'What in-person or skills-based help is the project actually looking for?', 'FAQ-timeline-4'],
  ['Ownership', 'Who will write posts for a new bunkhouse Updates page and keep the thermometer current? What\'s the minimum schedule (for example, quarterly plus each milestone)? Who sends the matching email announcement?', 'SET-raised'],
];
QUESTIONS.forEach(([t, q, anchor], i) => {
  const existing = commentFor[anchor];
  const text = `Open question Q${i + 1} (${t}): ${q}`;
  if (existing === undefined) addComment(anchor, text);
  else comments[existing].children.push(new Paragraph({children: [new TextRun('')]}), new Paragraph({children: [new TextRun(text)]}));
});

// ================= DOCUMENT CONTENT =================
children.push(new Paragraph({heading: HeadingLevel.TITLE, children: [new TextRun('Camelot bunkhouse website: content review')]}));
children.push(note(`Snapshot of the website text as of ${LONG_DATE} (branch ${BRANCH}, commit ${COMMIT}${DIRTY}). Changes made to the website after this date are not reflected here.`));

children.push(H1('How to use this document'));
const steps = [
  'Turn on suggestion mode before editing. In Google Docs, click the pencil icon at the top right and choose Suggesting. In Word, go to Review → Track Changes.',
  'Start with Part 1, Key facts. Fill in the "Agreed value" column. Many pages state these facts differently today, and the website maintainer will make every page match the agreed values.',
  'Answer the open questions in Part 2. Each one also appears as a comment next to the text it affects in Part 3.',
  'Edit the website text in Part 3 freely. You can rewrite, delete, reorder, or add new paragraphs and FAQ questions.',
  'Leave the small grey labels like [OV-1] in place. They tell the maintainer where each piece of text lives on the website. To remove a block, delete its text and keep the label, or add a comment saying "delete".',
  'For new text, add a line like "NEW: after OV-3" or "NEW FAQ in Cost and funding", then the text.',
  'Use comments for questions, disagreements, and ideas about layout or images. Layout can\'t be edited in this document, but comments about it are welcome.',
  'Bold text and links carry over to the website. Other formatting (fonts, colors, sizes, highlighting) is ignored.',
  'When the review is finished, download the file as Word (in Google Docs: File → Download → Microsoft Word) and send it to the website maintainer.',
];
steps.forEach(s => children.push(new Paragraph({numbering: {reference: 'steps', level: 0}, children: inline(s)})));
children.push(P([new TextRun({text: 'What\'s in this document: ', bold: true}), new TextRun('Part 1 lists the key facts to agree on. Part 2 lists open questions for the committee. Part 3 has all the bunkhouse wording on the website, grouped by where it appears: the header on every bunkhouse page, the three bunkhouse pages, the fundraising banner shown on every main-site page, and related text on the Camelot rentals page.')], {spacing: {before: 160}}));

// ---------- Part 1: key facts ----------
children.push(new Paragraph({children: [new PageBreak()]}));
children.push(H1('Part 1. Key facts'));
children.push(P('Each row is a fact that appears on the website. The middle column shows what the site says now and where (labels refer to Part 3). Please fill in the right-hand column with the correct value, or write "remove" if the fact shouldn\'t appear on the site.'));
const FACTS = [
  ['Total cost of the bunkhouse', '"$1.3 million total costs" (OV-4); "$1.3 million" (FAQ-cost-1, BAN-2)'],
  ['What the $1.3M covers', 'OV-4 calls it the total. FAQ-cost-2 says it excludes design work, the parking lot, and the trail.'],
  ['Is the $1.3M estimate still current?', 'FAQ-cost-1: based on Dartmouth bunkhouses; decision made despite COVID-era cost uncertainty (wording from 2022).'],
  ['Meaning of "Phase 1"', 'OV-3: bridge, parking lot, and access trail. FAQ-cost-2: design work with Maclay Architects.'],
  ['Meaning of "Phase 2"', 'OV-4: bunkhouse construction.'],
  ['Amount raised, number of donors, and "as of" date', '$468,000 from 314 people (SET-raised, SET-donors). No date shown.'],
  ['What the thermometer counts', 'Not stated: Phase 2 only or the whole campaign? Received money only, or pledges too?'],
  ['Fundraising goal', '$1,300,000 (SET-goal)'],
  ['Groundbreaking for the bunkhouse', '"breaking ground in 2027" (OV-4); "erected in summer 2027" (FAQ-timeline-1)'],
  ['Completion date', '"Coming 2027" (HERO-2); "could be finished in 2027" (FAQ-timeline-2); "complete … in 2027" (BAN-3)'],
  ['Funding needed before construction can start', 'Not stated anywhere.'],
  ['Nightly fee', '"about $20 per person per night in accordance with MITOC\'s current practices" (FAQ-cost-3); "$10.00 per person per night" (RENT-fee)'],
  ['How many people the existing cabin can sleep now', 'Loft closed; cabin can\'t safely sleep a large group (FAQ-why-2, FAQ-why-5). "can accommodate groups of 40 or more" (RENT-about)'],
  ['Bunkhouse capacity', '50 people in five rooms of 10 (OV-1, PR-2, BAN-2). Consistent.'],
  ['Distance from cabin to bunkhouse', '"a few hundred yards" (OV-1); "about 100 meters" (PR-1, BAN-2)'],
  ['Walk from parking to the cabin', '"about 200 meters" (FAQ-building-4); "about 1000 feet" (RENT-about)'],
  ['Parking', 'New off-street lot built (FAQ-building-3, OV-3). "a dirt pull-off at the side of the road" (RENT-parking)'],
  ['When the project began', '"in discussion for almost a decade", "kick-started in 2018" (OV-2); "Since 2013" (BAN-1)'],
  ['Condition of the existing cabin', '"nearing the end of its useful life" (BAN-1); "serviceable … for another 10-20 years" (FAQ-why-4)'],
  ['Contacts', 'mitoc-bunkhouse@mit.edu (FAQ-people-3). No named contact for larger gifts.'],
];
const W = [2300, 4460, 2600];
const border = {style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF'};
const borders = {top: border, bottom: border, left: border, right: border};
const cell = (t, w, head) => new TableCell({width: {size: w, type: WidthType.DXA}, borders,
  margins: {top: 80, bottom: 80, left: 100, right: 100},
  shading: head ? {type: ShadingType.CLEAR, fill: 'E7E6E6', color: 'auto'} : undefined,
  children: [new Paragraph({children: [new TextRun({text: t, bold: !!head, size: 19})]})]});
children.push(new Table({width: {size: 9360, type: WidthType.DXA}, columnWidths: W, rows: [
  new TableRow({tableHeader: true, children: [cell('Fact', W[0], true), cell('What the site says now (and where)', W[1], true), cell('Agreed value', W[2], true)]}),
  ...FACTS.map(([f, s]) => new TableRow({children: [cell(f, W[0]), cell(s, W[1]), cell('', W[2])]})),
]}));

// ---------- Part 2: open questions ----------
children.push(H1('Part 2. Open questions'));
children.push(P('These came up in the website review and need an answer from the bunkhouse or fundraising committee. Please write the answer under each question.'));
QUESTIONS.forEach(([t, q], i) => {
  children.push(new Paragraph({keepNext: true, spacing: {before: 200, after: 60}, children: [new TextRun({text: `Q${i + 1}. ${t}`, bold: true})]}));
  children.push(new Paragraph({keepNext: true, children: [new TextRun(q)]}));
  children.push(new Paragraph({children: [new TextRun({text: 'Answer: ', bold: true, color: GREY})]}));
});

// ---------- Part 3: website text ----------
children.push(new Paragraph({children: [new PageBreak()]}));
children.push(H1('Part 3. Website text'));

// A. Header on every bunkhouse page
children.push(H2('A. Header shown at the top of every bunkhouse page'));
children.push(note('The big title area over the bunkhouse drawing, with the fundraising thermometer. The site displays the title in capital letters automatically.'));
const L = read('_layouts/bunkhouse.html');
const tag = (t) => L.match(new RegExp(`<${t}>([^<]*)</${t}>`))[1].trim();
block('HERO-1', 'Header: main title', '_layouts/bunkhouse.html', '<h1> in .bunkhouse-banner', txt(tag('h1')));
block('HERO-2', 'Header: subtitle', '_layouts/bunkhouse.html', '<h2> in .bunkhouse-banner', txt(tag('h2')));
block('HERO-3', 'Header: second subtitle', '_layouts/bunkhouse.html', '<h3> in .bunkhouse-banner', txt(tag('h3')));
const money = n => '$' + Number(n).toLocaleString('en-US');
block('SET-raised', 'Thermometer: amount raised (updated by hand)', '_data/bunkhouse_settings.yml', 'donations_amount', txt(money(S.donations_amount)));
block('SET-donors', 'Thermometer: number of donors, shown as "RAISED BY ___ PEOPLE"', '_data/bunkhouse_settings.yml', 'number_donors', txt(String(S.number_donors)));
block('SET-goal', 'Thermometer: goal, shown as "Goal: ___"', '_data/bunkhouse_settings.yml', 'donations_goal', txt(money(S.donations_goal)));
block('HERO-donate', 'Header: button label (links to the MIT giving form)', '_layouts/bunkhouse.html', '.bunkouse-donate-button text', txt('Donate'));
const amt = (S.donate_link.match(/amount=(\d+)/) || [])[1];
block('SET-amount', 'Amount pre-filled on the MIT giving form when someone clicks Donate', '_data/bunkhouse_settings.yml', 'donate_link amount= parameter', txt(amt ? money(amt) : '(none)'));
children.push(label('NAV', 'Menu items at the top of every bunkhouse page, in order', '_data/bunkhouse_settings.yml', 'menu[].title',
  S.menu.map(m => m.title).join(' | ')));
S.menu.forEach(m => children.push(new Paragraph({numbering: {reference: 'bullets', level: 0}, children: [new TextRun(m.title)]})));

// B. Overview
children.push(H2('B. Overview page (mitoc.mit.edu/camelot)'));
children.push(note('Appears below the header. There are currently no section headings on this page.'));
blocks(body('_pages/camelot/index.md')).forEach((b, i) =>
  block(`OV-${i + 1}`, `Overview page, paragraph ${i + 1}`, '_pages/camelot/index.md', `paragraph ${i + 1}`, [b]));

// C. Project details
children.push(H2('C. Project details page (mitoc.mit.edu/camelot/project)'));
children.push(note('Appears below the header. Paragraphs alternate with architectural drawings. The alt text after each image is read aloud by screen readers.'));
let pn = 0, im = 0;
blocks(body('_pages/camelot/project.md')).forEach(b => {
  if (b.type === 'img') { im++; block(`PR-img-${im}`, `Project page, image ${im}`, '_pages/camelot/project.md', `<img> #${im}`, [b]); }
  else { pn++; block(`PR-${pn}`, `Project page, paragraph ${pn}`, '_pages/camelot/project.md', `paragraph ${pn}`, [b]); }
});

// D. FAQ
children.push(H2('D. FAQ page (mitoc.mit.edu/camelot/faqs)'));
children.push(note('The page title is followed by a row of buttons, one per group, that jump to that group. Each group heading below is also its button label. Questions are shown in bold.'));
block('FAQ-title', 'FAQ page title', '_pages/camelot/faqs.md', '## heading', txt('Frequently asked questions'));
data.faqs.forEach(g => {
  block(`FAQ-${g.id}`, `FAQ group heading (also the jump button). Page link: /camelot/faqs#${g.id}`, '_data/bunkhouse_faqs.yml', `group id=${g.id} title`, txt(g.title));
  g.questions.forEach((q, i) => {
    const id = `FAQ-${g.id}-${i + 1}`;
    const ans = blocks(q.answer);
    manifest.push({id, where: `FAQ, ${g.title}, question ${i + 1}`, file: '_data/bunkhouse_faqs.yml', locator: `group id=${g.id}, questions[${i}]`, snapshot: q.question + '\n' + q.answer.trim()});
    children.push(new Paragraph({keepNext: true, spacing: {before: 200, after: 40}, children: [
      new TextRun({text: `[${id}]`, bold: true, color: GREY, size: 16}), new TextRun({text: `  ${g.title}, question ${i + 1}`, color: GREY, size: 16})]}));
    children.push(new Paragraph({keepNext: true, children: inline(q.question, {bold: true})}));
    children.push(...contentParas(id, ans));
  });
});

// E. Homepage banner
children.push(H2('E. Fundraising banner on every main-site page'));
children.push(note('A blue box at the top of every page on the main MITOC site. It starts collapsed: visitors see the title, the first two lines of text (fading out), and a Donate button, and click to expand it. Image alt text: "Drawing of the future cabin".'));
const B = read('_includes/camelot_banner.html');
const clean = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
block('BAN-title', 'Banner: title', '_includes/camelot_banner.html', '<h3>', txt(clean(B.match(/<h3>([\s\S]*?)<\/h3>/)[1])));
[...B.matchAll(/<p>([\s\S]*?)<\/p>/g)].forEach((m, i) =>
  block(`BAN-${i + 1}`, `Banner: paragraph ${i + 1}`, '_includes/camelot_banner.html', `<p> #${i + 1}`, txt(clean(m[1]))));
block('BAN-links', 'Banner: button and link labels (the "Read more" link is only visible after expanding the banner)', '_includes/camelot_banner.html', 'links-box anchors', txt('Donate  |  Read more'));

// F. Rentals page
children.push(H2('F. Related text on the Camelot rentals page (mitoc.mit.edu/rentals/camelot)'));
children.push(note('This page is mainly about visiting the current cabin. These paragraphs mention the bunkhouse or facts listed in Part 1.'));
const R = blocks(body('_pages/rentals/camelot.md'));
const find = s => R.find(b => b.text && b.text.startsWith(s));
block('RENT-about', 'Rentals page: opening paragraph', '_pages/rentals/camelot.md', 'paragraph starting "Camelot is a rustic cabin"', [find('Camelot is a rustic cabin')]);
block('RENT-parking', 'Rentals page: parking paragraph', '_pages/rentals/camelot.md', 'paragraph starting "The parking lot is"', [find('The parking lot is')]);
block('RENT-fee', 'Rentals page: payment paragraph', '_pages/rentals/camelot.md', 'paragraph starting "To pay for a cabin rental"', [find('To pay for a cabin rental')]);
block('RENT-bunkhouse-heading', 'Rentals page: section heading', '_pages/rentals/camelot.md', '### Bunkhouse project', txt('Bunkhouse project'));
block('RENT-bunkhouse', 'Rentals page: bunkhouse section (written around 2018)', '_pages/rentals/camelot.md', 'paragraph starting "As part of our long-term plan"', [find('As part of our long-term plan')]);

// ---------- assemble ----------
const doc = new Document({
  creator: 'MITOC website review',
  title: 'Camelot bunkhouse website: content review',
  comments: {children: comments},
  styles: {
    default: {document: {run: {font: FONT, size: 22}, paragraph: {spacing: {after: 120, line: 276}}}},
    paragraphStyles: [
      {id: 'Title', name: 'Title', basedOn: 'Normal', run: {font: FONT, size: 40, bold: true}, paragraph: {spacing: {before: 0, after: 120}, keepNext: true}},
      {id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: {font: FONT, size: 32, bold: true}, paragraph: {spacing: {before: 360, after: 120}, keepNext: true, outlineLevel: 0}},
      {id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: {font: FONT, size: 26, bold: true, color: '1F3864'}, paragraph: {spacing: {before: 360, after: 80}, keepNext: true, outlineLevel: 1,
        border: {bottom: {style: BorderStyle.SINGLE, size: 6, color: '1F3864', space: 2}}}},
    ],
  },
  numbering: {config: [
    {reference: 'bullets', levels: [{level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: {paragraph: {indent: {left: 720, hanging: 360}}}}]},
    {reference: 'steps', levels: [{level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: {paragraph: {indent: {left: 720, hanging: 360}}}}]},
  ]},
  sections: [{properties: {page: {size: {width: 12240, height: 15840}, margin: {top: 1440, bottom: 1440, left: 1440, right: 1440}}}, children}],
});

// docx-js writes word/fontTable.xml without a relationship to it, which Word can flag as corrupt.
// Add the missing relationship and drop any folder entries from the ZIP.
async function fixUp(buf) {
  const zip = await JSZip.loadAsync(buf);
  const relsPath = 'word/_rels/document.xml.rels';
  let rels = await zip.file(relsPath).async('string');
  if (zip.file('word/fontTable.xml') && !rels.includes('fontTable.xml')) {
    const next = Math.max(0, ...[...rels.matchAll(/Id="rId(\d+)"/g)].map(m => +m[1])) + 1;
    rels = rels.replace('</Relationships>', `<Relationship Id="rId${next}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/></Relationships>`);
    zip.file(relsPath, rels);
  }
  // Delete only the folder entries themselves. zip.remove() on a folder would delete its contents too.
  Object.keys(zip.files).filter(n => zip.files[n].dir).forEach(n => { delete zip.files[n]; });
  return zip.generateAsync({type: 'nodebuffer', compression: 'DEFLATE'});
}

Packer.toBuffer(doc).then(fixUp).then(buf => {
  fs.writeFileSync(path.join(OUTDIR, 'bunkhouse-content-review.docx'), buf);
  fs.writeFileSync(path.join(OUTDIR, 'bunkhouse-content-map.json'), JSON.stringify({
    generated: ISO_DATE, source_commit: COMMIT + (DIRTY ? '+uncommitted' : ''), branch: BRANCH,
    note: 'Maps each [label] in bunkhouse-content-review.docx to where that text lives in the repo. snapshot is the text at generation time, for diffing reviewer edits.',
    labels: manifest}, null, 2));
  console.log('labels:', manifest.length, 'comments:', comments.length);
});
