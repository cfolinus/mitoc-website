// Builds the bunkhouse content-review .docx and a label→source map from the site's source files.
//
// Usage (from this folder):
//   npm install        # first time only; installs docx + jszip into ./node_modules
//   npm run build      # or: node make_content_doc.js
//
// Writes ../bunkhouse-content-review.docx and ../bunkhouse-content-map.json, overwriting both.
// Set OUT_DIR to write them somewhere else (e.g. a scratch folder, for testing).
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
const OUTDIR = path.resolve(process.env.OUT_DIR || path.resolve(__dirname, '..'));
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
const money = n => '$' + Number(n).toLocaleString('en-US');

// ---------- key facts and other settings ----------
// Facts live under `facts:` in bunkhouse_settings.yml. The site inserts them with
// %key% (in bunkhouse_faqs.yml) or {{ site.data.bunkhouse_settings.facts.key }} (pages, includes).
// Pages can also print other settings, e.g. {{ site.data.bunkhouse_settings.donations_goal |
// minus: site.data.bunkhouse_settings.donations_amount | thousands_separated }}.
// The doc shows the values; the content map records which settings each label uses,
// so an edit to one of them is applied to bunkhouse_settings.yml, not the page.
const FACTS_SET = S.facts || {};
const PREFIX = 'site.data.bunkhouse_settings.';
const SETTING_RE = /\{\{\s*site\.data\.bunkhouse_settings\.([\w.]+)\s*((?:\|[^}]*)?)\}\}/g;
const getPath = p => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), S);
function evalSetting(p, filters) {
  let v = getPath(p);
  if (v === undefined) return null;
  for (const f of filters.split('|').map(x => x.trim()).filter(Boolean)) {
    let m;
    if ((m = f.match(/^minus:\s*(\S+)$/))) v = Number(v) - Number(m[1].startsWith(PREFIX) ? getPath(m[1].slice(PREFIX.length)) : m[1]);
    else if (f === 'thousands_separated') v = Number(v).toLocaleString('en-US');
    else return null; // unknown filter: leave the Liquid visible so it gets noticed
  }
  return String(v);
}
const expand = t => t
  .replace(/%(\w+)%/g, (m, k) => (k in FACTS_SET ? FACTS_SET[k] : m))
  .replace(SETTING_RE, (m, p, f) => evalSetting(p, f) ?? m);
const settingsIn = t => [...new Set([
  ...[...t.matchAll(/%(\w+)%/g)].map(m => m[1]).filter(k => k in FACTS_SET).map(k => `facts.${k}`),
  ...[...t.matchAll(SETTING_RE)].flatMap(m => [m[1], ...[...m[2].matchAll(/site\.data\.bunkhouse_settings\.([\w.]+)/g)].map(x => x[1])]),
])];
const withFacts = (entry, raw) => {
  const keys = settingsIn(raw);
  return keys.length ? {...entry, snapshot: expand(raw), settings: keys.map(k => `bunkhouse_settings.yml ${k}`)} : entry;
};

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
  text = expand(text.replace(/%donate_link%/g, S.donate_link).replace(/%donate_page%/g, S.donate_page).replace(/\{:[^}]*\}/g, '')).replace(/<br\s*\/?>/g, '').replace(/---/g, '—').replace(/\s*\n\s*/g, ' ');
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
    if (/^<\/?figure\b/.test(t) || /^(-{3,}|\*{3,})$/.test(t)) { flush(); continue; } // figure wrappers, horizontal rules
    let m;
    if ((m = t.match(/^<figcaption>(.*)<\/figcaption>$/))) { flush(); paras.push({type: 'caption', text: m[1]}); continue; }
    if ((m = t.match(/^<img\s+src="([^"]+)"\s+alt="([^"]*)"/))) { flush(); paras.push({type: 'img', src: m[1], alt: m[2]}); continue; }
    if ((m = t.match(/^\*\s+(.*)/))) { flush(); paras.push({type: 'li', text: m[1]}); continue; }
    if ((m = t.match(/^>\s*(.*)/))) { flush(); paras.push({type: 'quote', text: m[1]}); continue; }
    if ((m = t.match(/^(#+)\s+(.*)/))) { flush(); paras.push({type: 'h', text: m[2]}); continue; }
    buf.push(t);
  }
  flush();
  return paras;
}
// {% include bunkhouse_summary.html part='why' index=1 %} prints a piece of the shared summary.
// In the doc it shows as a pointer to that piece's label (SUM-n), where it's edited once.
const shared = t => t.replace(/\{%-?\s*include bunkhouse_summary\.html\s+part='(\w+)'(?:\s+index=(\d))?\s*-?%\}/g,
  (m, part, i) => `[shared text: SUM-${part === 'why' ? Number(i) + 2 : 1}]`);
function body(mdFile) { return shared(read(mdFile).replace(/^---[\s\S]*?\n---\n/, '')); }

// ---------- builders ----------
const children = [];
const P = (runs, opts = {}) => new Paragraph({children: Array.isArray(runs) ? runs : [new TextRun(runs)], ...opts});
const H1 = t => new Paragraph({heading: HeadingLevel.HEADING_1, children: [new TextRun(t)]});
const H2 = t => new Paragraph({heading: HeadingLevel.HEADING_2, children: [new TextRun(t)]});
const note = t => P([new TextRun({text: t, italics: true, color: GREY, size: 20})], {spacing: {after: 160}});

function label(id, where, file, locator, snapshot) {
  manifest.push(withFacts({id, where, file, locator, snapshot}, snapshot));
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
    else if (it.type === 'caption') runs = [new TextRun({text: 'Caption: ', italics: true, color: GREY}), ...inline(it.text)];
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
  ['Nightly fee', 'What nightly fee will the bunkhouse charge? The FAQ now says "modest user fees" with no number. (The current cabin fee on the rentals page is $10 per person per night.)', 'FAQ-cost-3'],
  ['Phase 0 and the $1.3M', `Does the ${FACTS_SET.total_cost} include the initial design work with Maclay Architects (Phase 0, 2019–21)? The site now says it covers Phases 1 and 2. Phase 1 (${FACTS_SET.phase1_raised}) plus Phase 2 (${FACTS_SET.phase2_cost}) adds up to the total, which suggests Phase 0 was paid for separately.`, 'FAQ-cost-2'],
  ['If the goal is not reached', `The site says the full ${FACTS_SET.total_cost} is needed before groundbreaking in ${FACTS_SET.groundbreaking}. What happens if it isn't raised by then: does construction move to 2028? What happens if bids come in above the estimate?`, 'FAQ-timeline-2'],
  ['Phase 1 donors', `The site says donors gave ${FACTS_SET.phase1_raised} for Phase 1. Was that the amount raised, or Phase 1's final cost? The overview thanks Phase 1 donors as a group. Should they be thanked by name anywhere?`, 'SET-raised'],
  ['Giving options', `Which non-cash and pledge options (stock, donor-advised funds, IRA distributions, multi-year pledges) does MIT support for fund ${FACTS_SET.fund_number}? Who is the named contact for larger gifts? Is there any donor recognition or naming policy?`, 'DON-h-3'],
  ['Matching', 'What should employer-matching donors enter in their company\'s matching portal (recipient, designation)? Can MIT provide a link for this?', 'DON-h-1'],
  ['Photos and data', 'Are there photos of the finished Phase 1 work (bridge, parking lot, trail)? Can the cabin managers provide usage figures (visitor-nights per year, trips, capacity before and after the loft closure)?', 'HOME-7'],
  ['Volunteering', 'What in-person or skills-based help is the project actually looking for?', 'FAQ-timeline-5'],
  ['Gift amount', 'The online form opens with $1,000 already filled in. Keep that, lower it, or leave the amount blank?', 'SET-amount'],
  ['Rentals parking (for the cabin managers)', 'The rentals page now describes the new gravel lot. Are the rest of its parking instructions ("entirely off the pavement", "park as close as possible to other cars") still right?', 'RENT-parking'],
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
  'Start with Part 1, Key facts. These are the values you agreed in the last review, as the website now states them. If any is wrong, write the correction in the right-hand column.',
  'Answer the open questions in Part 2. Each one also appears as a comment next to the text it affects in Part 3.',
  'Edit the website text in Part 3 freely. You can rewrite, delete, reorder, or add new paragraphs and FAQ questions.',
  'Leave the small grey labels like [HOME-1] in place. They tell the maintainer where each piece of text lives on the website. To remove a block, delete its text and keep the label, or add a comment saying "delete".',
  'For new text, add a line like "NEW: after HOME-3" or "NEW FAQ in Cost and funding", then the text.',
  'Use comments for questions, disagreements, and ideas about layout or images. Layout can\'t be edited in this document, but comments about it are welcome.',
  'Bold text and links carry over to the website. Other formatting (fonts, colors, sizes, highlighting) is ignored.',
  'When the review is finished, download the file as Word (in Google Docs: File → Download → Microsoft Word) and send it to the website maintainer.',
];
steps.forEach(s => children.push(new Paragraph({numbering: {reference: 'steps', level: 0}, children: inline(s)})));
children.push(P([new TextRun({text: 'What\'s in this document: ', bold: true}), new TextRun('Part 1 lists the key facts as the website now states them. Part 2 lists the questions that are still open for the committee. Part 3 has all the bunkhouse wording on the website, grouped by where it appears: the header on every bunkhouse page, the three bunkhouse pages, the fundraising banner shown on every main-site page, and related text on the Camelot rentals page.')], {spacing: {before: 160}}));

// ---------- Part 1: key facts ----------
children.push(new Paragraph({children: [new PageBreak()]}));
children.push(H1('Part 1. Key facts'));
children.push(P('Each row is a fact as the website states it now. Every page that mentions a fact uses the same value, so a correction here fixes it everywhere. Write "OK" or a correction in the right-hand column.'));
const fx = k => FACTS_SET[k] || '(not set)';
const FACTS = [
  ['Total cost and fundraising goal', `${fx('total_cost')}, estimated in 2026 from contractors' quotes on the finished construction drawings`],
  ['What the total covers', 'Phases 1 and 2: parking lot, access trail and bridge, site prep, the bunkhouse, and design and project support (FAQ-cost-2)'],
  ['Phases', 'Phase 0: initial design (2019–21). Phase 1: parking lot, bridge, trail, and construction drawings (2022–25). Phase 2: the bunkhouse (2026–27). (FAQ-timeline-1)'],
  ['Phase 1 and Phase 2 amounts', `Phase 1: donors gave ${fx('phase1_raised')}. Phase 2: ${fx('phase2_cost')}.`],
  ['Thermometer', `${money(S.donations_amount)} raised by ${S.number_donors} people, as of ${S.donations_as_of}, toward ${money(S.donations_goal)}. Counts the whole campaign, including pledges. Shows ${money(S.donations_goal - S.donations_amount)} to go.`],
  ['Funding needed before construction', `The full ${fx('total_cost')}`],
  ['Groundbreaking and completion', `Break ground in ${fx('groundbreaking')}; complete in ${fx('completion')}; one season, about May to November`],
  ['Existing cabin sleeps now', `${fx('capacity_now')} people (loft, living room, kitchen). Loft reopened after repair; not safe to sleep in within a few years.`],
  ['Bunkhouse', `${fx('bunkhouse_capacity')} people in ${fx('room_count')} rooms of ${fx('room_size')}`],
  ['Cabin to bunkhouse', fx('distance_to_bunkhouse')],
  ['Parking to cabin', fx('walk_from_parking')],
  ['Parking', `Gravel off-street lot with room for ${fx('parking_spaces')} cars`],
  ['Project history', 'Discussed since 2011; MITOC board approval 2013; founding gift 2018; Maclay design 2019–21; fundraising from 2022; Groton approval June 2023; Phase 1 built 2024–25'],
  ['Nightly fee for the bunkhouse', 'Not stated (open question 1)'],
  ['Contact', 'mitoc-bunkhouse@mit.edu'],
];
const W = [2300, 4460, 2600];
const border = {style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF'};
const borders = {top: border, bottom: border, left: border, right: border};
const cell = (t, w, head) => new TableCell({width: {size: w, type: WidthType.DXA}, borders,
  margins: {top: 80, bottom: 80, left: 100, right: 100},
  shading: head ? {type: ShadingType.CLEAR, fill: 'E7E6E6', color: 'auto'} : undefined,
  children: [new Paragraph({children: [new TextRun({text: t, bold: !!head, size: 19})]})]});
children.push(new Table({width: {size: 9360, type: WidthType.DXA}, columnWidths: W, rows: [
  new TableRow({tableHeader: true, children: [cell('Fact', W[0], true), cell('What the website says now', W[1], true), cell('OK, or correction', W[2], true)]}),
  ...FACTS.map(([f, s]) => new TableRow({children: [cell(f, W[0]), cell(s, W[1]), cell('', W[2])]})),
]}));

// ---------- Part 2: open questions ----------
children.push(H1('Part 2. Open questions'));
children.push(P('These are still open after the last review. Please write the answer under each question.'));
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
block('HERO-1', 'Header: main title', '_data/bunkhouse_settings.yml', 'hero_title', txt(S.hero_title));
block('HERO-2', 'Header: subtitle', '_data/bunkhouse_settings.yml', 'hero_subtitle', txt(S.hero_subtitle));
block('HERO-3', 'Header: second subtitle (overview page only)', '_data/bunkhouse_settings.yml', 'hero_tagline', txt(S.hero_tagline));
block('SET-raised', 'Thermometer: amount raised (updated by hand)', '_data/bunkhouse_settings.yml', 'donations_amount', txt(money(S.donations_amount)));
block('SET-donors', 'Thermometer: number of donors, shown as "RAISED BY ___ PEOPLE"', '_data/bunkhouse_settings.yml', 'number_donors', txt(String(S.number_donors)));
block('SET-goal', 'Thermometer: goal, shown as "Goal: ___". The "$___ to go" next to it is worked out automatically.', '_data/bunkhouse_settings.yml', 'donations_goal', txt(money(S.donations_goal)));
block('SET-asof', 'Thermometer: date shown as "As of ___" (update whenever the amounts change)', '_data/bunkhouse_settings.yml', 'donations_as_of', txt(String(S.donations_as_of)));
block('HERO-note', 'Header: line under the thermometer on the overview page (other pages show only the date)', '_layouts/bunkhouse.html', '.donations-note', txt(`As of ${S.donations_as_of} · Gifts of every size count`));
block('SET-share', 'Link preview text: shown when a bunkhouse page is shared in Slack, email, or social posts, and often under the page in search results', '_data/bunkhouse_settings.yml', 'share_description', txt(S.share_description));
block('HERO-donate', 'Header: button label (opens the Donate page; on the Donate page itself it reads "Give online" and opens the MIT giving form)', '_layouts/bunkhouse.html', '.bunkhouse-donate-button text', txt('Donate'));
const amt = (S.donate_link.match(/amount=(\d+)/) || [])[1];
block('SET-amount', 'Amount pre-filled on the MIT giving form when someone clicks Donate', '_data/bunkhouse_settings.yml', 'donate_link amount= parameter', txt(amt ? money(amt) : '(none)'));
children.push(label('NAV', 'Menu items at the top of every bunkhouse page, in order', '_data/bunkhouse_settings.yml', 'menu[].title',
  S.menu.map(m => m.title).join(' | ')));
S.menu.forEach(m => children.push(new Paragraph({numbering: {reference: 'bullets', level: 0}, children: [new TextRun(m.title)]})));

// A2. Shared summary
children.push(H2('A2. Shared summary text (Home, About, and the banner)'));
children.push(note('Edit this text here once. It appears on the Home page, at the top of two sections on the About page, and in the first paragraph of the fundraising banner. Where those pages show "[shared text: SUM-n]", this is the text.'));
block('SUM-1', 'Shared summary: what Camelot is (Home, About "Camelot today", banner)', '_data/bunkhouse_settings.yml', 'summary.what_is_camelot', txt(S.summary.what_is_camelot));
S.summary.why.forEach((w, i) =>
  block(`SUM-${i + 2}`, `Shared summary: reason ${i + 1} for a new bunkhouse (Home bullet, About "Why a new bunkhouse")`, '_data/bunkhouse_settings.yml', `summary.why[${i}]`, txt(w)));

// B. Home
children.push(H2('B. Home page (mitoc.mit.edu/camelot)'));
children.push(note('Appears below the header. A short pitch, with a link to the About page for the full story. Once the Updates page has posts, a "Latest update" section appears between "Where things stand" and "Help build it".'));
let hp = 0, hh = 0, hi = 0;
blocks(body('_pages/camelot/index.md')).forEach(b => {
  const kind = b.type === 'li' ? 'list item' : 'paragraph';
  if (b.type === 'h') { hh++; block(`HOME-h-${hh}`, `Home page, section heading ${hh}`, '_pages/camelot/index.md', `## heading #${hh}`, [b]); }
  else if (b.type === 'img') { hi++; block(`HOME-img-${hi}`, `Home page, image ${hi}`, '_pages/camelot/index.md', `<img> #${hi}`, [b]); }
  else if (b.type === 'caption') block(`HOME-cap-${hi}`, `Home page, caption for image ${hi}`, '_pages/camelot/index.md', `<figcaption> #${hi}`, [b]);
  else { hp++; block(`HOME-${hp}`, `Home page, ${kind} ${hp}`, '_pages/camelot/index.md', `${kind} ${hp}`, [b]); }
});

// B2. About page
children.push(H2('B2. About page (mitoc.mit.edu/camelot/about)'));
children.push(note('The full story, under headings: Camelot today, why a new bunkhouse, the plan, a timeline, what the money pays for, and who is leading. Items marked with a check mark in the timeline are done.'));
block('AB-title', 'About page title (page heading and browser tab title)', '_pages/camelot/about.md', 'front matter title', txt('About'));
let ap = 0, ah = 0, ai = 0;
blocks(body('_pages/camelot/about.md')).forEach(b => {
  if (b.type === 'h') { ah++; block(`AB-h-${ah}`, `About page, section heading ${ah}`, '_pages/camelot/about.md', `## heading #${ah}`, [b]); }
  else if (b.type === 'img') { ai++; block(`AB-img-${ai}`, `About page, image ${ai}`, '_pages/camelot/about.md', `<img> #${ai}`, [b]); }
  else if (b.type === 'caption') block(`AB-cap-${ai}`, `About page, caption for image ${ai}`, '_pages/camelot/about.md', `<figcaption> #${ai}`, [b]);
  else { ap++; block(`AB-${ap}`, `About page, ${b.type === 'li' ? 'list item' : 'paragraph'} ${ap}`, '_pages/camelot/about.md', `${b.type === 'li' ? 'list item' : 'paragraph'} ${ap}`, [b]); }
});

// C. Project details
children.push(H2('C. Project details page (mitoc.mit.edu/camelot/project)'));
children.push(note('Appears below the header. Each section has a heading, then text and an architectural drawing with a caption. The alt text after each image is read aloud by screen readers.'));
// Prose paragraphs keep the numbering PR-1, PR-2, … that earlier versions of this doc used.
let pn = 0, im = 0, hn = 0;
block('PR-title', 'Project page title (page heading and browser tab title)', '_pages/camelot/project.md', 'front matter title', txt('Project details'));
blocks(body('_pages/camelot/project.md')).forEach(b => {
  if (b.type === 'h') { hn++; block(`PR-h-${hn}`, `Project page, section heading ${hn}`, '_pages/camelot/project.md', `## heading #${hn}`, [b]); }
  else if (b.type === 'img') { im++; block(`PR-img-${im}`, `Project page, image ${im}`, '_pages/camelot/project.md', `<img> #${im}`, [b]); }
  else if (b.type === 'caption') block(`PR-cap-${im}`, `Project page, caption for image ${im}`, '_pages/camelot/project.md', `<figcaption> #${im}`, [b]);
  else { pn++; block(`PR-${pn}`, `Project page, paragraph ${pn}`, '_pages/camelot/project.md', `paragraph ${pn}`, [b]); }
});

// C2. Donate page
children.push(H2('C2. Donate page (mitoc.mit.edu/camelot/donate)'));
children.push(note('Every Donate button on the site opens this page. Its first item is the "Give online" button, which opens MIT\'s giving form. The page title, "Ways to give", is followed by these sections.'));
block('DON-title', 'Donate page title (page heading and browser tab title)', '_pages/camelot/donate.md', 'front matter title', txt('Ways to give'));
let dp = 0, dh = 0;
blocks(body('_pages/camelot/donate.md')).forEach(b => {
  if (b.type === 'h') { dh++; block(`DON-h-${dh}`, `Donate page, section heading ${dh}`, '_pages/camelot/donate.md', `## heading #${dh}`, [b]); }
  else { dp++; block(`DON-${dp}`, `Donate page, ${dp === 1 ? 'button label' : 'paragraph ' + dp}`, '_pages/camelot/donate.md', `paragraph ${dp}`, [b]); }
});

// D. FAQ
children.push(H2('D. FAQ page (mitoc.mit.edu/camelot/faqs)'));
children.push(note('The page title is followed by a row of buttons, one per group, that jump to that group. Each group heading below is also its button label. Questions are shown in bold.'));
block('FAQ-title', 'FAQ page title (also the browser tab title)', '_pages/camelot/faqs.md', 'front matter title', txt('Frequently asked questions'));
data.faqs.forEach(g => {
  block(`FAQ-${g.id}`, `FAQ group heading (also the jump button). Page link: /camelot/faqs#${g.id}`, '_data/bunkhouse_faqs.yml', `group id=${g.id} title`, txt(g.title));
  g.questions.forEach((q, i) => {
    const id = `FAQ-${g.id}-${i + 1}`;
    const ans = blocks(q.answer);
    const raw = q.question + '\n' + q.answer.trim();
    manifest.push(withFacts({id, where: `FAQ, ${g.title}, question ${i + 1}`, file: '_data/bunkhouse_faqs.yml', locator: `group id=${g.id}, questions[${i}]`, snapshot: raw}, raw));
    children.push(new Paragraph({keepNext: true, spacing: {before: 200, after: 40}, children: [
      new TextRun({text: `[${id}]`, bold: true, color: GREY, size: 16}), new TextRun({text: `  ${g.title}, question ${i + 1}`, color: GREY, size: 16})]}));
    children.push(new Paragraph({keepNext: true, children: inline(q.question, {bold: true})}));
    children.push(...contentParas(id, ans));
  });
});

// E. Homepage banner
children.push(H2('E. Fundraising banner on every main-site page'));
children.push(note('A blue box at the top of every page on the main MITOC site. It starts collapsed: visitors see the title, the first two lines of text (fading out), and a Donate button, and click to expand it. Image alt text: "Drawing of the future cabin".'));
const B = shared(read('_includes/camelot_banner.html'));
const clean = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
block('BAN-title', 'Banner: title', '_includes/camelot_banner.html', '<h3>', txt(clean(B.match(/<h3>([\s\S]*?)<\/h3>/)[1])));
[...B.matchAll(/<p>([\s\S]*?)<\/p>/g)].forEach((m, i) =>
  block(`BAN-${i + 1}`, `Banner: paragraph ${i + 1}`, '_includes/camelot_banner.html', `<p> #${i + 1}`, txt(clean(m[1]))));
block('BAN-links', 'Banner: button and link labels (shown both collapsed and expanded). Donate opens the Donate page; Learn more opens the bunkhouse overview', '_includes/camelot_banner.html', 'links-box and camelot-banner-actions anchors', txt('Donate  |  Learn more'));

// F. Rentals page
children.push(H2('F. Related text on the Camelot rentals page (mitoc.mit.edu/rentals/camelot)'));
children.push(note('This page is mainly about visiting the current cabin. These paragraphs mention the bunkhouse or facts listed in Part 1.'));
const R = blocks(body('_pages/rentals/camelot.md'));
const find = s => R.find(b => b.text && b.text.startsWith(s));
block('RENT-about', 'Rentals page: opening paragraph', '_pages/rentals/camelot.md', 'paragraph starting "Camelot is a rustic cabin"', [find('Camelot is a rustic cabin')]);
block('RENT-parking', 'Rentals page: parking paragraph', '_pages/rentals/camelot.md', 'paragraph starting "The parking lot is"', [find('The parking lot is')]);
block('RENT-fee', 'Rentals page: payment paragraph', '_pages/rentals/camelot.md', 'paragraph starting "To pay for a cabin rental"', [find('To pay for a cabin rental')]);
block('RENT-bunkhouse-heading', 'Rentals page: section heading', '_pages/rentals/camelot.md', '### Bunkhouse project', txt('Bunkhouse project'));
block('RENT-bunkhouse', 'Rentals page: bunkhouse section', '_pages/rentals/camelot.md', 'paragraph starting "MITOC is building a new bunkhouse"', [find('MITOC is building a new bunkhouse')]);

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
    note: 'Maps each [label] in bunkhouse-content-review.docx to where that text lives in the repo. snapshot is the text at generation time, for diffing reviewer edits. settings lists values in bunkhouse_settings.yml that appear in the text; edit those there, not in the page.',
    labels: manifest}, null, 2));
  console.log('labels:', manifest.length, 'comments:', comments.length);
});
