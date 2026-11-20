# Camelot bunkhouse pages: UX review by audience

*First review 2026-11-19 on branch `bunkhouse-edits` (commit `cd2bad8`). **Second review 2026-11-20** (commit `bce5eba`), after Stages 1–2b and the web team's request to restructure the section into six pages. Both times, pages were rendered locally with `jekyll serve` and checked in Chrome at desktop (1280 px) and phone widths.*

This folder starts with an underscore, so Jekyll does not publish it. Screenshots are in [screenshots/](screenshots/). Files starting with `r2-` are from the second review.

**How this document is organized**
- **Part 1 (sections A–H): second review.** It covers the new page structure the web team asked for, and what's still open on the current pages. Start here.
- **Part 2 (sections 1–8): first review.** The original findings by persona, kept as the record. [implementation-plan.md](implementation-plan.md) refers to its section and R-numbers, so they're unchanged. Where Part 1 replaces a recommendation, Part 2 says so.

> **Implementation status (updated 2026-11-20).** Work is tracked in [implementation-plan.md](implementation-plan.md), which has the status table, next steps, and handoff notes.
> - **Done** (Stages 1 and 2 through batch 2b, on `bunkhouse-edits`, not pushed yet): R1, R2, R3, R4, R10, R12, R14, and R7.
> - **Partly done:** R9 (small-gift wording added; the $1,000 preset still waits for a decision), R6 (only the "as of" date on the thermometer), and R15 (the time-sensitive answers are updated; the new questions aren't added yet).
> - **Not started:** R8, R11, R13, R16, and the new R17–R21 in section G. R5 is replaced by R17 and R18.
> - **Committee:** round 1 came back on 2026-11-20 (`bunkhouse-content-review-2026-11-20-committee.docx`). The round-2 questions are in [bunkhouse-content-review.docx](bunkhouse-content-review.docx), ready to send. Section H records the web team's four decisions (2026-11-20). The updates-owner question is answered and was removed from the doc, which now has 10 questions.
> - **The implementation plan was re-planned on 2026-11-20 for the restructure.** Stage 3 is page identity and a minimal Donate page, Stage 4 the Home/About split, Stage 5 Updates, and Stage 6 the fill-ins from round-2 answers.
> - **Line numbers in Part 2 are from commit `cd2bad8`.** Many have shifted. Search for the quoted text instead.

**Content review document:** [bunkhouse-content-review.docx](bunkhouse-content-review.docx) contains all the bunkhouse wording, the key facts table, and the open questions, for committee members to edit in Google Docs or Word. [bunkhouse-content-map.json](bunkhouse-content-map.json) maps each `[label]` in the document to its source file, so edits can be applied back to the site. To regenerate both after the site changes, run `npm install` (first time only) and then `npm run build` in [tools/](tools/). This needs Node and Ruby. Moving the overview text to a new file (R17) changes the source paths the tool reads; see section G.

---

# Part 1: Second review (2026-11-20)

## A. Summary

**The pages are in much better shape than a day ago.** The phone Donate bug, the contradictory facts, the unclear money picture, the full-screen phone hero, and the stale rentals and banner copy are all fixed. A reader can now find out what the project costs, what's raised, what's left, and when it's meant to be built.

**What's still weak is the shape of the section, not the facts.** The `/camelot` page still opens with four unheaded paragraphs in date order. The strongest reason to give, that the cabin will soon not be safe to sleep in, is still only in the FAQ. There are no photos of the real cabin or of the finished Phase 1 work, no way to see progress over time, and nothing on employer matching or other ways to give.

**The six-page structure the web team proposed fixes most of that**, as long as each page has one clear job. The one real risk is that **Home and the full-story page (now "About") both end up as summaries of the same story**, so readers can't tell which to read and editors keep two copies in step. Section C gives each page a distinct job. The web team has since settled the open choices (section H): the overview page is called "About", every Donate button opens a Donate page, and the web team owns Updates.

**The five most valuable changes now**

| # | Change | Why it matters | Effort |
|---|---|---|---|
| 1 | **Build the Home page as a one-screen pitch** (R17): what Camelot is, why the bunkhouse is needed now, where things stand, and how to give, with a real photo. Everything else is a link. | `/camelot` is where every email, the homepage banner, and the rentals page send people. Today they land on history paragraphs. | M |
| 2 | **Give About (`/camelot/about`) a distinct job as the full story** (R18), restructured under headings. | Stops Home and About from duplicating each other, and gives detail-minded donors one place to read the whole case. | M |
| 3 | **Launch the Updates page with posts covering the last two years, with photos** (R6, updated), and show the latest post on Home. | Repeat donors still can't see their last gift at work. The web team will own the page and post a few times a year. | M, plus photos |
| 4 | **Make Donate a real page** (R19) that every Donate button opens, with "Give online" at the top, then matching, check, stock/DAF/IRA, pledges, and a contact. | Matching and larger gifts are still unaddressed. A minimal version can ship now with facts already known. | S for the minimal version |
| 5 | **Give every page its own identity** (R20): a visible page title, a distinct browser-tab title, a highlighted current menu item, and a share preview for Home. | With six pages instead of three, readers need to know where they are. Every page currently has the same tab title, "MITOC - Camelot Bunkhouse". | S |

---

## B. What's changed since the first review

**Fixed** (see Part 2, section 6, for commits):
- The phone Donate button at the bottom of each page works (R1).
- The navbar brand, "MITOC Bunkhouse", links to `/camelot`, and the footer links back to the main MITOC site (R2).
- Every fact in Part 2's section 7 now has one agreed value, stored once in `bunkhouse_settings.yml` (R3). "Phase" is defined once, in a new FAQ.
- The overview has a "What the $1.3 million pays for" section, and the thermometer shows the amount to go and an "as of" date (R7).
- The hero is compact on subpages and fits a phone screen, with content starting about halfway down the first screen ([phone](screenshots/r2-overview-phone-full.jpg), [compact strip](screenshots/r2-faqs-desktop-fold.jpg)) (R10).
- The homepage banner says what Camelot is first and shows "Learn more" when collapsed (R12). The rentals page links to the bunkhouse pages and has the correct capacity (R4).
- The project page has headings and captions (R14) ([screenshot](screenshots/r2-project-desktop-fold.jpg)).

**Still open on the current pages**

| Severity | Problem | Where | Fixed by |
|---|---|---|---|
| Major | The "why now" case (the cabin is near the end of its life as sleeping space, and within a few years won't be safe to sleep in) is only in the FAQ. The overview says only "to maintain this opportunity for future generations". | `index.md` paragraph 1; FAQ "Why does MITOC need the bunkhouse?" | R17, R18 |
| Major | The overview's first four paragraphs are unheaded and in date order. The ask comes in paragraph 4. | `index.md` | R17, R18 |
| Major | No photos of the real cabin or of Phase 1 (bridge, lot, trail). Every image in the section is an architect's drawing. Four cabin photos already exist in `/images/camelot/`. | Whole section | R17, R6 |
| Major | No progress over time: no dated updates, so a returning visitor sees nothing new except possibly the thermometer. | Whole section | R6 |
| Major | No employer matching, stock/DAF/IRA, pledge, or larger-gift information. The fund name ("MIT Outing Club Camelot Cabin Fund") and number are only in the FAQ. | FAQ "How to donate" | R19 |
| Major | Schedule credibility: the hero says "Coming 2027", and full funding is needed before a late-spring 2027 groundbreaking, with $832,000 to go and about six months left. The site doesn't say what happens if the goal is missed. A project-minded reader (P4) will notice. | Hero; overview; FAQ timeline | Round-2 Q3 |
| Minor | Every page has the same browser-tab title, and the nav doesn't highlight the current page. The project page has no page heading, so on the compact hero it isn't obvious what page you're on. | `bunkhouse_base.html:8`; `menu-link.html`; `project.md` | R20 |
| Minor | The overview states the groundbreaking condition twice (paragraph 4 and the funding section), and the hero says 2027 twice ("Coming 2027" and "Raising funds to build in 2027"). | `index.md`; `hero_tagline` | R17, R18 |
| Minor | The small "As of November 2026 · Gifts of every size count" line sits on a translucent box over the drawing and is hard to read on the full hero. | [screenshot](screenshots/r2-overview-desktop-fold.jpg) | R17 |
| Minor | The only link to the main MITOC site is in the footer, at the bottom of long pages. | `bunkhouse_base.html` | R20 |
| Minor | "Is Phase 0 inside the $1.3M?" is still ambiguous: the FAQ's cost list includes architects' design work, but the phases list gives Phase 0 no cost. | FAQ cost-2 and phases | Round-2 Q2 |
| Minor | "Will students be involved in construction? Alums?" is still a vague "where possible", with no signup. | FAQ | R13 |
| Minor | "Raised by 314 people" in the hero, but "given or pledged" in the overview. Both are accurate, but they read as different numbers. | Hero; overview funding section | Section H: use "raised by" |

---

## C. The new page structure

### C1. Site map

The web team asked for these pages, and settled the page name, URLs, and Donate behavior on 2026-11-20 (section H).

```
Main site (every page)
 └─ Collapsible banner ── Learn more ──► /camelot (Home)
                       └─ Donate ─────► /camelot/donate
/rentals/camelot ───────── link ──────► /camelot (Home)
/bunkhouse, /bunkhouse/* ── 301 ───────► /camelot (Home)

Bunkhouse navbar:  [MITOC Bunkhouse]  About · Updates · Project details · FAQs · [Donate]
                         │                  │               │            │            │       │
                         ▼                  ▼               ▼            ▼            ▼       ▼
                   /camelot (Home)   /camelot/about  /camelot/   /camelot/    /camelot/  /camelot/
                   not in menu;                         updates     project      faqs       donate
                   reached by brand
                   link and all
                   inbound links

Every Donate button (hero, compact strip, phone footer, banner, menu) ──► /camelot/donate
/camelot/donate ── Give online ──► MIT giving form
Footer on every page: © MITOC ──► main site
```

**What works about this structure**
- **All existing inbound links land on the right page without changes.** Emails, the homepage banner, the rentals page, and the `/bunkhouse` redirect all point at `/camelot`, which becomes the short pitch. That's the right page for someone arriving from outside.
- **Home isn't in the menu, and that's fine.** The brand link "MITOC Bunkhouse" already goes to `/camelot`, which is the convention people expect. Readers inside the section use the menu to go deeper, not back to the pitch.
- **Each remaining page answers one kind of question**: the story, the progress, the design, the reference answers, and how to give.

### C2. Each page's job

The test for each page: a reader should be able to say in one sentence why they'd go there, and no two pages should give the same answer.

| Page | Job (one sentence) | Main readers | Hero | Length target |
|---|---|---|---|---|
| **Home** `/camelot` | "Tell me what this is and why I should care, in a minute, and let me give." | Everyone arriving from outside; P2, P5, P6 most | Full | About 250 words below the hero; on a phone, under three screens |
| **About** `/camelot/about` | "Give me the whole case: the cabin, the need, the plan, the money, and who's running it." | P1, P3, P4 | Compact | Headed sections, each short, linking out for detail |
| **Updates** `/camelot/updates` | "What's happened since I last looked?" | P1, P5, returning donors; email links | Compact | Newest first; each post short |
| **Project details** `/camelot/project` | "What exactly will be built?" | P3, P4 | Compact | As now |
| **FAQs** `/camelot/faqs` | "I have a specific question." | Everyone, via search or links | Compact | As now, minus the donate and people groups |
| **Donate** `/camelot/donate` | "How do I give in the way that suits me?" | P1, P2, P4 | Compact | One screen per giving method at most |

### C3. The Home/Overview overlap, and the menu name

The brief describes Home as "a condensed version of what Camelot is, why the bunkhouse matters" and Overview as the current `/camelot` content. In practice both would start with "what Camelot is" and "why a bunkhouse", which leads to two problems:
- **Readers can't tell them apart.** "Overview" usually means the short version, but here Home is the short one. Someone who has read Home and sees "Overview" in the menu will expect the same thing again and skip it, missing the detail they wanted.
- **Editors will let them drift.** Two summaries of the same facts is how the first review's contradictions happened.

**Recommendations**
1. **Name it so readers expect more than Home.** ✅ *Decided: "About", at `/camelot/about`.* "About" is a familiar label for the longer story behind a page, and doesn't promise a summary the way "Overview" does. The page's opening line should still make the depth clear, for example "The full story of the bunkhouse: why it's needed, the plan, the money, and who's running it."
2. **Home summarizes; it never explains.** Every Home section is one to three sentences plus a link to the page that has the full version. If a Home sentence needs a second paragraph, that paragraph belongs on About.
3. **Write the shared short text once.** The two-sentence "What is Camelot?" and the three "why" bullets will appear on Home, at the top of About, and in the homepage banner. Keep them in one place, for example a `summary:` block in `bunkhouse_settings.yml` or an include, the same way `facts:` already works.

### C4. Navigation details

- **Menu order: About · Updates · Project details · FAQs · Donate.** Updates comes second because returning donors, the campaign's most valuable readers right now, come back for news. Donate goes last, styled as a button so it stands apart from the content pages.
- **Highlight the current page** in the menu (R20). With five items this is how readers know where they are, especially on the compact hero, which looks the same on every page.
- **Give each page a visible heading** under the compact hero (for example "Project details"), and its own `<title>` ("Updates · Camelot bunkhouse · MITOC"). Browser tabs, bookmarks, search results, and shared links currently all say "MITOC - Camelot Bunkhouse".
- **Link back to the main site near the top.** The footer works but is far down a long page. A small "MITOC home" link at the right end of the navbar, or in the menu, puts it where newcomers (P6) look first.
- **Update the menu data**: remove the commented-out History entry, since Updates replaces it.

---

## D. Page-by-page recommendations

### D1. Home (`/camelot`)

The page most people will see first, and for many the only one. Its job is to make the case fast and offer the next step.

```
[Full hero: Camelot bunkhouse · Coming 2027 · thermometer with "as of" · Donate]

## What is Camelot?            2 sentences + one real cabin photo (/images/camelot/)
                               "Camelot is MITOC's cabin on 20 acres near Rumney, NH, 2.5 hours from
                                Boston. For many members it's where their first MITOC trip happens."
                               → Visiting Camelot (/rentals/camelot)

## Why a new bunkhouse?        3 bullets, from the FAQ:
                               · The 1970s cabin is near the end of its life as sleeping space;
                                 within a few years it won't be safe to sleep in.
                               · It can't be brought up to lodging code.
                               · The bunkhouse will sleep 50 safely, in 5 rooms of 10, and the
                                 cabin stays as kitchen and lounge.
                               → The full story (About)

## Where things stand          ✓ Phase 1 done (2025): parking lot, bridge, trail. Photo.
                               ◯ Phase 2: the bunkhouse. $832,000 to go; construction starts once
                                 the full $1.3M is raised, planned for late spring 2027.
                               → Costs and funding (About#funding)

## Latest update               date · title · one line · "All updates →"   (hidden until posts exist)

## Help build it               Donate [button → Donate page] · "Gifts of every size count. Many
                               employers match gifts."
                               → Questions? FAQs
```

Notes:
- **Lead with a real photo.** The hero drawing shows the future; one photo of the cabin and one of the finished bridge show that this is a real place and real progress. They do more for P6 and P1 than any wording change.
- **"Where things stand" replaces the history.** Two status lines say more to a donor than four paragraphs of dates. The dates move to About and the backfilled Updates posts.
- **Drop the duplicate 2027.** With "Coming 2027" in the hero, the tagline can carry the status instead, for example "Phase 1 complete · Phase 2 fundraising now".
- **Fix the small "As of" line's contrast** while designing the full hero: give it the same solid backing as the amount, or move it below the box.
- **Add a meta description and share image** (`og:title`, `og:description`, `og:image` using the exterior rendering or a cabin photo). Fundraising emails, Slack, and social posts will show this preview, and today they'd show only "MITOC - Camelot Bunkhouse".

### D2. About (`/camelot/about`)

The current `/camelot` text moves here and gets headings. This replaces Part 2's R5. Order by what a detail-minded reader asks, not by date:

```
[Compact hero]
# About

## Camelot today               the shared 2-sentence intro, then: how members use it, capacity now (about 30),
                               the loft repair. Photos. Link to /rentals/camelot. Explain or drop "MITOCers".
## Why a new bunkhouse         the 3 shared bullets, expanded to a short paragraph each, with links to the
                               FAQ's code and "why not buy a house" answers
## The plan                    one-paragraph description of the building → Project details
## Timeline                    the phases as a dated list (2011 discussions … 2025 Phase 1 done …
                               late spring 2027 groundbreaking … fall 2027 complete). Mark done items ✓.
## What the $1.3 million pays for   the existing section, moved as is (give it a stable id, e.g. #funding)
## Who's leading the project   moved from the end of the FAQ: names, roles, MIT Facilities, DSL, contact
## Get involved                volunteer signup, updates list (R13), once they exist
```

Notes:
- **Remove the duplicate groundbreaking sentence** (current paragraph 4 repeats the funding section).
- **The timeline list replaces paragraphs 2–3** and stays correct without anyone updating it, which matters if Updates posts lapse.
- **Keep the closing line short or cut it.** "We look forward to seeing you…" is warm but adds nothing to a page whose last section should be an action.

### D3. Updates (`/camelot/updates`)

✅ *Decided: the web team owns the page, posts a few times a year, and will backfill the last two years.* Part 2's R6 still covers *how*, and its warning still applies: **a page whose newest post is a year old tells donors the project has stalled.** "A few times a year" works if no gap runs much past four months. Add milestone posts on top (full funding reached, groundbreaking, completion), and a short post when fundraising is the only news.

Changes to R6 for the new structure:
- **Don't launch it empty.** Launch with the backfilled posts from the last two years, at least one with Phase 1 photos. Suggested set:
  - summer 2024: site work begins
  - spring 2025: Phase 1 complete: parking lot, bridge, and trail (photos), with thanks to Phase 1 donors
  - 2025–26: final construction drawings and contractor quotes; the $1.3M estimate confirmed
  - fall 2026: Phase 2 fundraising kickoff, and where the total stands

  Earlier history (2011–2023) goes in About's Timeline list rather than in posts. That replaces R6's longer backfill list going back to 2018.
- **Show the latest post on Home**, not on About. Home is where returning visitors arrive from emails.
- **Each post gets its own URL** (a Jekyll collection), so each fundraising email can link to the specific post.
- **Put the date and amount raised at the top of every post**, so a reader can tell at a glance how current it is.
- **Put a reminder on someone's calendar** every few months, and update the thermometer (`donations_amount`, `number_donors`, `donations_as_of`) as part of writing each post.

### D4. Project details (`/camelot/project`)

In good shape since the headings and captions (R14).
- **Add a page heading and a one-sentence intro**: "The bunkhouse was designed with Maclay Architects in 2019–21. The final construction drawings were completed in 2025." This tells readers the design is settled.
- **Optional:** a short facts list at the top (sleeps 50 · 5 rooms of 10 · no running water · 3 composting toilets · sprinklered) for readers who won't read the prose.
- Keep the closing links to FAQs and Donate; point Donate at the Donate page.

### D5. FAQs (`/camelot/faqs`)

- **Move "How to donate" to the Donate page.** Keep a one-line group, "How to donate", that links there, so the `#donating` anchor still works. Add matching and non-cash questions on the Donate page rather than here.
- **Move "Who's involved" to About**, keeping "Who should I contact?" in the FAQ.
- **Add the R15 questions** as the committee answers them: what happens if the goal isn't met by spring 2027 (round-2 Q3), how donors are recognized, how much Camelot is used.
- **Add a page-top line**: "Can't find your answer? Email mitoc-bunkhouse@mit.edu."

### D6. Donate (`/camelot/donate`)

This is Part 2's R8, now with a fixed home. See R19.

```
[Compact hero]
# Ways to give

[Give online] big button → MIT form              "Gifts of every size count."   (above the fold on phones)

## Double your gift with employer matching   fund name and number, MIT as recipient, what portals ask for
## By check                                  moved from the FAQ, address with line breaks
## Stock, donor-advised funds, and IRA gifts  1–2 sentences each, linking to MIT's own instructions
## Pledges and larger gifts                  "Email mitoc-bunkhouse@mit.edu and a member of the committee will reply."
## Is my gift tax deductible?                moved from the FAQ
```

- ✅ *Decided: every Donate button, and the menu item, opens this page.* That adds one click for people who've already decided, so the page has to make that click cost nothing:
  - **"Give online" first,** visible without scrolling on a phone, before any explanation. The compact hero is short enough for this, but check it at phone width.
  - **On this page, the hero's Donate button goes straight to MIT's form** (or reads "Give online"), since a button that reloads the same page looks broken. Hide the full-width phone Donate button at the bottom here too, or point it at the form.
  - **The homepage banner's Donate button also opens this page.** For main-site visitors who don't yet know the project, that's an improvement.
  - Inline text links that say "Donate online" (in the funding section, for example) can stay pointed at the form, since their label promises the form.
- **Ship a minimal version now** with only what's already true (the plan's "2c-lite"), and fill in matching details and recognition when round-2 Q5 and Q6 come back. Add `/camelot/give` as a redirect to it.

### D7. Shared elements

- **Hero:** full on Home only; compact on every other page, including About.
- **Homepage banner:** "Learn more" goes to Home, which is now the right page. Its Donate button changes to the Donate page. Its text should use the shared summary from C3.
- **Rentals page:** no change needed; its link goes to Home.

---

## E. Personas against the new structure

**Verdict now, and what the new structure adds** (personas are described in Part 2, section 4)

| Persona | First review | Now (`bce5eba`) | Where the new structure helps most |
|---|---|---|---|
| P1: Phase 1 major donor | Poor | **Fair.** The money is clear and Phase 1 donors are thanked. No progress photos, no larger-gift path. | Updates (photos of what they built), Donate (pledges, IRA, a contact), About (who's accountable) |
| P2: Engineer with matching | Fair | **Fair.** The button works and small gifts are welcomed, but there's no matching info and the "why" is slow to find. | Home (the case in a minute), Donate (matching) |
| P3: Former Camelot manager | Fair to poor | **Fair.** The contradictions are gone. No usage data, no way to volunteer. | About (Get involved, timeline), FAQ (usage, R16) |
| P4: Former trip leader, project leader | Fair | **Fair.** The schedule is consistent and phases are defined, but what happens if funding misses spring 2027 is unanswered. | About (timeline, who's leading); depends on round-2 Q3 |
| P5: Current member, small donor | Fair | **Fair.** There's an "as of" date and small-gift wording. Still nothing new to see between visits. | Updates, Home's latest-update teaser |
| P6: New member | Poor | **Fair to poor.** The banner explains Camelot and the footer links home, but there's no real photo or visiting link on the bunkhouse pages. | Home ("What is Camelot?" with photo and visiting link) |

**Which page answers each task, once built**

| Task | Answered now? | Page in the new structure |
|---|---|---|
| Understand what Camelot is | Partly (one sentence, no photo) | Home; About |
| Understand why a bunkhouse is needed now | Only in the FAQ | Home (bullets); About (full) |
| See progress so far | No | Updates; Home teaser; About timeline |
| Know how much is still needed | **Yes** | Hero (every page); About funding section |
| Trust the schedule and budget | Partly (missed-goal answer missing) | About timeline and funding; FAQ |
| Give online | **Yes** | Every Donate button |
| Get a gift matched | No | Donate |
| Give stock, IRA, a pledge, or a large gift | No | Donate |
| Volunteer or contribute expertise | No | About (Get involved) |
| Visit Camelot, or get back to the main site | Footer only | Home (visiting link); navbar link (R20) |

---

## F. Upkeep risks in the new structure

- **Six pages means more places to go stale.** Keep every number in `facts:` and every repeated summary in one shared place (C3). The Home page in particular should contain almost no text that isn't shared or linked.
- **Updates is the page most likely to go stale.** Tie updating the thermometer (`donations_amount`, `donations_as_of`) to writing each post, so both stay current together.
- **The hero's "Coming 2027"** becomes wrong the moment the schedule slips. If round-2 Q3 says groundbreaking could move to 2028, change `hero_subtitle` the same day, and say so in an Updates post.

---

## G. Recommendations from the second review

R1–R16 are in Part 2, section 6. The new structure changes these:
- **R5 (restructure the overview)** is replaced by R17 (Home) and R18 (About).
- **R6 (Updates page)** stands, with the changes in D3. The web team owns it.
- **R8 (Ways to give)** becomes R19: its own Donate page.
- **R11 ("What is Camelot?")** goes on Home (R17), with the longer version on About (R18).
- **R13 (Get involved)** goes on About.
- **R15 (FAQ revision)** now also moves two groups out of the FAQ (D5).

**R17. Split `/camelot` into Home and About.** *Effort M. All personas.*
- Move the current [_pages/camelot/index.md](../../_pages/camelot/index.md) content to a new `_pages/camelot/about.md` (`permalink: /camelot/about`, `title: About`, no `hero: full`), then build the new Home in `index.md` (`hero: full`) following D1. Add `/camelot/overview /camelot/about 301` to `_redirects`, since "overview" was the name in the web team's brief and may already be in drafts or emails.
- Add a shared `summary:` block (what Camelot is; the three "why" bullets) to `bunkhouse_settings.yml`, and use it on Home, About, and the homepage banner.
- Use one real cabin photo now; add a Phase 1 photo when one arrives (round-2 Q7).
- Add the Latest update slot as a loop over the Updates collection that shows nothing when it's empty, so Home can ship before Updates does.
- Change `hero_tagline` so the hero doesn't say 2027 twice, and fix the contrast of the "As of" line.
- **Content-review tool:** [make_content_doc.js](tools/make_content_doc.js) reads `index.md` for the OV labels. Point it at `about.md` and add Home labels (for example HOME-n), then regenerate the doc.

**R18. Restructure About.** *Effort M. Personas P1, P3, P4.* Follow D2. Give the funding section a stable id (`#funding`) for Home and emails to link to. Move "Who is managing this project?" here from the FAQ, keeping its old anchor working with an `old_ids`-style span on the FAQ page, or a short FAQ answer that links here.

**R19. Add a Donate page.** *Effort S for the minimal version; M once round-2 Q5 and Q6 are answered. Personas P1, P2, P4.* Follow D6. Add `donate_page: /camelot/donate` to `bunkhouse_settings.yml` and point the `Donate` menu entry, every Donate button in the layout, and the homepage banner's Donate button at it. Keep `donate_link` (MIT's form) for the page's "Give online" button, the hero button on the Donate page itself, and inline "Donate online" links. Move the check and tax-deductibility answers from the FAQ, and leave the `#donating` group as a one-line pointer. Add `/camelot/give /camelot/donate 301` to `_redirects`.

**R20. Give each page its own identity.** *Effort S. All personas.*
- In [bunkhouse_base.html](../../_layouts/bunkhouse_base.html), build the `<title>` from the page: `{% if page.title %}{{ page.title }} · {% endif %}Camelot bunkhouse · MITOC`. Add `title:` to each page's front matter.
- Show `page.title` as a visible `h1` at the top of the content on every page except Home.
- Highlight the current menu item: in [menu-link.html](../../_includes/menu-link.html), add `class="active"` to the `<li>` when `include.item.href == page.url` (Bootstrap's navbar already styles `.active`). The main site uses the same include, so check it there too.
- Add a "MITOC home" link near the top of the bunkhouse navbar, right-aligned.

**R21. Add share previews.** *Effort S. All personas, through emails and posts.* In `bunkhouse_base.html`, add `<meta name="description">` and Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`), from `page.description` with a site-wide default for the section. Home matters most.

### Suggested order of work

1. **Now:** R20, R21, the minimal R19 Donate page, and the one-line "raised by" wording fix. Small, independent, and each one helps on its own.
2. **Next:** R17 and R18 together, since they move the same text. Home ships with the Latest update slot empty.
3. **Then Updates (R6):** the web team writes the backfill posts once Phase 1 photos are collected. Home's teaser starts showing posts automatically.
4. **As the committee answers round 2:** fill in the Donate page (Q5, Q6), the missed-goal FAQ and funding line (Q3), Get involved (Q8), and usage numbers (R16).

[implementation-plan.md](implementation-plan.md) turns this order into batches: Stage 3 (items 1), Stage 4 (item 2), Stage 5 (item 3), and Stage 6 (item 4).

---

## H. Decisions from the web team

*Decided 2026-11-20. Each row says what changes in this review and in [implementation-plan.md](implementation-plan.md).*

| # | Question | Decision | What it changes |
|---|---|---|---|
| 1 | Menu name for the full-story page | **"About", at `/camelot/about`** | R17, R18, C3, D2. The file is `_pages/camelot/about.md`. Add a redirect from `/camelot/overview`, the name used in the brief. |
| 2 | Where Donate goes | **Every Donate button, and the menu item, opens a `/camelot/donate` page** with more information about giving | R19, D6, C1. This differs from the review's original suggestion (buttons straight to MIT's form). It works as long as "Give online" is the first thing on the Donate page, visible on a phone without scrolling, and the Donate page's own hero button goes to the form (D6). |
| 3 | "Raised by" or "given or pledged" | **"Raised by"** | Change the funding section on the overview/About from "314 people have given or pledged $468,000" to wording like "$468,000 has been raised by 314 people". The thermometer already says "Raised by". |
| 4 | Who owns Updates | **The web team, posting a few times a year, with backfilled posts from about the last two years** | R6, D3. Stage 5 is unblocked apart from Phase 1 photos. The round-2 updates-owner question is answered and has been removed from the content-review doc. Earlier history goes in About's Timeline list, not in posts. |

**What still waits on the committee:** round-2 Q1–Q10 in [bunkhouse-content-review.docx](bunkhouse-content-review.docx) (renumbered after the updates-owner question was removed, so the gift preset is now Q9 and rentals parking Q10). Photos of the Phase 1 work (Q7) now block both the Updates backfill and Home's "Where things stand" photo, so they're the most useful thing to chase first.

---

# Part 2: First review (2026-11-19)

*Kept as the record of the original findings. Sections 3 (structure) and R5 describe the site before the restructure; see Part 1 for the current recommendations.*

> **Comparing against `main`?** This review covers `bunkhouse-edits`, which has two commits that aren't on `main` yet (`8d992b5`, `cd2bad8`). Those commits already fixed several problems, so they don't appear below:
> - **Cost:** $500,000 is updated to $1.3M on the overview, FAQ, and homepage banner. The thermometer now shows $468K raised toward $1.3M from 314 donors.
> - **Date:** "finish construction … in 2025," which had passed, is replaced with "Phase 2 … breaking ground in 2027."
> - **FAQ:** the questions moved into [_data/bunkhouse_faqs.yml](../../_data/bunkhouse_faqs.yml) and are grouped into sections with a jump list.
>
> The same commits introduced or worsened a few problems that the review does cover:
> - "Phase 1" now has two meanings (section 7, R3).
> - It's unclear whether "$1.3M total costs" includes the parking lot and trail (R7).
> - The FAQ cost answer kept its 2022 wording about the old $500K estimate (R7, R15).
> - The thermometer no longer separates money received from money pledged (R7, open question 1).
>
> Every other finding applies to both `main` and this branch.

---

## 1. Summary

The bunkhouse pages look good at first glance. The hero image is attractive, the fundraising progress bar is clear, and the FAQ page is well organized. They work best for someone who already knows the project and only needs a Donate button. They work poorly for the two jobs this campaign needs most right now:

1. **Persuading a previous donor to give again for Phase 2.** The site never says what Phase 1 money accomplished, how much Phase 2 still needs, or what has changed since 2022. Several facts contradict each other, including what "Phase 1" even means.
2. **Turning MITOC members and younger alumni into first-time donors.** There is nothing on employer matching or small gifts, and the online form opens pre-filled at $1,000. Newcomers are never told what Camelot is.

**The five most valuable changes:**

| # | Change | Why it matters | Effort |
|---|---|---|---|
| 1 | **Fix broken and stale items:** the dead Donate button on phones, contradictory facts, the out-of-date bunkhouse section on the Camelot rentals page, and a missing link back to the main MITOC site. | These cost credibility with every audience, especially the detail-oriented ones. | Small |
| 2 | **Add an Updates page with dated posts, in the style of Kickstarter project updates.** Start it with posts for past milestones, including photos of the completed Phase 1 work (bridge, parking lot, trail). Then add a new post at least every quarter. Show the latest post on the overview and an "as of" date on the thermometer. | Repeat donors need to see their last gift at work before they give again. This is the strongest argument the campaign has, and it's currently one sentence. Each post also gives fundraising emails something to link to. | Medium. Needs photos and a named person to write posts. |
| 3 | **State the money plainly:** what Phase 2 costs, how much is raised toward it, the gap, and what happens if costs rise. | Major donors and analytically minded alumni will look for exactly this. Right now it can't be worked out from the site. | Small to write, but needs committee facts. |
| 4 | **Add a "Ways to give" section:** employer matching, stock/DAF/IRA gifts, pledges, check, a named contact for larger gifts, and an online form without the $1,000 preset. | Three of the six personas have specific giving needs that the site ignores. | Medium. Needs committee decisions. |
| 5 | **Restructure the overview page** into short, headed sections ordered by what readers ask first, and add a "What is Camelot?" introduction for people who've never been. | The overview is currently five unheaded paragraphs in chronological order. On phones the first real content appears only after a full screen of hero image. | Medium |

**Verdict by persona** (details in section 4):

| Persona | Knows the project? | How well the site serves them now |
|---|---|---|
| P1: Phase 1 major donor, MIT '50–'75 | Yes | **Poor.** Missing almost everything a major repeat donor needs. |
| P2: Software engineer, MIT '90–'05, has employer matching | Maybe | **Fair.** The Donate button works, but there's no matching info and the case is slow to read. |
| P3: Former Camelot manager, now director of applied science | Yes, in depth | **Fair to poor.** Contradictions and missing numbers will stand out to them. |
| P4: Former trip leader and activity chair (postdoc ~2015), now project leader at a large company | Partly | **Fair.** Good design detail, but no schedule, risk, or governance picture. |
| P5: Current active member, small donor | Somewhat | **Fair.** No progress updates, no small-gift path, unclear how to help besides money. |
| P6: New member who's never heard of the project | No | **Poor.** Never told what Camelot is, how to visit, or how to get back to the main site. |

---

## 2. Scope and method

**Pages reviewed**

| URL | Source | Notes |
|---|---|---|
| `/camelot` | [_pages/camelot/index.md](../../_pages/camelot/index.md) | Overview / fundraising page |
| `/camelot/project` | [_pages/camelot/project.md](../../_pages/camelot/project.md) | Design details and drawings |
| `/camelot/faqs` | [_pages/camelot/faqs.md](../../_pages/camelot/faqs.md), with content in [_data/bunkhouse_faqs.yml](../../_data/bunkhouse_faqs.yml) | 23 questions in 6 groups |
| (all three) | [_layouts/bunkhouse.html](../../_layouts/bunkhouse.html), [_layouts/bunkhouse_base.html](../../_layouts/bunkhouse_base.html), [_data/bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml) | Hero, thermometer, nav, Donate link |
| Every main-site page | [_includes/camelot_banner.html](../../_includes/camelot_banner.html) via [_layouts/base.html:23](../../_layouts/base.html#L23) | Collapsible fundraising banner, the main entry point |
| `/rentals/camelot` | [_pages/rentals/camelot.md](../../_pages/rentals/camelot.md) | Has its own "Bunkhouse project" section |
| `/bunkhouse` | (none) | **404.** There's no page or redirect. |

**Method.** For each persona I listed their likely top questions and tried to answer them on the rendered site, starting from wherever they would plausibly arrive: a fundraising email link to `/camelot`, the homepage banner, or a search. I checked layout and interaction at both widths with an automated browser, including tapping buttons and opening the phone menu.

**Limits.** This is an expert review. There was no testing with real users and no analytics. I couldn't inspect the MIT giving form (it's rendered by JavaScript), so its fund name and matching-gift options are unverified. The personas are representative, not real individuals.

**Severity scale used below**
- **Blocker:** the user can't complete the task, or gets wrong information.
- **Major:** the task is slow or confusing, or the user is likely to leave unconvinced.
- **Minor:** a small annoyance or polish issue.

---

## 3. How the section is structured today

*This is the structure on 2026-11-19. Part 1, section C1, has the new six-page structure.*

```
Main site (every page)
 └─ Collapsible "Camelot Bunkhouse Fundraising" banner
     ├─ Donate (always visible) ──────────────► MIT giving form ($1,000 preset)
     └─ "Read more" (only after expanding) ───► /camelot

/camelot section (own nav bar, no link back to the main site)
 ├─ Camelot Bunkhouse (/camelot)   5 paragraphs, chronological, no headings
 ├─ Project Details (/camelot/project)   6 paragraphs + 4 drawings, no headings
 ├─ FAQs (/camelot/faqs)   jump list → 6 groups, 23 Q&As
 └─ Donate ──────────────────────────────────► MIT giving form

Every /camelot page repeats the same large hero image, headline, thermometer and Donate button.

/rentals/camelot (main site) has a "Bunkhouse project" section from about 2018 with no link to /camelot.
```

**What works and should be kept**
- **Hero, thermometer, and Donate button** ([screenshot](screenshots/overview-desktop-fold.jpg)). On desktop you see the amount raised, the goal, the number of donors ("314 people" is good social proof), and a clear Donate button without scrolling.
- **The FAQ page's grouped jump list** ([screenshot](screenshots/faqs-mobile-fold.jpg)). It's easy to scan, works well on phones, and keeps old deep links working.
- **The architectural drawings** on the project page. The site plan, floor plan, section, and elevation are excellent for the technically minded personas.
- **Content lives in data files.** Totals, the donate link, and FAQs are in `_data/`, so routine updates don't touch the layout.
- **No horizontal scrolling on phones,** and the phone menu works ([screenshot](screenshots/overview-mobile-menu-open.jpg)).

---

## 4. Findings by persona

Each persona section lists their top questions, what happens when they try to answer them, and their specific problems. Recommendation IDs such as **R3** refer to section 6.

### P1: Phase 1 major donor (MIT '50–'75, past MITOC participant or leader, funds capital projects)

**Context.** Probably arrives from a personal email or letter from the campaign that links to `/camelot`, often on a desktop or tablet. They're experienced with capital campaigns and have funded other backcountry cabins, so they'll compare this one to campaigns that send progress reports, budgets, and stewardship updates. They may remember Camelot from its early years, since the cabin dates from the 1970s.

**Top questions, in order**
1. What did my Phase 1 gift accomplish?
2. What exactly is Phase 2, what does it cost, and how much is still needed?
3. Is the project well run and on track? Who's accountable? What are the risks, such as cost increases since the 2022 estimate?
4. How do I make a large or non-cash gift (stock, IRA distribution, multi-year pledge), and whom do I talk to?
5. How will donors be recognized? Are there naming opportunities?

**Walkthrough**
- **Q1:** One sentence in the overview's third paragraph says Phase 1 "included a new bridge, off-street parking lot, and access trail … completed in spring 2025" ([index.md:10](../../_pages/camelot/index.md#L10)). There are no photos, no thanks to Phase 1 donors, and no indication of what Phase 1 cost or whether it came in on budget. The hero still says **"Site construction has started!"** ([bunkhouse.html:8](../../_layouts/bunkhouse.html#L8)), which was news in 2024. Nothing on the site shows real progress. Every image is an architect's drawing.
- **Q2:** This can't be answered reliably:
  - The overview says "$1.3 million total costs" for Phase 2 ([index.md:12](../../_pages/camelot/index.md#L12)).
  - The FAQ says the $1.3M **excludes** the parking lot and trail ([bunkhouse_faqs.yml:49-54](../../_data/bunkhouse_faqs.yml#L49-L54)). So is the $1.3M Phase 2 alone, or the whole project?
  - The thermometer shows $468,000 of $1,300,000. Does that $468K include money already spent on Phase 1? If so, the Phase 2 gap is bigger than it looks.
  - "Phase 1" itself is defined two ways. The overview uses it for the bridge, parking lot, and trail; the FAQ uses it for the architect's design work ([bunkhouse_faqs.yml:52](../../_data/bunkhouse_faqs.yml#L52)).
- **Q3:** The cost FAQ says COVID "added significant uncertainty" but "we have decided to move forward with $1.3 million" ([bunkhouse_faqs.yml:47](../../_data/bunkhouse_faqs.yml#L47)). That decision dates from 2022 and hasn't been revisited on the page. The "Who is managing this project?" FAQ names the leaders, which helps, but it's the 22nd of 23 questions. Nothing explains how MIT oversees the project, what happens if the goal isn't met, or what happens if bids come in high.
- **Q4:** The only giving options are the online form and a mailed check. There's nothing on stock, donor-advised funds, IRA qualified charitable distributions (very relevant for donors over 70½), pledges, or bequests, and no named person to call. The general contact is a list address, mitoc-bunkhouse@mit.edu.
- **Q5:** Not mentioned anywhere.

**Problems**

| Severity | Problem | Where |
|---|---|---|
| Blocker | You can't tell how much Phase 2 still needs or what the thermometer counts. "Phase 1" has two conflicting definitions. | [index.md:10-12](../../_pages/camelot/index.md#L10-L12), [bunkhouse_faqs.yml:49-54](../../_data/bunkhouse_faqs.yml#L49-L54), [bunkhouse_settings.yml:2-3](../../_data/bunkhouse_settings.yml#L2-L3) |
| Major | No evidence of progress: no photos of the completed bridge, parking lot, or trail, and no dated updates. | Whole section |
| Major | No acknowledgement of previous donors and no stewardship ("here's what you built"). | Overview |
| Major | Larger and non-cash gifts aren't covered: stock, DAF, IRA distributions, pledges, planned giving, or a named contact. | [bunkhouse_faqs.yml:60-72](../../_data/bunkhouse_faqs.yml#L60-L72) |
| Major | The 2022 cost estimate is presented without saying whether it's still current, or what happens if costs rise. | [bunkhouse_faqs.yml:45-47](../../_data/bunkhouse_faqs.yml#L45-L47) |
| Minor | Stale wording: "Site construction has started!", and the trail described in future tense although it's finished. | [bunkhouse.html:8](../../_layouts/bunkhouse.html#L8), [bunkhouse_faqs.yml:54](../../_data/bunkhouse_faqs.yml#L54) |
| Minor | Donor recognition isn't mentioned at all. | — |

**Most helpful fixes for P1:** R3, R6, R7, R8, R5.

---

### P2: Software engineer (MIT '90–'05) at a large company with donation matching

**Context.** Likely arrives from an alumni email or newsletter link, probably on a phone during a break, or from the main-site banner while looking at something else. They may or may not know about the project. They'll decide quickly: a few minutes to understand and give, or they'll close the tab. Their employer's matching program (typically Benevity, YourCause, or similar) can double the gift, but only if they know it's eligible and how to submit it.

**Top questions**
1. What is this, and why should I care? (in 30 seconds)
2. Does my employer match it, and how do I submit the match?
3. How do I give quickly, at an amount I choose?

**Walkthrough**
- **Q1:** On a phone, the hero takes the whole first screen ([screenshot](screenshots/overview-mobile-fold.jpg)). The first paragraph is long and starts with background before getting to the point. The core case (the cabin's sleeping loft is closed for safety, so MITOC needs safe sleeping space for 50) appears only in the FAQ ([bunkhouse_faqs.yml:20](../../_data/bunkhouse_faqs.yml#L20)). The overview says the bunkhouse is needed "to maintain this opportunity for future generations," which doesn't say what's wrong now.
- **Q2:** Matching isn't mentioned anywhere. The fund number (3892696) appears only inside the "donate by check" FAQ. Matching portals usually ask for the recipient organization (MIT), MIT's tax ID, and sometimes a designation, none of which appear on the site. P2 has to email someone or give up on the match.
- **Q3:** The Donate button works on desktop and in the phone hero. **The second Donate button at the bottom of every page on phones does nothing**: it's a `<button>` with no link or script ([bunkhouse.html:35-37](../../_layouts/bunkhouse.html#L35-L37)). I tapped it to confirm. That's exactly where a phone reader lands after finishing the text ([screenshot](screenshots/overview-mobile-full.jpg)). The working link opens the MIT form with **$1,000 pre-filled** ([bunkhouse_settings.yml:1](../../_data/bunkhouse_settings.yml#L1)). For many in this group, $100–$500 matched is a natural gift, and a $1,000 anchor can feel presumptuous or put them off.

**Problems**

| Severity | Problem | Where |
|---|---|---|
| Blocker | The bottom-of-page Donate button on phones does nothing. | [bunkhouse.html:35-37](../../_layouts/bunkhouse.html#L35-L37) |
| Major | No employer-matching information. | — |
| Major | The core "why now" case isn't on the overview. It's buried in the FAQ. | [index.md:6](../../_pages/camelot/index.md#L6), [bunkhouse_faqs.yml:20](../../_data/bunkhouse_faqs.yml#L20) |
| Major | On phones the hero fills the first screen on every page, pushing content down. | [screenshot](screenshots/overview-mobile-fold.jpg), CSS `.bunkhouse-banner` |
| Minor | The $1,000 preset may discourage mid-sized gifts. | [bunkhouse_settings.yml:1](../../_data/bunkhouse_settings.yml#L1) |

**Most helpful fixes for P2:** R1, R8 (matching), R9, R5, R10.

---

### P3: Former Camelot cabin manager, now director of applied science at a data-science startup

**Context.** Knows Camelot intimately and probably the early bunkhouse discussions too. They'll read the FAQ and project page closely and notice anything inaccurate. They're analytical and will want numbers: usage, budget, operating costs. They're a potential donor and also a potential advisor or volunteer, but nothing invites that kind of involvement.

**Top questions**
1. Are the facts right and current? What's the real status?
2. What's the budget breakdown and the operating model? Does the fee math work?
3. What usage data justifies building for 50 people?
4. How can I contribute expertise, not just money?

**Walkthrough**
- **Q1:** They'll find several contradictions (full list in section 7):
  - The bunkhouse is "a few hundred yards away" from the cabin on the overview but "about 100 meters" on the project page and banner.
  - The project has been discussed "for almost a decade" or since 2013, depending on the page.
  - The homepage banner says the cabin "is nearing the end of its useful life", while the FAQ says it's "serviceable … for another 10-20 years".
  - The `/rentals/camelot` page still says the bunkhouse is "in the earliest stages of planning" and won't be built "until the early 2020s" ([rentals/camelot.md:57](../../_pages/rentals/camelot.md#L57)).
  - The same rentals page says the cabin "can accommodate groups of 40 or more" ([rentals/camelot.md:11](../../_pages/rentals/camelot.md#L11)), while the bunkhouse FAQ says the loft is closed and the cabin can't safely sleep a large group.
- **Q2:** The FAQ says maintenance will be funded by "about $20 per person per night in accordance with MITOC's current practices" ([bunkhouse_faqs.yml:58](../../_data/bunkhouse_faqs.yml#L58)). The rentals page says the current fee is **$10** ([rentals/camelot.md:43](../../_pages/rentals/camelot.md#L43)). There's no budget breakdown beyond the single $1.3M figure, which is based on comparisons with Dartmouth.
- **Q3:** There's no usage data: nights per year, peak-weekend demand, how many trips or students Camelot serves, or how capacity changed when the loft closed.
- **Q4:** "Will students be involved in construction? Alums?" gets a vague "where possible" ([bunkhouse_faqs.yml:91-93](../../_data/bunkhouse_faqs.yml#L91-L93)). There's no volunteer signup and no updates mailing list. The only signup link (cabin-helpers) is on the stale rentals section.

**Problems**

| Severity | Problem | Where |
|---|---|---|
| Major | Several factual contradictions within the section and with `/rentals/camelot`. | See section 7 |
| Major | The fee in the operating-model FAQ contradicts the published rental fee. | [bunkhouse_faqs.yml:58](../../_data/bunkhouse_faqs.yml#L58), [rentals/camelot.md:43](../../_pages/rentals/camelot.md#L43) |
| Major | No usage or impact numbers to justify the scale of the project. | — |
| Major | No way to offer expertise or volunteer, and no updates list. | [bunkhouse_faqs.yml:91-93](../../_data/bunkhouse_faqs.yml#L91-L93) |
| Minor | The project page has no headings or captions, so it's hard to skim or link to a topic (e.g. fire safety). | [project.md](../../_pages/camelot/project.md), [screenshot](screenshots/project-desktop-full.jpg) |

**Most helpful fixes for P3:** R3, R4, R7, R13, R16, R14.

---

### P4: Formerly highly involved trip leader and activity chair (postdoc ~2015), now a project leader at a large aerospace company

**Context.** Remembers Camelot well from running trips about ten years ago, possibly when the loft was still in use, so the loft closure may be news to them. They likely heard about the bunkhouse in passing. Professionally, they judge projects on schedule, risk, and governance, and they'll read the site with that eye. Their employer likely matches gifts. They may be weighing a meaningful gift and also asking whether the project will actually get built.

**Top questions**
1. What's changed at Camelot since I was there? Why is this needed?
2. Is there a credible plan: schedule, milestones, who's accountable, contractor, risks?
3. Will it really be done in 2027?
4. Matching, and how to give.

**Walkthrough**
- **Q1:** The fact that matters most to someone who led trips there, that **the loft is closed**, is in the second FAQ answer and never on the overview.
- **Q2:** The facts are scattered. Approvals and dates are in overview paragraph 3. The construction method and contractor approach are in the FAQ. The leaders are at the end of the FAQ. There's no single timeline showing what's done, what's next, and what it depends on.
- **Q3:** The hero says **"Coming 2027"**. The overview says "breaking ground in 2027". The FAQ says the bunkhouse "could be finished in 2027" if funding allows, and that construction takes about six months with a winter pause ([bunkhouse_faqs.yml:81-85](../../_data/bunkhouse_faqs.yml#L81-L85)). Breaking ground and finishing in the same year, with a winter pause in between, is tight. A project leader will notice and may discount the whole page. The schedule also depends on funding, but the site never says what funding level triggers groundbreaking or by when it's needed.
- **Q4:** Same as P2: there's no matching information.

**Problems**

| Severity | Problem | Where |
|---|---|---|
| Major | No consolidated timeline or milestone view. Schedule claims conflict ("Coming 2027" vs breaking ground in 2027). | [bunkhouse.html:7](../../_layouts/bunkhouse.html#L7), [index.md:12](../../_pages/camelot/index.md#L12), [bunkhouse_faqs.yml:77-85](../../_data/bunkhouse_faqs.yml#L77-L85) |
| Major | The funding trigger for construction isn't stated (how much must be raised, and by when). | — |
| Major | The loft closure, the key "what changed" fact, is buried in the FAQ. | [bunkhouse_faqs.yml:20](../../_data/bunkhouse_faqs.yml#L20) |
| Major | No matching information. | — |
| Minor | Governance and accountability (MIT Facilities, Division of Student Life, MITOC board) appear only at the end of the FAQ. | [bunkhouse_faqs.yml:121-123](../../_data/bunkhouse_faqs.yml#L121-L123) |

**Most helpful fixes for P4:** R6, R7, R5, R8, R3.

---

### P5: Current involved MITOC member who wants progress news and may give a small amount

**Context.** Has been to Camelot, probably several times, and has seen the banner on the main site many times. They want to know where things stand and whether a $20–$50 gift is worth making. They're likely on a phone. They may also want to help with work days.

**Top questions**
1. What's the latest? Has anything happened since last semester?
2. Does a small gift matter, and can I give $25 without it feeling silly?
3. How does this affect my trips now? Where do people sleep while the loft is closed?
4. Can I help in person?

**Walkthrough**
- **Q1:** There are no dates or updates. The thermometer has no "as of" date, so a returning visitor can't tell whether it has changed. The figures in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml) are updated by hand.
- **Q2:** The form opens at $1,000. Nothing says small gifts count, although the donor count is a good hook: 314 people, and many likely gave small amounts.
- **Q3:** The bunkhouse FAQ says the loft is closed, but the rentals page still advertises room for "40 or more", so a member trying to plan can't tell which is true.
- **Q4:** Same as P3: there's no volunteer signup or work-day information.
- **Phone layout:** the hero repeats on every page, so on `/camelot/faqs` the first question starts below the first screen ([screenshot](screenshots/faqs-mobile-fold.jpg)). The bottom Donate button is the dead one from P2.

**Problems**

| Severity | Problem | Where |
|---|---|---|
| Blocker | The dead bottom Donate button on phones. | [bunkhouse.html:35-37](../../_layouts/bunkhouse.html#L35-L37) |
| Major | No progress updates or dates, and no "as of" date on the thermometer. | [bunkhouse.html:9-30](../../_layouts/bunkhouse.html#L9-L30) |
| Major | No small-gift messaging, and the form opens at $1,000. | [bunkhouse_settings.yml:1](../../_data/bunkhouse_settings.yml#L1) |
| Major | No volunteer or work-day path. | — |
| Minor | Current capacity is unclear, with the rentals page and FAQ disagreeing. | [rentals/camelot.md:11](../../_pages/rentals/camelot.md#L11) |
| Minor | The repeated full-size hero slows reading on phones. | CSS `.bunkhouse-banner` |

**Most helpful fixes for P5:** R1, R6, R9, R13, R10.

---

### P6: New MITOC member who doesn't know about the project

**Context.** Arrives on the main site looking for trips, gear, or membership and sees the banner on every page ([desktop](screenshots/home-desktop-fold.jpg), [phone](screenshots/home-mobile-fold.jpg)). They don't know what or where Camelot is, or that MITOC owns cabins. They're unlikely to donate now. The goal is for them to understand Camelot, visit it, and become a future supporter.

**Top questions**
1. What is Camelot? Where is it? Can I go?
2. Why is MITOC raising money, and should I care?
3. How do I get back to what I was doing?

**Walkthrough**
- **The banner.** Collapsed, it shows a heading, two faded lines of text, and a large red Donate button. The **"Read more" link is hidden until you expand the banner**, and the only expand cue is two small chevrons at the far left and right edges. The text begins "As you may know, Camelot was built in the 1970s…", which assumes knowledge a new member doesn't have. So the most prominent action for a newcomer is Donate, for something they don't yet understand.
- **Q1:** On `/camelot`, the first sentence says Camelot is a cabin "near Rumney, NH" that has been central for 50 years. There are no photos of the real cabin (every image is a drawing of the future bunkhouse), no map, and no link to [/rentals/camelot](../../_pages/rentals/camelot.md), which has photos and visiting instructions. Words like "MITOCers" and "Groton" (the town, versus Rumney in the address) go unexplained.
- **Q2:** As for P2, the "why" is buried.
- **Q3:** **The bunkhouse nav bar has no link to the MITOC homepage.** The site name is hidden (`hide_root=true` in [bunkhouse_base.html:18](../../_layouts/bunkhouse_base.html#L18)), and the menu lists only the bunkhouse pages ([screenshot](screenshots/overview-mobile-menu-open.jpg)). The only way back is the browser's Back button.

**Problems**

| Severity | Problem | Where |
|---|---|---|
| Major | No link back to the main MITOC site from any bunkhouse page. | [bunkhouse_base.html:18](../../_layouts/bunkhouse_base.html#L18), [bunkhouse_settings.yml:5-15](../../_data/bunkhouse_settings.yml#L5-L15) |
| Major | No "What is Camelot?" introduction: no photos of the actual cabin, no location context, no link to visiting info. | [index.md:6](../../_pages/camelot/index.md#L6) |
| Major | The collapsed homepage banner shows Donate but hides "Read more". Its copy assumes prior knowledge. | [camelot_banner.html:12-20, 38-55](../../_includes/camelot_banner.html#L12-L55) |
| Minor | `/rentals/camelot` doesn't link to the bunkhouse pages, and its bunkhouse info is years out of date. | [rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57) |
| Minor | `/bunkhouse` (a natural URL to guess) returns 404. | [_redirects](../../_redirects) |

**Most helpful fixes for P6:** R2, R11, R12, R4.

---

## 5. Across personas

**Which tasks are well served**

| Task | P1 | P2 | P3 | P4 | P5 | P6 |
|---|---|---|---|---|---|---|
| Understand what Camelot is | ✓ | ~ | ✓ | ✓ | ✓ | ✗ |
| Understand why a bunkhouse is needed now | ~ | ✗ | ✓ | ~ | ~ | ✗ |
| See progress so far | ✗ | ✗ | ✗ | ✗ | ✗ | — |
| Know how much is still needed for Phase 2 | ✗ | ~ | ✗ | ✗ | ~ | — |
| Trust that schedule and budget are credible | ✗ | — | ✗ | ✗ | — | — |
| Give online | ✓ | ~ (phone bug, preset) | ✓ | ✓ | ~ | — |
| Get a gift matched | — | ✗ | — | ✗ | — | — |
| Give stock, IRA, pledge, or a large gift | ✗ | — | ~ | — | — | — |
| Volunteer or contribute expertise | — | — | ✗ | ~ | ✗ | ~ |
| Visit Camelot, or get back to the main site | — | — | — | — | ~ | ✗ |

✓ served · ~ partly / with effort · ✗ not served · — not a priority for this persona

**Needs that compete, and how to handle them**
- **Donors want detail; newcomers want brevity.** Keep the overview short and layered. Each section gets a one- or two-sentence summary that links to detail on the project, FAQ, or a new progress page. Avoid long blocks of text on the overview.
- **Major donors want a personal touch; small donors want speed.** The online Donate button stays prominent for everyone. A "Ways to give" section gives larger and non-cash gifts their own short path with a named contact. Major donors won't give through the web form anyway; the site's job is to make the case credible and put them in touch with a person.
- **The banner is on every main-site page, but most visitors are there for something else.** Lead the banner with what Camelot is, aimed at newcomers, rather than with a request for money. Make "Learn more" as visible as Donate.

**Problems that affect everyone**
1. Stale and contradictory facts (section 7).
2. No dated progress information.
3. The money picture is unclear.
4. The overview is organized by history rather than by readers' questions.
5. On phones, the repeated hero and the dead bottom button.

---

## 6. Prioritized recommendations

Each item is written so it can be handed to Claude Code as a task. **Decision** marks items that need a fact or choice from the bunkhouse or fundraising committee first. Effort: S is under an hour, M is a few hours, L is a day or more, or waits on content.

### Quick wins (no decisions needed)

**R1. Fix the dead Donate button on phones.** *Effort S. Personas P2, P5.*
In [_layouts/bunkhouse.html:35-37](../../_layouts/bunkhouse.html#L35-L37), replace the `<button>` with an `<a href="{{site.data.bunkhouse_settings.donate_link}}" class="bunkouse-donate-button">`, matching the hero button. While there, consider fixing the class-name typo `bunkouse` → `bunkhouse` everywhere it appears (layout, banner include, and `css/mitoc.css`).
✅ *Done in `8e67d88`, including the typo fix.*

**R2. Add a way back to the main site from bunkhouse pages.** *Effort S. Persona P6.*
Either drop `hide_root=true` in [bunkhouse_base.html:18](../../_layouts/bunkhouse_base.html#L18) so the "MIT Outing Club" brand link appears, or add a "← MITOC home" item to the menu in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml). While editing the menu, rename "Camelot Bunkhouse" to "Overview".
✅ *Done in `8e67d88`. I dropped `hide_root=true` and renamed the menu item. In `2aba590`, the navbar font sizes were also changed to match the main site. Changed later at the maintainer's request (`64657fd`): the navbar brand now reads "MITOC Bunkhouse" and links to `/camelot`, and the link back to the main site is in a new footer ("© 2026 MITOC").*

**R4. Connect `/rentals/camelot` to the bunkhouse pages, and add a `/bunkhouse` redirect.** *Effort S. Personas P3, P5, P6.*
Replace the stale "Bunkhouse project" section in [_pages/rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57) with two current sentences and a link to `/camelot`. Add `/bunkhouse  /camelot  301` (and `/bunkhouse/*`) to [_redirects](../../_redirects).
✅ *Done: the redirect in `8e67d88`, the rentals section in `7f487e6`. The rentals page's capacity, walking distance, and parking were corrected in `dbcaf5f` (R3).*

**R12. Make the homepage banner work for newcomers.** *Effort S. Persona P6, and everyone else.*
In [_includes/camelot_banner.html](../../_includes/camelot_banner.html), show a "Learn more" link next to the small Donate button in the collapsed footer (lines 51-55), so it's visible without expanding. Rewrite the opening (lines 13-19) to say what Camelot is before what it needs, for example: *"Camelot is MITOC's cabin in the White Mountains foothills, where many members take their first trip. We're building it a new bunkhouse."* Remove "As you may know." Make the copy match the overview's facts (see R3).
✅ *Done. The "Learn more" link and the new opening are in `7f487e6`. The remaining facts (distance, cost, schedule, "design now complete") were corrected in `dbcaf5f` (R3).*

**R14. Add headings and captions to the project page.** *Effort S. Personas P3, P4.*
In [_pages/camelot/project.md](../../_pages/camelot/project.md), add `##` headings (Location on the property · Layout · Toilets and water · Heating and insulation · Structure · Fire safety), give each drawing a short caption, and end with a link to the FAQs and a Donate link.
✅ *Done in `54d59f8`.*

### Content fixes (need a few facts from the committee)

**R3. Fix stale and contradictory facts.** *Effort S–M. Decision: confirm the correct values. All personas.*
Go through section 7 and settle one value for each item. Update the hero subtitle ("Site construction has started!" → for example "Phase 1 complete · Raising funds for Phase 2") and the "Coming 2027" headline, so the hero agrees with the FAQ timeline. Update the past-tense FAQ answers ("When will construction start?" and the trail work). Use one definition of "Phase 1" everywhere.
✅ *Done in `9a4e737` and `dbcaf5f`, using the committee's values. Key facts now live once, in `facts:` in `bunkhouse_settings.yml`, and every page reads them from there. A new FAQ question, "What are the phases of the project?", defines Phase 0, 1, and 2. The hero tagline is now "Phase 1 complete · Raising funds to build in 2027". The nightly fee is still undecided, so no number is shown.*

**R7. State the money picture plainly.** *Effort S to write. Decision: the figures and what the thermometer counts. Personas P1, P3, P4.*
Add a short "What Phase 2 will fund" section to the overview, plus matching FAQ answers:
- Phase 1 cost and how it was funded, ideally with thanks to Phase 1 donors.
- What the Phase 2 total covers, whether $1.3M is still current, and when it was last updated.
- How much is raised toward Phase 2, and the remaining gap.
- What happens if bids come in high, and what funding level lets construction start.

Then make the thermometer match. If it should show Phase 2 only, adjust `donations_amount`/`donations_goal` in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml). Consider showing "$832,000 to go" next to the goal (computed in Liquid from the two values).
✅ *Done in `7eeecd4` and `7987b1c`. The overview has a new section, "What the $1.3 million pays for". The FAQ cost answers are rewritten. The thermometer counts the whole campaign, including pledges (the committee's choice), and shows "$832,000 to go" and "As of November 2026". Still open, and in the round-2 questions: what happens if bids come in high or the goal is missed, and whether Phase 0 is inside the $1.3M.*

**R9. Change the online gift's default amount and add small-gift wording.** *Effort S. Decision: preset or not. Personas P2, P5.*
Remove `&amount=1000` from `donate_link` in [bunkhouse_settings.yml:1](../../_data/bunkhouse_settings.yml#L1), or set it to a lower value. Add a line near the thermometer such as *"314 people have given. Gifts of every size count."*
🟡 *The wording is done in `7eeecd4`: "Gifts of every size count" under the overview's thermometer, and in the funding section. The $1,000 preset is unchanged until the maintainer or committee decides (round-2 Q9).*

### Structural changes

**R5. Restructure the overview page around readers' questions.** *Effort M. Decision: which audience the page leads with. Recommended: donors with some MITOC background, with a short intro for newcomers. All personas.*
🔁 *Replaced by R17 (Home) and R18 (About the project) in Part 1, section G, after the web team asked for separate Home and Overview pages. The section list below is split between them; see section D.*

Proposed section order for [_pages/camelot/index.md](../../_pages/camelot/index.md). Each section has a heading, two to four sentences, and a link to more detail.

```
[Compact hero: title · one-line "what & why" · thermometer with "as of" date · Donate]

## What is Camelot?            photo of the real cabin, location, link to /rentals/camelot
## Why a new bunkhouse?        3 bullets: loft closed for safety · need safe space for 50 · protects Camelot for decades
## Latest update               date · title · one-line summary · photo · "All updates →" (R6)
## What Phase 2 will fund      cost, raised, remaining gap, schedule trigger (R7)
## Ways to give                online · employer match · check · stock/DAF/IRA · pledge · contact (R8)
## Get involved                volunteer, get updates by email (R13)
## Who's leading the project   names and roles, MIT partners, contact
```

The bunkhouse menu becomes: Overview · Updates · Project details · FAQs · Donate, plus a link back to the main MITOC site (R2).

Move the current history paragraphs off the overview. They become the first posts on the Updates page (R6).

**R6. Add an Updates page.** *Effort M to set up, then about an hour per post. Decision: who writes posts, and how often (open question 9). Needs Phase 1 photos. Personas P1, P3, P4, P5.*

🔁 *The web team has asked for this page (`/camelot/updates`). Part 1, section D3, updates this recommendation: the latest-post teaser goes on Home, not the overview. The owner and schedule are still needed first.*

A new `/camelot/updates` page with dated posts, newest first, like Kickstarter project updates. It gives repeat donors evidence of progress and gives fundraising emails something to link to. The email is what most alumni will actually read; the page is the permanent record behind it.

*Before building it, name an owner and a minimum schedule.* An updates page whose latest post is a year old suggests the project has stalled, which is worse than having no page. A workable minimum is one post per quarter, plus one at each milestone. A quiet-quarter post ("here's where fundraising stands") counts. If no one can commit to this, build a dated milestone list on the overview instead. It carries the same information about past progress and never looks out of date.

*Start with posts for past milestones,* so the page isn't empty on launch:
- 2018: founding gift in memory of Joris Naiman
- 2019–21: design with Maclay Architects
- fall 2022: fundraising launch
- June 2023: Groton planning board approval
- summer 2024: site work begins
- spring 2025: Phase 1 complete (bridge, parking lot, trail), with two to four photos

The first new post is then the Phase 2 kickoff. These posts replace the history paragraphs now on the overview (R5).

*Use the same structure for every post,* so posts are quick to write and readers know what to expect:
1. what happened
2. one or two photos
3. amount raised since the last post
4. what's next
5. one ask (donate, volunteer, or share)

*Show updates in three places:*
- the Updates page itself, added to the bunkhouse menu
- a "Latest update" teaser on the overview (date, title, one line, link)
- an "as of {date}" line under the thermometer, using the latest post's date or an `updated:` field in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml)

🟡 *Only the "as of" line is done (`7eeecd4`), from `donations_as_of` in the settings. The web team now owns the Updates page (Part 1, section H).*

*Implementation:*
- Use a Jekyll collection, for example `_camelot_updates/` with `output: true` in `_config.yml`, so each post gets its own URL that emails can link to.
- Each post is one Markdown file named like `2025-05-15-phase-1-complete.md`, with front matter for `title`, `date`, and an optional `image` and `summary`.
- The updates page and the overview teaser are each one Liquid loop over the collection, sorted by date.
- Adding a post means adding one file. Volunteers who don't work in the codebase can create the file in GitHub's web editor, or send the text and photos to the site maintainer.
- *Optional:* an RSS feed for alumni who use feed readers. GitHub Pages sites often include the `jekyll-feed` plugin, but check this site's Gemfile; if it's missing, a simple feed template works too.
- Pair it with the "Get updates by email" mailing list in R13, and announce each new post on that list.

**R8. Add "Ways to give".** *Effort M. Decision: which options MIT supports for this fund, recognition policy, and a contact for larger gifts. Personas P1, P2, P4.*
🔁 *Becomes R19 in Part 1: its own page at `/camelot/donate`, opened from the menu, while Donate buttons keep going straight to the form.*
This can be a section on the overview or its own `/camelot/give` page, linked from the nav. Cover:
- online giving
- **employer matching:** what the matching portal needs, the fund name and number (3892696), and MIT's details
- check (move it from the FAQ)
- stock, donor-advised funds, and IRA qualified charitable distributions, linked to MIT's own instructions
- multi-year pledges
- a **named person** for larger gifts
- recognition or naming opportunities, if any

Add FAQ entries for matching and non-cash gifts.

**R10. Use a compact hero on subpages and phones, and improve text contrast.** *Effort M. Personas P2, P5.*
Show the full hero only on the overview. Give the project and FAQ pages a short title bar with the thermometer and Donate in one row (in the layout, `{% if page.url == "/camelot/" %}` or a front-matter flag). On phones, cap the hero height so the first content appears in the first screen. Improve the contrast of "Site construction has started!" (the `h3` sits directly on the busy drawing; see [screenshot](screenshots/overview-mobile-fold.jpg)) by giving it the same light backing as the `h1` and `h2`.
✅ *Done in `2aba590`, moved up to Stage 1 because it needs no decisions. Pages set `hero: full` in their front matter to get the full hero. The hero text now lives in `bunkhouse_settings.yml` (`hero_title`, `hero_subtitle`, `hero_tagline`), so R3 can edit it there.*

**R11. Add a "What is Camelot?" introduction for newcomers.** *Effort S–M. Persona P6.*
🔁 *Goes on the new Home page (R17), with a longer version on About the project (R18).*
Use the existing photos in `/images/camelot/` (already used on `/rentals/camelot`). Add one sentence of location context ("about 2.5 hours from Boston, near Rumney climbing"), link to the rentals page, and say it's open to all members. Explain or drop "MITOCers".

**R13. Add a "Get involved" path.** *Effort S. Decision: what opportunities exist. Personas P3, P5.*
🔁 *Goes on About the project (R18, section D2).*
Add a short section with a signup link for work-day or volunteer interest, and a "Get updates by email" link to a mailing list that announces each new post on the Updates page (R6). A Google Form or mailing list is enough. Rewrite the "Will students be involved? Alums?" FAQ answer to point to it.

**R15. Revise the FAQ list.** *Effort M. All personas.*
Update or retire time-sensitive answers ("When will construction start?", "What about parking?"). Add:
- How do I get my employer to match my gift?
- What happens if costs rise or the goal isn't met?
- Where do groups sleep at Camelot now?
- How are donors recognized?
- How much is Camelot used?

Consider moving "Who is managing this project?" higher, or onto the overview (R5).
🟡 *Partly done in `dbcaf5f`: "When will construction start?", "How long will construction take?", the parking answer, and the cost answers are current. The new questions aren't added yet; they wait for round-2 answers and Stage 4.*

**R16. Add impact and usage numbers.** *Effort S once the data exists. Decision: what data the cabin managers can provide. Personas P1, P3, P4.*
For example: visitor-nights per year, number of MITOC trips and events based at Camelot, share of first-year students, and capacity before and after the loft closure. Even three numbers would make the case far stronger for the analytical personas.

### Suggested order of work

*This order has been superseded by the more detailed [implementation-plan.md](implementation-plan.md), and for the restructure by Part 1, section G.*

1. **This week (no decisions):** R1, R2, R4, R12, R14. ✅ *Done, plus R10.*
2. **After a short committee check-in to settle facts and policies:** R3, R7, R9, then R8 and R13. At the same check-in, name an owner for updates (open question 9). ✅ *R3 and R7 done; R9 partly. R8 and R13 wait for round-2 answers.*
3. **Updates page:** R6, once there's an owner. The past-milestone posts can be written as soon as Phase 1 photos are collected, without waiting for the restructure.
4. **Larger restructure:** R5 with R10, R11, R15, R16. Do this once the content from steps 2 and 3 exists, since the new overview mainly reorganizes that content and shows the latest update.

---

## 7. Content accuracy and upkeep

These need one agreed value. Check with the committee before changing them.

✅ *All settled by the committee on 2026-11-20 and corrected in `dbcaf5f`, except the nightly fee, which is still open (round-2 Q1). The FAQ now gives no fee amount. The "Out of date" items below are fixed too.*

| Topic | Says | Says elsewhere |
|---|---|---|
| Distance from cabin to bunkhouse | "a few hundred yards" ([index.md:6](../../_pages/camelot/index.md#L6)) | "about 100 meters" ([project.md:6](../../_pages/camelot/project.md#L6), [camelot_banner.html:24](../../_includes/camelot_banner.html#L24)) |
| When the project began | "in discussion for almost a decade", "kick-started in 2018" ([index.md:8](../../_pages/camelot/index.md#L8)) | "Since 2013" ([camelot_banner.html:17](../../_includes/camelot_banner.html#L17)) |
| Condition of the existing cabin | "nearing the end of its useful life" ([camelot_banner.html:16](../../_includes/camelot_banner.html#L16)) | "serviceable … for another 10-20 years" ([bunkhouse_faqs.yml:28](../../_data/bunkhouse_faqs.yml#L28)) |
| Definition of "Phase 1" | bridge, parking lot, trail ([index.md:10](../../_pages/camelot/index.md#L10)) | design work with Maclay ([bunkhouse_faqs.yml:52](../../_data/bunkhouse_faqs.yml#L52)) |
| What $1.3M covers | "$1.3 million total costs" for Phase 2 ([index.md:12](../../_pages/camelot/index.md#L12)) | excludes parking lot and trail ([bunkhouse_faqs.yml:49-54](../../_data/bunkhouse_faqs.yml#L49-L54)) |
| Completion date | "Coming 2027" ([bunkhouse.html:7](../../_layouts/bunkhouse.html#L7)) | "breaking ground in 2027" ([index.md:12](../../_pages/camelot/index.md#L12)); a 6-month build with a winter pause ([bunkhouse_faqs.yml:85](../../_data/bunkhouse_faqs.yml#L85)) |
| Nightly fee | "$20 per person per night in accordance with MITOC's current practices" ([bunkhouse_faqs.yml:58](../../_data/bunkhouse_faqs.yml#L58)) | "$10.00 per person per night" ([rentals/camelot.md:43](../../_pages/rentals/camelot.md#L43)) |
| Current cabin capacity | loft closed, can't safely sleep a large group ([bunkhouse_faqs.yml:20, 32](../../_data/bunkhouse_faqs.yml#L20)) | "can accommodate groups of 40 or more" ([rentals/camelot.md:11](../../_pages/rentals/camelot.md#L11)) |
| Walk from parking | "about 200 meters" ([bunkhouse_faqs.yml:112](../../_data/bunkhouse_faqs.yml#L112)) | "about 1000 feet" (≈300 m) ([rentals/camelot.md:11](../../_pages/rentals/camelot.md#L11)) |
| Parking | new off-street lot built ([bunkhouse_faqs.yml:108](../../_data/bunkhouse_faqs.yml#L108)) | "a dirt pull-off at the side of the road" ([rentals/camelot.md:29](../../_pages/rentals/camelot.md#L29)) |

**Out of date**
- Hero subtitle "Site construction has started!" ([bunkhouse.html:8](../../_layouts/bunkhouse.html#L8)).
- The trail work is described as future volunteer work ([bunkhouse_faqs.yml:54](../../_data/bunkhouse_faqs.yml#L54)), but it's finished.
- The homepage banner says "With the design now complete, we are actively seeking donations" ([camelot_banner.html:31](../../_includes/camelot_banner.html#L31)), which reads like 2022.
- The entire "Bunkhouse project" section on `/rentals/camelot` ([rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57)).

**Display bug** (✅ fixed in `8e67d88` with `<br>`)
- The check-mailing address in the FAQ ([bunkhouse_faqs.yml:70-72](../../_data/bunkhouse_faqs.yml#L70-L72)) appears on the website as one run-on line ("Massachusetts Institute of Technology P. O. Box 412926 Boston, MA…"). Kramdown merges the three `>` lines into a single paragraph. Ending each line with two spaces, or with `<br>`, keeps the line breaks.

**Upkeep risks**
- The thermometer figures are updated by hand in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml) and show no date. Add an `updated:` field and display it (R6). Updating the figures can be part of writing each post.
- An Updates page (R6) only helps while it's kept current. Agree on an owner and a minimum schedule before launch. Consider adding a reminder to whoever owns the page, for example a recurring calendar entry every quarter.
- The project facts are written separately in four places (overview, FAQ, homepage banner, rentals page), which is how they drifted apart. Consider keeping key facts in `bunkhouse_settings.yml` (total cost, current phase, target dates, nightly fee) and inserting them everywhere they appear.
- There's a commented-out "History" page in the menu ([bunkhouse_settings.yml:8-9](../../_data/bunkhouse_settings.yml#L8-L9)). The Updates page (R6) replaces it, so delete the commented-out entry when adding "Updates" to the menu.

---

## 8. Open questions for MITOC

*Updated 2026-11-20. The committee's round-1 answers (saved as `bunkhouse-content-review-2026-11-20-committee.docx`) and the web team's decisions (Part 1, section H) settled most of these. What's still open is in the round-2 [bunkhouse-content-review.docx](bunkhouse-content-review.docx), whose questions are numbered differently; the "Round 2" column gives that number. [implementation-plan.md](implementation-plan.md) says which batch each answer unblocks.*

✅ answered · 🟡 partly answered · ❓ open

| # | Question | Status | Answer, or what's still open | Round 2 |
|---|---|---|---|---|
| 1 | **Money:** does the $468K raised include funds spent on Phase 1? What's the current Phase 2 budget, and has the $1.3M estimate been updated since 2022? | 🟡 | **Answered (committee):** $468K counts the whole campaign, Phases 1 and 2, including pledges. The $1.3M total was re-estimated in 2026 from general contractors' quotes on the finished construction drawings: about $300K for Phase 1 and about $1M for Phase 2. **Still open:** whether Phase 0 (the 2019–21 design work) is inside the $1.3M, and whether Phase 1's $300K was the amount raised or its final cost. | Q2, Q4 |
| 2 | **Schedule:** what funding level, and by what date, lets construction start? Is "Coming 2027" the completion target or the start? | 🟡 | **Answered (committee):** construction starts only once the full $1.3M is raised. Groundbreaking is planned for late spring 2027 and completion for fall 2027, in one building season, so "Coming 2027" is the completion date. **Still open:** what happens if the full amount isn't raised by spring 2027 (does construction move to 2028?), or if bids come in above the estimate. | Q3 |
| 3 | **Thermometer:** should it show Phase 2 only, or the whole campaign? | ✅ | **Committee:** the whole campaign, including pledges. **Web team:** label it "raised by" everywhere. | — |
| 4 | **Giving options:** which non-cash and pledge options does MIT support for fund 3892696? Who's the named contact for larger gifts? Is there any donor recognition or naming policy? | 🟡 | **Answered (committee):** the contact is mitoc-bunkhouse@mit.edu, with no named person. **Still open:** stock, donor-advised funds, IRA distributions, multi-year pledges, a named contact for larger gifts, and recognition or naming. | Q5 |
| 5 | **Matching:** what should employer-matching donors enter (recipient, designation)? Can MIT provide a link for this? | ❓ | Not answered yet. | Q6 |
| 6 | **Current capacity and fee:** how many can sleep at Camelot now, and is the planned bunkhouse fee $10 or $20 per night? | 🟡 | **Answered (committee):** the cabin sleeps about 30 now, across the loft, living room, and kitchen. The loft is open again after a major repair. **Still open:** the bunkhouse's nightly fee. The FAQ says "modest user fees" with no number until then. | Q1 |
| 7 | **Photos and data:** are there photos of the finished Phase 1 work, and usage figures from the cabin managers? | ❓ | Not answered yet. **Now the most urgent question:** Phase 1 photos are needed for both the Updates posts and the Home page. | Q7 |
| 8 | **Volunteering:** what in-person or skills-based help is the project actually looking for? | ❓ | Not answered yet. | Q8 |
| 9 | **Ownership:** who will write posts for the Updates page and keep the thermometer current? What's the minimum schedule? Who sends the matching email announcement? | 🟡 | **Answered (web team):** the web team owns Updates, posts a few times a year, and will backfill posts from about the last two years. The plan makes updating the thermometer part of writing each post. **Not yet settled:** who sends an email announcement for each post, and whether there will be an updates mailing list (that depends on Q8 and R13). | Removed (answered) |

**Added in round 2** (not in the original list):

| Question | Status | Round 2 |
|---|---|---|
| **Gift amount:** the online form opens with $1,000 filled in. Keep it, lower it, or leave it blank? (R9) | ❓ Open. The maintainer could also decide this. | Q9 |
| **Rentals parking** (for the cabin managers): are the rest of the parking instructions on `/rentals/camelot` still right with the new gravel lot? | ❓ Open | Q10 |

**Settled in round 1 but not asked here:** every row of section 7 (distances, history, cabin condition, what $1.3M covers, capacity, parking), and the definition of the project's phases. See "What the committee settled" in the implementation plan's appendix.
