# Camelot bunkhouse pages: implementation plan

*Updated 2026-11-20 (Stage 4 built). This plan turns [bunkhouse-ux-review.md](bunkhouse-ux-review.md) into batches. R1–R16 are from the review's Part 2, section 6; R17–R21 are from Part 1, section G. The web team's decisions (review section H) are folded in. Stages 0–4 are done; their as-built notes are in the **Appendix** at the end.*

## Where things stand

- **Done, on the local `bunkhouse-edits` branch (nothing pushed yet):** Stages 1–4, covering R1–R4, R7, R10–R12, R14, R17, R18, R19 (minimal), R20, R21, the facts the committee agreed in round 1, and the navbar brand and footer. See the Appendix.
- **The web team has decided the new structure** (review section H): a short Home page, an "About" page at `/camelot/about`, a Donate page that every Donate button opens, "raised by" wording, and Updates owned by the web team.
- **Round-2 doc sent to the committee** (10 open questions). The copy as sent is saved as `bunkhouse-content-review-2026-11-20-sent.docx` and `bunkhouse-content-map-2026-11-20-sent.json`; map returned OV-n, FAQ-donating and FAQ-donating-1 labels through that saved map. The working doc has since been regenerated, so Q5 and Q6 are now attached to DON-h-3 and DON-h-1.
- **Stage 4 is built locally.** Round-2 labels the committee uses map as: OV-1 to OV-4 → HOME-n and AB-n (the old overview text is now About; see `bunkhouse-content-map-2026-11-20-sent.json` for each label's source paragraph); Q7 (photos) is attached to HOME-3.
- **Next to build:** Stage 5a (Updates setup). It doesn't wait on the committee; 5b waits on Phase 1 photos.

| Stage | Batches | Status | Waits on |
|---|---|---|---|
| 0–2 | Questions round 1; quick wins; facts and money | ✅ Done | — |
| 3 | 3a page identity (R20) · 3b share previews (R21) · 3c minimal Donate page (R19) | ✅ Done (local) | — |
| 4 | 4a About (R18) · 4b new Home (R17, R11) · 4c FAQ reshuffle | ✅ Done (local) | — |
| 5 | 5a Updates setup · 5b posts from the last two years · 5c upkeep (R6) | 5a ready; 5b waits on photos | Phase 1 photos (Q7); the web team writes the posts |
| 6 | 6a full Donate page · 6b Get involved · 6c missed-goal answer · 6d usage numbers · 6e small fill-ins | Waiting | The committee's round-2 answers |

Before starting new work, read the **Handoff notes** near the end of this file.

## Target structure

From review Part 1, sections C and H. Each page has one job:

| Page | URL | In menu? | Hero | Job |
|---|---|---|---|---|
| Home | `/camelot` | No (brand link goes here) | Full | The case in a minute, where things stand, and how to give |
| About | `/camelot/about` | Yes, first | Compact | The full story: the cabin, the need, the plan, the timeline, the money, who's leading |
| Updates | `/camelot/updates` | Yes, once it has posts | Compact | Dated progress posts, newest first |
| Project details | `/camelot/project` | Yes | Compact | The building's design (as now) |
| FAQs | `/camelot/faqs` | Yes | Compact | Reference answers (as now, minus the donate and people groups) |
| Donate | `/camelot/donate` | Yes, last, styled as a button | Compact | Ways to give, with "Give online" (MIT's form) first. Every Donate button on the site opens this page. |

Menu order: About · Updates · Project details · FAQs · Donate. Redirects: `/bunkhouse` and `/bunkhouse/*` → `/camelot` (exist); `/camelot/overview` → `/camelot/about` and `/camelot/give` → `/camelot/donate` (new).

## Next steps

1. **Send the round-2 doc to the committee.** Each question unblocks a batch:

   | Round-2 question | Unblocks |
   |---|---|
   | Q1 nightly fee | 6e: FAQ cost-3 (no number shown now) |
   | Q2 whether Phase 0 is inside the $1.3M | 6e: FAQ cost-2 and the phases question |
   | Q3 what happens if the goal isn't met by spring 2027 | 6c: an FAQ entry and a line in the funding section |
   | Q4 Phase 1's $300K, and thanking Phase 1 donors | 6e: funding section |
   | Q5 giving options, Q6 matching | 6a: full Donate page |
   | Q7 photos and usage data | **Most urgent:** 4b Home photo and 5b posts; also 6d (R16) |
   | Q8 volunteering | 6b: Get involved (R13) |
   | Q9 gift preset | 6e: `donate_link` (R9) |
   | Q10 rentals parking (cabin managers) | 6e: rentals parking paragraph |

   *Numbering:* the updates-owner question was removed, so the gift preset and rentals parking questions moved up from Q10 and Q11. Earlier notes in this folder (the review's Part 2, and the Appendix) use the old numbers.

   The doc's labels (OV-n and so on) point at today's pages. If answers come back after Stage 4, map OV-n labels to the new files using the committed `bunkhouse-content-map.json` from this round.

2. **Ask the committee, or the cabin managers directly, for Phase 1 photos now**, separately from the doc if that's faster. They block both Home's "Where things stand" photo and the Updates posts.
3. **Start Stage 5a.** Nothing from Stages 1–4 is pushed; Stage 4 changes what `/camelot` shows, so this is a natural point to push for a deploy preview.
4. **Decisions for the maintainer:**
   - **Blank gift preset:** removing `&amount=1000` from `donate_link` should work, but nobody has checked what MIT's form shows with no amount. Open `https://giving.mit.edu/form/?fundId=3892696` first. Or wait for Q9.
   - **Pushing:** open a PR for Stages 1–2 now, or after Stage 3 or 4. The Stage 4 split changes what `/camelot` shows, so it's a natural point for the web team to look at a deploy preview.

```
Now (no input needed)          Next                        Web team, with photos     As round-2 answers arrive
─────────────────────          ────                        ─────────────────────     ─────────────────────────
3a page identity (R20)         4a About (R18)              5a Updates setup (R6)     6a full Donate (Q5, Q6)
3b share previews (R21)   ──►  4b new Home (R17)     ──►   5b posts, last 2 yrs ──►  6b Get involved (Q8)
3c minimal Donate (R19)        4c FAQ reshuffle            5c upkeep                 6c missed-goal answer (Q3)
                                                                                     6d usage numbers (Q7, R16)
                                                                                     6e small fill-ins
```

**How the batches are cut**
- **Each batch is one PR-sized change** that can ship by itself, reviewed on the local server before the next one starts.
- **No batch waits on content it doesn't need.** Home ships before Updates exists: its "Latest update" slot shows nothing until there are posts. The Donate page ships with only what's known, and grows as the committee answers.
- **Don't change a disputed fact** until the committee has agreed on it (see Handoff notes).

---

## Stage 3: Page identity and a minimal Donate page (done)

*As built, 2026-11-20 (commits `36e6cf4` 3a, `3ef5429` 3b, `e96cb16` 3c, each followed by a regenerated doc and map). Differences from the plan below:*
- *Highlighting the current menu item is opt-in: `navbar.html` takes `highlight_active`, and only `bunkhouse_base.html` sets it, so main-site output is unchanged (checked: identical HTML before and after).*
- *The "MITOC home" navbar link (R20) was dropped at the maintainer's request; the footer link stays. The `menu_right:` idea is not built.*
- *The FAQ page's `faq-top` anchor is an empty `<span>` in faqs.md. The `h1` comes from the layout for every page with a `title:` except `hero: full`.*
- *Share tags are in `bunkhouse_base.html`: the text is `page.description`, else `share_description` in the settings. The image is the exterior rendering, 2000×1123, via `site.url`. A real link-preview test needs a pushed deploy preview and hasn't been done.*
- *`donate_page` is in the settings (a YAML anchor feeds the menu). The `donate_link` anchor is gone. FAQs can use `%donate_page%`.*
- *Donate page copy is the maintainer's draft from the old FAQ answers. Flag for committee: the matching-portal sentence ("search for Massachusetts Institute of Technology as the recipient") and "a member of the committee will reply".*
- *Review doc: Donate page is section C2 (DON-title, DON-h-n, DON-n); labels FAQ-donating-1 and -2 are gone, and SET-share and PR-title were added.*

**Later suggestions (not built):** a one-sentence intro under the Project details heading (review D4); a "MITOC home" link near the top of the navbar (declined for now); test the share previews once the branch is pushed; remove the `amount=1000` preset (Q9).

*The original plan for Stage 3 follows.*

### 3a. Page identity (R20) (one PR, about 2 hours)
- **Tab titles:** in [bunkhouse_base.html](../../_layouts/bunkhouse_base.html), replace the fixed `<title>MITOC - Camelot Bunkhouse</title>` with `{% if page.title %}{{ page.title }} · {% endif %}Camelot bunkhouse · MITOC`. Add `title:` to the front matter of `project.md` ("Project details") and `faqs.md` ("Frequently asked questions"). Home has no `title:`, so it gets "Camelot bunkhouse · MITOC".
- **Visible page heading:** in [bunkhouse.html](../../_layouts/bunkhouse.html), show `page.title` as an `h1` at the top of `.bunkhouse-container`, except when `page.hero == 'full'`. Then remove the FAQ page's own "## Frequently asked questions" heading, keeping the `{: #faq-top}` anchor (move it onto the new `h1`, or onto an empty span) so "Back to top" links still work. Style the `h1` to sit between the compact strip and the first `h2` in size.
- **Current page in the menu:** in [menu-link.html](../../_includes/menu-link.html), add `class="active"` to the `<li>` when the item's href equals `page.url`. Watch the trailing slash: `page.url` for `/camelot/faqs` may be `/camelot/faqs` or `/camelot/faqs.html` depending on the permalink, so compare after removing `.html`. **The main site uses the same include**, so check a few main-site pages too; Bootstrap's `.navbar-inverse .active` style will start appearing there, which is probably welcome but should be checked with the maintainer.
- **Link back to the main site near the top:** add a right-aligned "MITOC home" link to the bunkhouse navbar. One way: a `menu_right:` list in `bunkhouse_settings.yml` that `navbar.html` renders as `<ul class="nav navbar-nav navbar-right">` when the parameter is given. Keep the footer link.
- **Menu cleanup:** delete the commented-out History entry in `bunkhouse_settings.yml`.
- **"Raised by" (D3):** in the funding section of [index.md](../../_pages/camelot/index.md), change "{{number_donors}} people have given or pledged ${{amount}}" to wording like "${{amount}} has been raised by {{number_donors}} people", keeping the Liquid values.
- **Check:** each tab title, the active item on each page at both widths, the phone menu, and the FAQ "Back to top" links.

### 3b. Share previews (R21) (one PR, about 1 hour)
- In `bunkhouse_base.html`, add `<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` (`summary_large_image`).
- Values: `page.description` if set, otherwise a section default from a new `share_description:` in `bunkhouse_settings.yml`. Image: the exterior rendering (`/images/bunkhouse/bunkhouse-exterior-rendering.jpg`) as an absolute URL using `site.url`; check `_config.yml` has `url:` set to the production domain.
- Draft default description (maintainer to approve): "MITOC is building a new bunkhouse at Camelot, its cabin near Rumney, NH. Phase 1 is complete; help us raise the rest to build in 2027."
- **Check:** paste the Netlify deploy-preview URL into a link-preview checker, or a Slack message to yourself, once the branch is pushed.

### 3c. Minimal Donate page (R19) (one PR, a few hours)
- New `_pages/camelot/donate.md` (`permalink: /camelot/donate`, `title: Ways to give`), following review section D6 with only what's already true:
  - a large "Give online" button (`donate_link`) and "Gifts of every size count", first on the page and visible without scrolling at phone width
  - **Employer matching:** the fund name "MIT Outing Club Camelot Cabin Fund", fund number (`{{ site.data.bunkhouse_settings.facts.fund_number }}`), and MIT as the recipient. No portal instructions until Q6.
  - **By check:** moved from the FAQ, with the `<br>` address
  - **Stock, donor-advised funds, IRA gifts, pledges, and larger gifts:** "Email mitoc-bunkhouse@mit.edu" for now
  - **Tax deductibility:** moved from the FAQ
- **Point every Donate button at the page (D2):** add `donate_page: /camelot/donate` to `bunkhouse_settings.yml`, and use it for the menu's `Donate` item, the hero and compact-strip button and the phone footer button in [bunkhouse.html](../../_layouts/bunkhouse.html), the project page's closing Donate link, and both Donate buttons in [camelot_banner.html](../../_includes/camelot_banner.html). Optionally style the menu item as a button.
- **On the Donate page itself,** the hero's button must not link to the page it's on. Have the layout use `donate_link` (and the label "Give online") when `page.url` is the Donate page, and hide the phone footer button there.
- **Keep `donate_link`** for the page's Give online button and for inline links labelled "Donate online" (the funding section's link), since their wording promises the form. The FAQ's `%donate_link%` placeholder stays as is.
- Content-review tool: update the HERO-donate label's description ("links to the MIT giving form") and the BAN-links note.
- FAQ: replace the two "How to donate" answers with one question, "How can I donate?", that links to the Donate page. Keep the group id `donating` so `/camelot/faqs#donating` still works. Add the old question anchors (`is-my-donation-to-the-camelot-bunkhouse-tax-deductible`, `can-i-donate-to-the-bunkhouse-project-by-check`; confirm the exact ids in the built HTML) as `old_ids:` on the new question.
- `_redirects`: add `/camelot/give /camelot/donate 301`.
- Content-review tool: add DON-n labels for the new page, and drop the moved FAQ labels.
- Copy is the maintainer's draft; flag it for committee review.

---

## Stage 4: Split `/camelot` into Home and About (done)

*As built, 2026-11-20 (commits `deb763c` 4a, `6304277` 4b, and the 4c commit, each followed by a regenerated doc and map). Differences from the plan below:*
- *Wording and look (revised after the maintainer said the first version read as generic):* Home and About reuse the committee's original paragraphs and the FAQ's wording about the cabin's condition. There are no photos yet (the four files in `images/camelot/` are only 160×120 px), no check marks or bold lead-ins, and no question-style headings. Running text is capped at 44em.
- *The timeline adds "June 2023: Groton planning board approves", from the old page text; not committee-confirmed.*
- *Shared summary: `summary:` in the settings has two committee-worded passages, `what_is_camelot` and `why`, printed by `_includes/bunkhouse_summary.html` (`part='what_is_camelot'` or `part='why'`). They appear on Home, in two About sections, and (the first) at the start of the banner, which keeps its second sentence about the 1970s cabin.*
- *New fact `drive_time: "about 2.5 hours"` (confirmed by the maintainer); used in About's "Camelot today".*
- *Home is short (about 170 words below the hero). "Where things stand" is text only; Phase 1 photos are held for the Updates posts. The Latest update slot is `_includes/camelot_latest_update.html`, guarded because Jekyll can't sort a missing collection (it errors); tested with a throwaway collection.*
- *Full hero: the thermometer box is more opaque (85%), and the tagline is "Phase 1 complete · Phase 2 fundraising now". The phone footer Donate button is hidden on Home too.*
- *FAQ: "Who's running the project?" replaces the two people questions (old anchors kept); the Maclay sentence is in About's "The plan" and the FAQ answer. "Can't find your answer?" sits under the FAQ title.*
- *Review doc: Home is section B (HOME-n, HOME-h-n), shared text is A2 (SUM-1 and SUM-2), About is B2 (AB-n), Donate is C2. OV-n labels no longer exist. New copy to flag for the committee: the lightly edited summary ("MITOC members" instead of "MITOCers"), About's "Why" second paragraph and the FAQ links, and the timeline's June 2023 entry.*

*The original plan for Stage 4 follows.*

Do these three batches in order, one commit each, stopping for review between them. Nothing is pushed until all three are reviewed, so the temporary duplication after 4a never goes live.

### 4a. About (R18) (one PR, half a day)
- Create `_pages/camelot/about.md` (`permalink: /camelot/about`, `title: About`, no `hero:` so it gets the compact strip). Leave `index.md` unchanged for now. Open with one line that signals depth, for example "The full story of the bunkhouse: why it's needed, the plan, the money, and who's running it."
- Add `/camelot/overview /camelot/about 301` to `_redirects` ("overview" was the name in the web team's brief).
- Write it in the section order from review section D2, reusing the current `index.md` text:
  - **Camelot today:** current paragraph 1's intro, plus capacity now (`capacity_now`) and the loft repair (from FAQ why-2), a cabin photo from `/images/camelot/`, and a link to `/rentals/camelot`. Explain or drop "MITOCers". (R11)
  - **Why a new bunkhouse:** short paragraphs drawn from FAQ why-2, why-5, and why-4, with links to those answers.
  - **The plan:** one paragraph on the building, linking to Project details.
  - **Timeline:** the committee's history as a dated list (the "History" row in Stage 2's table), with done items marked. It replaces current paragraphs 2–3.
  - **What the $1.3 million pays for:** move the existing section as is, with `{: #funding}` for a stable anchor. Remove current paragraph 4, which repeats it.
  - **Who's leading the project:** copy from FAQ "Who is managing this project?" (4c removes it from the FAQ).
  - Leave out "Get involved" until 6b.
- Menu: add "About" first.
- **Content-review tool:** add a reader for `about.md` with AB-n labels (prose, headings, images, as for the project page). Keep the OV reader for `index.md` until 4b.
- Copy is the maintainer's draft; flag the new section intros for committee review.

### 4b. New Home (R17) (one PR, half a day)
- **Shared summary:** add a `summary:` block to `bunkhouse_settings.yml` with `what_is_camelot` (two sentences) and `why` (a list of three bullets). Draft text is in review section D1. Use it in Home, at the top of About's first two sections, and in the homepage banner's first paragraph ([camelot_banner.html](../../_includes/camelot_banner.html)). Facts inside the summary have to be written as plain text (Liquid doesn't run in data files), or use `%key%` with a replace loop as `faqs.md` does; prefer the replace loop so `facts:` stays the single source.
- **Rewrite `index.md`** (keeps `hero: full`) following review section D1: What is Camelot? (with one cabin photo and a link to visiting info) · Why a new bunkhouse? · Where things stand (Phase 1 done, Phase 2 to go, linking to `/camelot/about#funding`) · Latest update · Help build it (Donate button to the Donate page, a matching line, and a link to the FAQs). Target about 250 words below the hero.
- **Latest update slot:** `{% assign latest = site.camelot_updates | sort: 'date' | last %}{% if latest %}…{% endif %}`. With no collection defined yet, `site.camelot_updates` is empty and the section doesn't render, so 5a can add posts without touching Home.
- **Hero:** change `hero_tagline` so it doesn't repeat 2027 (for example "Phase 1 complete · Phase 2 fundraising now"; maintainer to approve). Give `.donations-note` a solid backing, or move it out of the translucent box, so it's readable over the drawing.
- **Content-review tool:** replace the OV reader with a HOME reader (HOME-n labels) and add SUM-n labels for the `summary:` block. Check the round-2 `QUESTIONS` that attach comments to OV labels (for example the photos question on OV-3) and move them to AB or HOME labels. Then regenerate the doc and map.
- **Check:** at both widths, Home's text below the hero should be under about three phone screens. Every inbound link (homepage banner "Learn more", rentals page, `/bunkhouse`) lands on Home. The brand link goes to Home from every page.

### 4c. FAQ reshuffle (one PR, about 1 hour)
- Move "Who designed the new bunkhouse?" and "Who is managing this project?" out of the FAQ's "Who's involved" group. Replace them with a single short question ("Who's running the project?") whose answer links to `/camelot/about#who-s-leading-the-project` (check the generated id), and list both old anchors in `old_ids:`. Keep "Who should I contact with a different question?".
- Add a line under the FAQ page title: "Can't find your answer? Email mitoc-bunkhouse@mit.edu."
- R15's new questions come in 6c and 6d as their answers arrive.

---

## Stage 5: Updates page (R6, owned by the web team)

**Owner (D4):** the web team, posting a few times a year. Aim for no gap much longer than four months, plus a post at each milestone (full funding, groundbreaking, completion). Home's Latest update slot (4b) stays hidden until the first post exists, and 5a's menu item waits for 5b.

### 5a. Infrastructure (one PR, a few hours)
- Add a `camelot_updates` collection to [_config.yml](../../_config.yml) with `output: true` and `permalink: /camelot/updates/:title/`. The site runs Jekyll 3.8 with no feed plugin and no existing collections; collections work on 3.8.
- A post layout (`camelot_update`, based on `bunkhouse`, compact hero) that shows the date and "Raised so far: $X" at the top, from front matter (`raised:`), then the body. Posts follow the five-part structure: what happened, photos, amount raised since the last post, what's next, one ask.
- An index page at `/camelot/updates` (`title: Updates`), newest first: date, title, summary, optional thumbnail.
- Home's Latest update slot (4b) starts showing automatically. Check it.
- Optionally switch the thermometer's "As of" line to the latest post's date. Keep `donations_as_of` as the fallback; simplest is to keep updating `donations_as_of` by hand as part of each post.
- Add "Updates" to the menu, second, after About.
- Optional: a hand-written `camelot/updates/feed.xml` RSS template.
- Content-review tool: posts are probably better reviewed as plain text by email than through the doc. Leave them out unless the committee wants them in.

### 5b. Backfill posts (content; can start as soon as photos arrive)
- The web team writes posts covering about the last two years (D4). Suggested set, from review section D3:
  - summer 2024: site work begins
  - spring 2025: Phase 1 complete (parking lot, bridge, trail), with photos and thanks to Phase 1 donors
  - 2025–26: final construction drawings and contractor quotes; the $1.3M estimate confirmed
  - fall 2026: Phase 2 fundraising kickoff and where the total stands
- Earlier history (2011–2023) stays in About's Timeline list (4a), not in posts.
- Don't publish the page (5a's menu item) until at least the Phase 1 post with photos exists.
- Use one real Phase 1 photo on Home's "Where things stand" too.

### 5c. Upkeep
- A recurring reminder every three to four months on a web team member's calendar. Updating `donations_amount`, `number_donors`, and `donations_as_of` is part of writing each post.
- A short note (in this folder or the repo's `docs/`) on how to add a post through GitHub's web editor: file name pattern, front matter fields, where to put photos.

---

## Stage 6: Fill-ins as round-2 answers arrive

Each batch is small and independent. Do them in whatever order the answers come.

### 6a. Full Donate page (R19; round-2 Q5, Q6)
- Matching: what portals ask for (MIT's EIN and designation), and a link to MIT's matching-gift page if there is one.
- Stock, DAF, and IRA: one or two sentences each, linking to MIT's instructions.
- Pledges, a named contact if one is agreed, and recognition if there is a policy.
- Add FAQ questions for matching and non-cash gifts only if they'd be searched for; otherwise they live on the Donate page.

### 6b. Get involved (R13; round-2 Q8)
- A "Get involved" section at the end of About: volunteer signup and an updates mailing list (announce each Updates post there).
- Rewrite the FAQ "Will students be involved in construction? Alums?" to link to it.

### 6c. Missed-goal answer (R7, R15; round-2 Q3)
- An FAQ entry ("What happens if the goal isn't met by spring 2027?") and one sentence in About's funding section.
- If groundbreaking could slip to 2028, update `hero_subtitle`, `groundbreaking`, and `completion` the same day, and write an Updates post about it.

### 6d. Usage numbers (R16, R15; round-2 Q7)
- Three or more figures in About's "Why a new bunkhouse" section, and an FAQ "How much is Camelot used?". Consider one figure on Home.

### 6e. Small fill-ins
- Q1 → add a `nightly_fee` fact and use it in FAQ cost-3.
- Q2 → if Phase 0 is inside the total, say so in cost-2 and the phases question; if not, add one line to cost-2 saying it was funded separately.
- Q4 → adjust the Phase 1 bullet in the funding section and the phases question.
- Q9 → change `donate_link` (R9).
- Q10 → finish the rentals parking paragraph.
- R15 → add "How are donors recognized?" once there's an answer.

**Final check:** walk through each persona's top questions (review Part 2, section 4) on the rendered site. The task table in review Part 1, section E, should show every task answered on its intended page.

---

## Effort

| Stage | Batches | Rough effort |
|---|---|---|
| 3 | 3a, 3b, 3c | Half a day |
| 4 | 4a, 4b, 4c | 1–1.5 days |
| 5 | 5a, 5b, 5c | Half a day of setup, then about 1 hour per post (web team) |
| 6 | 6a–6e | 1–3 hours each, as answers arrive |

---

## Handoff notes

These were learned while building Stages 1 and 2. Line numbers may shift as later stages land; search for the quoted text. They're aimed at whoever (person or agent) picks this up next.

### Working agreements with the site maintainer
- **Do one batch at a time, commit it, and stop for review** before starting the next. The maintainer reviews each batch on the local server and often asks for small tweaks, which then go into that batch's commit.
- **Don't change a fact listed in the review's section 7** until the committee has agreed on its value. If a sentence containing one has to be rewritten, drop the claim rather than picking a value.
- Commit messages follow the pattern "… (UX review batch 1a)", with a bulleted list of what changed and the R-numbers.
- When the maintainer asks for several batches at once, still commit each one separately. Follow-up tweaks get their own small commit with the same batch tag.
- New site copy is the maintainer's draft unless the committee wrote it. Say which wording was chosen without committee input, so it can be checked.

### Running and checking the site
- **Local server:** run `bundle exec jekyll serve --livereload` from the repo root, then open http://localhost:4000/camelot. The site uses Jekyll 3.8 (see the Gemfile) and is hosted on Netlify, which is why redirects live in `_redirects`.
- **Built file names:** pages build to `_site/camelot.html` and `_site/camelot/faqs.html`, not `…/index.html`. That matters if you serve a build folder with a plain static server.
- **Screenshot quirks with headless Chrome:**
  - It won't render narrower than about 500 px. A 390 px window size still lays the page out wider and crops it. Use Chrome DevTools device mode, or a real phone on the same Wi-Fi, for true phone widths.
  - The full hero has `min-height: 57vh` at 768 px and wider. A very tall desktop window stretches it, so use realistic window heights such as 1280×800.
  - Loading a URL with a `#anchor` gives blank or broken screenshots. To see content further down, use a tall window at phone width (no vh rule applies there), or a scratch copy of the page with `.bunkhouse-banner{display:none}` added.
  - Headless Chrome writes nothing unless it's given `--user-data-dir=<scratch folder>`, and it fails silently. Serve the build with `python3 -m http.server` from the build folder, then load `/camelot.html`.
- **Refactors:** build into two folders (`bundle exec jekyll build -d <dir>`) before and after, then run `diff -r`. 2a-1 came out byte-for-byte identical this way.
- Running `html-proofer` (in the Gemfile) checks for broken links.
- Run `npm run build` in [tools/](tools/) after content changes, to regenerate the committee's content-review doc. To test without touching the tracked doc and map, set `OUT_DIR=<scratch folder>`.

### Code map (after Stage 2b)
- **Key facts:** `facts:` in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml) holds every project fact as a string. Change a fact there, never in the page text.
  - In pages and includes, write the full path, `{{ site.data.bunkhouse_settings.facts.key }}`. Don't shorten it with `assign`: the review-doc tool only recognizes the full path, and a shortened tag would show up in the doc as raw Liquid.
  - In `bunkhouse_faqs.yml`, write `%key%`. Liquid doesn't run in data files.
  - `donations_goal` and the `fundId` in `donate_link` duplicate `total_cost` and `fund_number`. Comments in the file say to keep them in step.
- **FAQ rendering:** [faqs.md](../../_pages/camelot/faqs.md) replaces `%donate_link%` and every `%key%` in both questions and answers. A question's optional `old_ids:` list renders as empty `<span id>` elements, so old links survive a reworded question.
- **Hero and thermometer:** [_layouts/bunkhouse.html](../../_layouts/bunkhouse.html). It's a single template: `{% assign settings = site.data.bunkhouse_settings %}` at the top, with `bunkhouse-banner-full` or `-compact` chosen by `page.hero`. Inside `.donations-stats`, in order: the amount; "RAISED BY n PEOPLE"; the bar; `.donations-to-go` (computed, hidden once the goal is met); `.donations-goal`; and `.donations-note` ("As of {donations_as_of}", plus "Gifts of every size count" in the full hero only). Donate is a sibling of `.donations-stats`.
- **Navbar and footer:** [_includes/navbar.html](../../_includes/navbar.html) takes optional `brand_title` and `brand_href`. [bunkhouse_base.html](../../_layouts/bunkhouse_base.html) sets them to "MITOC Bunkhouse" → `/camelot` and adds `.bunkhouse-footer` ("© {build year} MITOC", linking to `/` in the text color, underlined only on hover).
- **Hero CSS:** in [css/mitoc.css](../../css/mitoc.css), shared `.bunkhouse-banner` rules come first, then a `/* Full hero */` block and a `/* Compact strip */` block, each with its own `min-width: 768px` media query.
- **Class names:** the class is now spelled `bunkhouse-donate-button`; the old `bunkouse` typo is gone everywhere.
- **Page title and menu highlight:** pages set `title:`; the layout shows it as `h1.bunkhouse-page-title` unless `hero: full`, and the tab title is built from it. `menu-link.html` adds `class="active"` only when `highlight_active` is passed down from `navbar.html`.
- **Donate buttons:** every Donate button uses `settings.donate_page`; the page's own hero button and Give online button use `donate_link`. Don't point inline "Donate online" links at the page.
- **Heading anchors:** the rule `.bunkhouse-container h2[id], h3[id], span[id] { scroll-margin-top: 70px }` keeps anchors, including the FAQ's `old_ids` spans, clear of the fixed navbar.
- **Body text size:** `.bunkhouse-body p` and list items (except the FAQ jump-list pills) are `font-size: large`. Anything new inside the hero needs a more specific selector to override that.
- **Figures:** use `<figure class="bunkhouse-figure">` with `<figcaption>` for drawings and photos. Images shrink to fit narrow screens.
- **Homepage banner:** in [_includes/camelot_banner.html](../../_includes/camelot_banner.html), the collapsed footer is `.camelot-banner-actions` (Learn more and Donate). It's hidden when the banner is expanded. The click-to-expand script ignores clicks on `<a>` elements.
- **FAQ answers:** they live in [_data/bunkhouse_faqs.yml](../../_data/bunkhouse_faqs.yml) and are rendered by kramdown. To keep line breaks inside a blockquote, end each line with `<br>`. Changing a question's wording changes its anchor, so add the old one to `old_ids:`.
- **Review-doc tool:** [make_content_doc.js](tools/make_content_doc.js) works out page Liquid that reads settings (`minus:` and `thousands_separated` only), and lists those settings for each label in the content map. Project-page labels are PR-n (prose), PR-h-n (headings), PR-img-n, and PR-cap-n.

### After each batch
- Commit the site change first, then run `npm run build` in [tools/](tools/) to regenerate the review doc and content map, so the doc's header names a clean commit rather than "plus uncommitted changes". Commit the regenerated files too.
- Part 1 of the doc (`FACTS`) builds its values from `facts:`, so it stays current on its own. When the committee answers a question, remove it from `QUESTIONS` in [make_content_doc.js](tools/make_content_doc.js). Questions are numbered by position, so removing one renumbers those after it; update the question table in **Next steps** to match. Each question names the label its comment attaches to, so check that the label still exists after a batch renames labels (Stage 3c and 4).
- Check at 1280 px and 390 px. From Stage 3 on, also check that the current menu item is highlighted and the tab title is right on each page the batch touches.

### When round-2 answers come back
- **First save the returned doc under a dated name** (for example `bunkhouse-content-review-2026-12-xx-committee.docx`) and commit it. `npm run build` overwrites `bunkhouse-content-review.docx`, and the returned file is the only record of the committee's answers.
- Each answer maps to a Stage 6 batch (see **Next steps**). If Stage 4 has already shipped, map OV-n labels to the new files using the round-2 content map.

### Things to know for later stages
- **Collections (5a):** there's no feed plugin and no existing collections in `_config.yml` (its plugins are jekyll-jolt, jekyll-sitemap, and jekyll-target-blank). An RSS feed would need a hand-written template, or adding `jekyll-feed` to the Gemfile and checking that Netlify builds it.
- **Shared navbar include (3a):** `navbar.html` and `menu-link.html` are used by the main site too. Any change there (active state, a right-hand menu) shows up site-wide; check main-site pages and keep new parameters optional.
- **Anchors that move in Stage 4:** the current overview's `#what-the-13-million-pays-for` heading moves to `/camelot/about#funding`. It has never been pushed, so nothing outside links to it. FAQ anchors that move (the donate questions in 3c, the people questions in 4c) keep working through `old_ids:`.
- **Review-doc labels change in Stages 3–4:** OV-n is replaced by HOME-n and AB-n, and DON-n and SUM-n are added. Round-2 answers labelled OV-n need mapping through the round-2 `bunkhouse-content-map.json` (it records the source file and paragraph for each label). Commit the content map with each regenerated doc so old labels stay traceable.
- **Shared summary:** edit `summary:` in the settings (or SUM-1 and SUM-2 in the doc). Use `{% include bunkhouse_summary.html … %}` wherever it should appear; don't copy the text.
- **Phone Donate button:** the full-width Donate button at the bottom of phone pages (`.small-screen-only` in the layout) still uses the base button size. The user hasn't decided whether to shrink it too. On the Donate page it duplicates the page's own big button; consider hiding it there with a front-matter flag.
- **Unpushed commits:** nothing from Stage 1 or 2 is pushed. The maintainer hasn't decided when to open a PR.
- **Facts that still read as "about"** (`capacity_now`, distances, `phase1_raised`, `phase2_cost`) include the word in the value, so a sentence reads "sleeps about 30 people". Keep that pattern when adding facts.

---

## Appendix: completed stages (as built)

*Kept for reference: what was planned for Stages 0–2, what the committee settled in round 1, and how each batch was actually built. Question numbers here are the old ones.*

| Batch | Commit |
|---|---|
| Stage 0, round 1 questions (answered 2026-11-20, saved as `bunkhouse-content-review-2026-11-20-committee.docx`) | `e661459` |
| Stage 0, round 2 doc (first build) | `8a77b92` |
| 1a: code fixes (R1, R2, typo, redirect, address) | `8e67d88` |
| 1b: banner and rentals links and copy (R12, R4) | `7f487e6` |
| 1c: project page headings and captions (R14) | `54d59f8` |
| 1d: compact hero (R10) | `2aba590` |
| 2a-1: key-facts refactor | `9a4e737` |
| 2a-2: agreed facts and copy fixes (R3) | `dbcaf5f` |
| 2b: money and thermometer (R7, R9 wording) | `7eeecd4`, `7987b1c` |
| Extra: "MITOC Bunkhouse" navbar brand and footer (maintainer's request) | `64657fd`, `1796d1e` |
| 2c: ways to give, get involved | Replaced by 3c, 6a, and 6b |

### Stage 0: Send the open questions (day 1, in parallel with Stage 1)

Send section 8's open questions to the bunkhouse/fundraising committee now, grouped by what each one unblocks:

| Unblocks | Questions (section 8) |
|---|---|
| 2a: facts | 2 (schedule), 6 (capacity and fee), plus each row of the section 7 table |
| 2b: money | 1 (what $468K includes, current budget), 3 (what the thermometer shows) |
| 2c: giving and involvement | 4 (non-cash gifts, contact, recognition), 5 (matching), 8 (volunteering) |
| 3: Updates page | 7 (Phase 1 photos), 9 (owner and schedule) |
| 4b: impact | 7 (usage figures) |

Ask about the gift preset (R9) at the same time.

**Done when:** the questions are sent and a check-in date is set.

*Round 1 came back 2026-11-20 (see Stage 2). The questions still open were carried into round 2; see **Next steps**.*


### Stage 1: Quick wins (no decisions needed, this week)

#### 1a. Code fixes (one PR, about 1 hour)
- **R1:** In [_layouts/bunkhouse.html:35-37](../../_layouts/bunkhouse.html#L35-L37), replace the dead `<button>` with an `<a href="{{site.data.bunkhouse_settings.donate_link}}">`.
- **Typo:** Rename the class `bunkouse-donate-button` to `bunkhouse-donate-button` everywhere it appears: [bunkhouse.html](../../_layouts/bunkhouse.html), [camelot_banner.html](../../_includes/camelot_banner.html), and [css/mitoc.css](../../css/mitoc.css).
- **R2:** Add a "← MITOC home" item to the menu in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml), or drop `hide_root=true`. Rename the "Camelot Bunkhouse" menu item to "Overview". Leave the commented-out History entry for now; Stage 3 removes it.
  - *As built:* I dropped `hide_root=true`. The "MIT Outing Club" brand link now shows at every width, including phones with the menu closed.
  - *Changed later (2026-11-20, maintainer's request):* the bunkhouse navbar brand now says "MITOC Bunkhouse" and links to `/camelot`. `navbar.html` takes optional `brand_title` and `brand_href` parameters; the main site still uses its defaults. The way back to the main site is now a footer on every bunkhouse page, "© {year} MITOC", where MITOC links to `/`.
- **R4 (redirect only):** Add `/bunkhouse /camelot 301` and `/bunkhouse/* /camelot 301` to [_redirects](../../_redirects).
- **Display bug:** Keep the line breaks in the check-mailing address in [bunkhouse_faqs.yml:70-72](../../_data/bunkhouse_faqs.yml#L70-L72) by ending each line with two spaces or `<br>`.

#### 1b. Links and newcomer copy (one PR, about 1 hour)
- **R4 (rentals):** Replace the stale "Bunkhouse project" section in [rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57) with two sentences that don't depend on any fact still being decided, plus a link to `/camelot`. Leave "40 or more" (line 11) alone until 2a.
- **R12 (structure):** Show "Learn more" next to Donate in the collapsed banner footer. Rewrite the banner's opening to say what Camelot is, and remove "As you may know." Leave the disputed claims (the distance, "Since 2013", "end of its useful life", "design now complete") for 2a.
  - *As built:* I renamed the link inside the expanded banner from "Read more" to "Learn more" to match. I removed "Since 2013" and "end of its useful life" from the first paragraph rather than replacing them.
  - *Still waiting for 2a:* in [camelot_banner.html](../../_includes/camelot_banner.html), "approximately 100m" (line 23), "$1.3 million" (line 26), "With the design now complete" (line 30), and "complete the new bunkhouse in 2027" (line 33). In [rentals/camelot.md:11](../../_pages/rentals/camelot.md#L11), "40 or more" (also misspelled "accomodate").

#### 1c. Project page headings (one PR, about 1 hour)
- **R14:** In [project.md](../../_pages/camelot/project.md), add `##` headings and a caption for each drawing, and end with links to the FAQs and Donate.

#### 1d. Compact hero (one PR, a few hours)
- **R10:** Show the full hero only on the overview, using a front-matter flag such as `hero: full`. Use a one-row title, thermometer, and Donate bar on the subpages. Cap the hero's height on phones. Give the `h3` a light backing so it has enough contrast.
- R3 changes the hero text later, so build the layout so the copy can change without touching the CSS.
- *As built:*
  - The overview has `hero: full` in its front matter, and every other page gets the compact strip by default.
  - The three headline lines are `hero_title`, `hero_subtitle`, and `hero_tagline` in `bunkhouse_settings.yml`. The tagline appears only in the full hero.
  - Follow-up changes the user asked for:
    - "Coming 2027" is left-aligned under the title in both versions of the hero.
    - The Donate button in the overview's hero is smaller and sized to its text. The full-width Donate button at the bottom of phone pages is unchanged.
    - I removed the 22 px font-size rule on `.bunkhouse-navbar`, so the bunkhouse navbar now matches the main site's.

**Check each PR** with `jekyll serve` at 1280 px and 390 px wide. Tap both Donate buttons on a phone-sized screen, open the phone menu, and confirm that `/bunkhouse` redirects. Running `html-proofer` (already in the Gemfile) catches broken links.


### Stage 2: Content fixes (after the committee check-in)

*Re-planned 2026-11-20 from the committee's answers in the returned [bunkhouse-content-review.docx](bunkhouse-content-review.docx). The committee filled in Part 1 and answered Q2 and Q3. They didn't edit any Part 3 wording, so the new copy below is drafted by the maintainer and reviewed batch by batch as usual.*

#### Before starting: save the committee's copy
`npm run build` in [tools/](tools/) **overwrites** `bunkhouse-content-review.docx`, and the returned file (uncommitted) is the only record of the committee's answers. Rename it to `bunkhouse-content-review-2026-11-20-committee.docx` and commit it before regenerating anything.

#### What the committee settled

| Fact | Agreed value | Notes for the copy |
|---|---|---|
| Phases | **Phase 0:** initial design with Maclay Architects (2019–21). **Phase 1:** parking lot, bridge, and access trail, plus the final construction drawings (fundraising 2022–24, about $300K; built 2024–25). **Phase 2:** construction of the bunkhouse (fundraising 2026–27, about $1M). | Replaces both old meanings of "Phase 1". |
| Total cost and goal | $1.3 million, covering parking lot, trail and bridge, site prep, the bunkhouse itself, and design and project support (architects, structural and geotechnical engineers, MIT Facilities) | Reverses the FAQ's "not included" list. |
| Basis of the estimate | 2026 estimate from general contractors' initial quotes on the finished construction drawings | Replaces the 2022 Dartmouth/COVID wording. |
| Thermometer | Whole campaign, including pledges. $468,000 from 314 people, as of November 2026. | Gap = $832,000 (computed). |
| Funding needed to start | The full $1.3 million | |
| Schedule | Groundbreaking late spring 2027, construction complete fall 2027, in one season (about May–November) | "Coming 2027" is correct. Drop the "paused for winter" line. |
| Current cabin capacity | About 30 people, across the loft, living room, and kitchen | The loft is **open again** after a major repair. The FAQ's "loft is closed" is now wrong. |
| Bunkhouse capacity | 50 people in five rooms of 10, each the size of a standard winter school trip | |
| Cabin to bunkhouse | About 200 meters | Was "100 m" on the project page and banner. |
| Parking to cabin | About 200 meters | Was "1000 feet" on the rentals page. |
| Parking | New gravel off-street lot with room for 20 cars | |
| History | 2011 discussions begin · 2013 MITOC board approves · 2014–18 focus groups · 2018 founding gift (Joris Naiman) · 2019 Maclay hired · 2021 design complete · 2022–24 Phase 1 fundraising · June 2023 Groton planning board approves *(added by the maintainer in Stage 4, from the old page text)* · 2024–25 Phase 1 built · 2026–27 Phase 2 fundraising | Settles "almost a decade" and "Since 2013". |
| Cabin condition | The committee wrote three paragraphs (Part 1, "Condition of the existing cabin"): near the end of its usable life *as sleeping space*; loft repaired but patches only go so far; can't be brought to lodging code; within a few years it won't be safe to sleep in; usable as kitchen and lounge for another 10–20 years. | Use it nearly verbatim in the FAQ. Both the banner's "end of its useful life" and the FAQ's "10–20 years" are true once each is qualified. |
| Contact | mitoc-bunkhouse@mit.edu (no named person) | |

**Still open.** Follow up with the committee, but don't let these block 2a or 2b:
- **Nightly fee** (Q6, second half): left blank. Remove the "$20" from the FAQ and don't state a number.
- **Phase 0 in the $1.3M?** The committee's list includes "design … work from architects", but the current FAQ says the initial Maclay design was paid for separately, and $300K + $1M = $1.3M suggests Phase 0 is outside the total. Until this is confirmed, describe the $1.3M as "Phases 1 and 2" and leave Phase 0's funding out.
- **What if the $1.3M isn't reached by spring 2027?** There's $832K to go and about six months left. Does groundbreaking slip to 2028? The answer belongs in R7 and R15. Until then, say only that full funding is needed before groundbreaking.
- **Phase 1's $300K:** was it raised, or was it the cost? Can Phase 1 donors be thanked by name or as a group?
- **Rentals parking instructions** belong to the cabin managers. Check the new wording with camelot-mgr@mit.edu.
- Q4 (non-cash gifts, contact, recognition), Q5 (matching), Q7 (photos, usage data), Q8 (volunteering), Q9 (updates owner), and the R9 gift preset.

#### 2a-1. Key-facts refactor, no wording change (one PR, about 2 hours)
1. Add a `facts:` map to [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml), with string values. Only include facts that are **already worded the same everywhere they appear**, so this batch changes no rendered text. Candidates: `total_cost: "$1.3 million"`, `capacity_new: "50"`, `rooms: "five"`, `room_size: "10"`. Add a comment noting that `donations_goal` (numeric, for the thermometer) must match `total_cost`.
2. **FAQ YAML:** in [faqs.md](../../_pages/camelot/faqs.md), extend the existing `%donate_link%` replacement into a loop that replaces each `%key%` with `settings.facts[key]`. A Liquid `for` loop over a hash yields `[key, value]` pairs. Swap the literal values in [bunkhouse_faqs.yml](../../_data/bunkhouse_faqs.yml) for `%total_cost%` and similar placeholders, and update the file's header comment.
3. **Pages and includes:** use `{{ site.data.bunkhouse_settings.facts.total_cost }}` in [index.md](../../_pages/camelot/index.md), [project.md](../../_pages/camelot/project.md), [camelot_banner.html](../../_includes/camelot_banner.html), and [rentals/camelot.md](../../_pages/rentals/camelot.md).
4. **Content-review tool:** update [make_content_doc.js](tools/make_content_doc.js) to substitute the `%key%` placeholders (and `{{ …facts.x }}`) with their values in the doc, and record in the content map which fact key each one came from. Without this, committee members would see raw placeholders.
5. **Verify it's a no-op:** build `_site` before and after, then run `diff -r`. The only differences allowed are whitespace.
- *As built:*
  - `facts:` holds `total_cost`, `bunkhouse_capacity`, and `fund_number`. I left out the room facts because the banner says "ten persons each" and the project page says "10 people each"; unify them in 2a-2.
  - `donate_link` still contains the fund number literally, because YAML can't concatenate strings. A comment says it must match `facts.fund_number`.
  - The FAQ replaces placeholders in questions as well as answers. Heading anchors are unchanged.
  - The before and after builds were byte-for-byte identical.
  - Fixes to `make_content_doc.js`:
    - It replaces placeholders with their values, and the content map lists the `facts` keys each label uses.
    - Setting `OUT_DIR=…` writes the doc and map somewhere else, for testing.
    - It also fixes four Stage 1 breakages: the hero text (now read from settings), the rentals bunkhouse paragraph (rewritten in 1b, which made the script crash), the project page's headings, figures, and captions (from 1c; prose paragraphs keep the numbers PR-1 to PR-6, and headings and captions get `PR-h-n` and `PR-cap-n`), and the `<br>` tags in the check address.
  - `bunkhouse-content-review.docx` won't exist again until the doc is regenerated after 2a-2.

#### 2a-2. Agreed facts and copy fixes (R3) (one PR, about half a day)
First add the newly agreed facts to `facts:` (`capacity_now`, `distance_to_bunkhouse`, `walk_from_parking`, `groundbreaking`, `completion`, `phase2_cost`, `parking_lot`), then edit the copy below. Labels match the content-review doc. Make one wording pass, keeping the current structure; the restructure came later (now Stage 4, R17 and R18).

- **Hero:** set `hero_tagline` to something like "Phase 1 complete · Raising funds to build in 2027". Keep `hero_subtitle: Coming 2027`.
- **Overview** (no new headings yet):
  - OV-1: replace "a few hundred yards" with the distance fact.
  - OV-2: replace "in discussion for almost a decade" with "in discussion since 2011 and approved by the MITOC board in 2013".
  - OV-3: say Phase 1 also produced the final construction drawings.
  - OV-4: say "breaking ground in late spring 2027 and finishing that fall". Replace "$1.3 million total costs" with the whole-campaign framing, and say the full amount is needed before groundbreaking.
- **FAQ "Why a bunkhouse?":**
  - why-2: drop "the loft area … is closed". Use the committee's condition text: the loft was repaired, the cabin sleeps about 30 now, and within a few years it won't be safe to sleep in.
  - why-5: replace with the committee's lodging-code paragraph (sprinklers, fire-rated rooms, exits; the cabin managers and the Town of Groton found no viable way to bring the cabin up to code).
  - why-4: keep "10–20 years", worded as kitchen and lounge only.
- **FAQ "Cost and funding":**
  - cost-1: $1.3M, estimated in 2026 from contractors' quotes on the finished construction drawings. Remove the Dartmouth and COVID wording.
  - cost-2: change the question to **"What does the $1.3 million cover?"** and list the committee's items. Add a line about Phase 0 only after the open question is settled.
  - cost-3: "modest user fees, in line with MITOC's other cabins". No dollar figure.
- **FAQ "Timeline":**
  - timeline-1: break ground in late spring 2027 once the full $1.3M is raised.
  - timeline-2: one building season, about May to November, finishing fall 2027. Remove the winter pause.
  - Add a new question, **"What are the phases of the project?"**, with Phase 0, 1, and 2, each with dates. This is the single place where "Phase" is defined.
- **FAQ "Building and site":** in building-3 (parking), say the new gravel lot has room for 20 cars and was built in Phase 1 (2024–25), at the town's request.
- **Project page:** in PR-1, change "about 100 meters up the hill" to the distance fact. In PR-2, add "each the size of a standard winter school trip".
- **Banner:**
  - BAN-2: change "100m" to the distance fact.
  - BAN-3: replace "With the design now complete …" with Phase 1 being done (2025) and raising the rest to build in 2027.
  - BAN-1 can say "nearing the end of its life as sleeping space" again, now that it's agreed.
- **Rentals:**
  - RENT-about: "40 or more" → `capacity_now` (about 30). Fix "accomodate". "1000 feet" → `walk_from_parking`.
  - RENT-parking: say it's a gravel lot with room for about 20 cars. Have the cabin managers check the rest of the paragraph.
  - Leave the $10 rental fee alone; that one is correct.
- **Grep check:** search for "yards", "100 m", "1000 feet", "40 or more", "decade", "2013", "winter", "Dartmouth", "$20", and "design now complete". Each hit should be either gone or intentional.

*As built (2a-2):*
- `facts:` now also holds `room_count`, `room_size`, `capacity_now`, `distance_to_bunkhouse`, `walk_from_parking`, `parking_spaces`, `groundbreaking`, `completion`, `phase1_raised`, and `phase2_cost`.
- I kept the existing question wording wherever I could, because FAQ anchors come from the question text. The one question I reworded (cost-2) has a new `old_ids:` field in `bunkhouse_faqs.yml`. `faqs.md` renders each old ID as an empty `<span id>`, so links to `#what-expenses-are-not-included-in-the-13-million-estimated-cost` still land on that question.
- The new "What are the phases of the project?" question is first in the Timeline group. That shifts that group's labels in the next review doc (FAQ-timeline-1 is now the phases question).
- I wrote "Winter School" with capitals in the project page's room sentence, for MITOC's program. The committee wrote it lowercase.
- On the rentals page, I only changed the first sentence of the parking paragraph. The rest is unchanged, pending a check by the cabin managers.

#### 2b. Money and thermometer (R7, R9 wording) (one PR, a few hours)
- **Thermometer** in [bunkhouse.html](../../_layouts/bunkhouse.html):
  - Change the label to "Raised and pledged". *(Built, then changed back to "Raised by" at the maintainer's request.)*
  - Add "$832,000 to go", computed as `donations_goal | minus: donations_amount`.
  - Add `donations_as_of: November 2026` to the settings and show "as of {date}" underneath. In the compact strip, keep it small or move it into a tooltip so the strip stays one row. *(Built as a small line; the compact strip is now a few lines taller.)*
- **R7 section on the overview:** add one headed section after OV-4. A working title is "## What the $1.3 million pays for", since the thermometer counts the whole campaign, not just Phase 2. It covers:
  - Phase 1: done in 2025, with about $300K raised, and thanks to its donors.
  - Phase 2: about $1M for the bunkhouse.
  - The estimate comes from 2026 contractor quotes.
  - $468K raised or pledged, $832K to go, and the full amount needed before the late-spring 2027 groundbreaking.
  - A link to the FAQ cost section.
  - All the numbers come from `facts:` or the thermometer values, not literals.
- **R9 wording:** add "{{number_donors}} people have given so far. Gifts of every size count." near the thermometer on the overview. **Don't change `&amount=1000` until the preset is decided.** The maintainer can make that call directly, or add it to the follow-up questions.

*As built (2b):*
- `donations_as_of` is in the settings. The layout shows "$X to go", worked out from the goal and the amount raised, and hides it once the goal is met. The "As of" line adds "Gifts of every size count" in the full hero only.
- *Follow-up the maintainer asked for:* the label stays "RAISED BY ___ PEOPLE", not "raised and pledged", even though the total includes pledges. The overview section still says "given or pledged". "$X to go" and "Goal" are on separate lines.
- The overview's new section is "## What the $1.3 million pays for", between OV-4 and the closing line. I put the donor-count sentence there rather than in the hero, because the hero already shows the count.
- CSS fixes:
  - `.bunkhouse-body p { font-size: large }` was overriding the new note's size, so the note uses a more specific selector.
  - Bullet lists on bunkhouse pages were smaller than body text. They now match it, except for the FAQ jump-list pills.
- Content-review tool:
  - It works out page Liquid that reads settings (including `minus:` and `thousands_separated`). The content map lists those settings under `settings`, which replaces `facts`.
  - Part 1 now shows the current values for the committee to confirm.
  - Part 2 now lists the 11 questions still open: the fee, Phase 0, missing the goal, Phase 1 donors, Q4, Q5, Q7, Q8, Q9, the gift preset, and the rentals parking instructions.
  - New labels: SET-asof and HERO-note.
- I regenerated `bunkhouse-content-review.docx` and `bunkhouse-content-map.json`, so they're ready to send for the next round.

#### 2c. Ways to give and getting involved (R8, R13): replaced
*Re-planned 2026-11-20 after the restructure.* R8 is now R19, a Donate page: the minimal version is batch 3c, and the full version is 6a. R13 (Get involved) is now a section on About, batch 6b.
