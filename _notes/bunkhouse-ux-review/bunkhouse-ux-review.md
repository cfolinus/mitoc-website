# Camelot bunkhouse pages: UX review by audience

*Reviewed 2026-11-19 on branch `bunkhouse-edits` (commit `cd2bad8`). Pages were rendered locally with `jekyll serve` and checked in Chrome at desktop (1280 px) and phone (390 px, iPhone-sized) widths.*

This folder starts with an underscore, so Jekyll does not publish it. Screenshots are in [screenshots/](screenshots/).

**Content review document:** [bunkhouse-content-review.docx](bunkhouse-content-review.docx) contains all the bunkhouse wording, the key facts table, and the open questions, for committee members to edit in Google Docs or Word. [bunkhouse-content-map.json](bunkhouse-content-map.json) maps each `[label]` in the document to its source file, so edits can be applied back to the site. To regenerate both after the site changes, run `npm install` (first time only) and then `npm run build` in [tools/](tools/). This needs Node and Ruby.

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

**R2. Add a way back to the main site from bunkhouse pages.** *Effort S. Persona P6.*
Either drop `hide_root=true` in [bunkhouse_base.html:18](../../_layouts/bunkhouse_base.html#L18) so the "MIT Outing Club" brand link appears, or add a "← MITOC home" item to the menu in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml). While editing the menu, rename "Camelot Bunkhouse" to "Overview".

**R4. Connect `/rentals/camelot` to the bunkhouse pages, and add a `/bunkhouse` redirect.** *Effort S. Personas P3, P5, P6.*
Replace the stale "Bunkhouse project" section in [_pages/rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57) with two current sentences and a link to `/camelot`. Add `/bunkhouse  /camelot  301` (and `/bunkhouse/*`) to [_redirects](../../_redirects).

**R12. Make the homepage banner work for newcomers.** *Effort S. Persona P6, and everyone else.*
In [_includes/camelot_banner.html](../../_includes/camelot_banner.html), show a "Learn more" link next to the small Donate button in the collapsed footer (lines 51-55), so it's visible without expanding. Rewrite the opening (lines 13-19) to say what Camelot is before what it needs, for example: *"Camelot is MITOC's cabin in the White Mountains foothills, where many members take their first trip. We're building it a new bunkhouse."* Remove "As you may know." Make the copy match the overview's facts (see R3).

**R14. Add headings and captions to the project page.** *Effort S. Personas P3, P4.*
In [_pages/camelot/project.md](../../_pages/camelot/project.md), add `##` headings (Location on the property · Layout · Toilets and water · Heating and insulation · Structure · Fire safety), give each drawing a short caption, and end with a link to the FAQs and a Donate link.

### Content fixes (need a few facts from the committee)

**R3. Fix stale and contradictory facts.** *Effort S–M. Decision: confirm the correct values. All personas.*
Go through section 7 and settle one value for each item. Update the hero subtitle ("Site construction has started!" → for example "Phase 1 complete · Raising funds for Phase 2") and the "Coming 2027" headline, so the hero agrees with the FAQ timeline. Update the past-tense FAQ answers ("When will construction start?" and the trail work). Use one definition of "Phase 1" everywhere.

**R7. State the money picture plainly.** *Effort S to write. Decision: the figures and what the thermometer counts. Personas P1, P3, P4.*
Add a short "What Phase 2 will fund" section to the overview, plus matching FAQ answers:
- Phase 1 cost and how it was funded, ideally with thanks to Phase 1 donors.
- What the Phase 2 total covers, whether $1.3M is still current, and when it was last updated.
- How much is raised toward Phase 2, and the remaining gap.
- What happens if bids come in high, and what funding level lets construction start.

Then make the thermometer match. If it should show Phase 2 only, adjust `donations_amount`/`donations_goal` in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml). Consider showing "$832,000 to go" next to the goal (computed in Liquid from the two values).

**R9. Change the online gift's default amount and add small-gift wording.** *Effort S. Decision: preset or not. Personas P2, P5.*
Remove `&amount=1000` from `donate_link` in [bunkhouse_settings.yml:1](../../_data/bunkhouse_settings.yml#L1), or set it to a lower value. Add a line near the thermometer such as *"314 people have given. Gifts of every size count."*

### Structural changes

**R5. Restructure the overview page around readers' questions.** *Effort M. Decision: which audience the page leads with. Recommended: donors with some MITOC background, with a short intro for newcomers. All personas.*
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

*Implementation:*
- Use a Jekyll collection, for example `_camelot_updates/` with `output: true` in `_config.yml`, so each post gets its own URL that emails can link to.
- Each post is one Markdown file named like `2025-05-15-phase-1-complete.md`, with front matter for `title`, `date`, and an optional `image` and `summary`.
- The updates page and the overview teaser are each one Liquid loop over the collection, sorted by date.
- Adding a post means adding one file. Volunteers who don't work in the codebase can create the file in GitHub's web editor, or send the text and photos to the site maintainer.
- *Optional:* an RSS feed for alumni who use feed readers. GitHub Pages sites often include the `jekyll-feed` plugin, but check this site's Gemfile; if it's missing, a simple feed template works too.
- Pair it with the "Get updates by email" mailing list in R13, and announce each new post on that list.

**R8. Add "Ways to give".** *Effort M. Decision: which options MIT supports for this fund, recognition policy, and a contact for larger gifts. Personas P1, P2, P4.*
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

**R11. Add a "What is Camelot?" introduction for newcomers.** *Effort S–M. Persona P6.*
Use the existing photos in `/images/camelot/` (already used on `/rentals/camelot`). Add one sentence of location context ("about 2.5 hours from Boston, near Rumney climbing"), link to the rentals page, and say it's open to all members. Explain or drop "MITOCers".

**R13. Add a "Get involved" path.** *Effort S. Decision: what opportunities exist. Personas P3, P5.*
Add a short section with a signup link for work-day or volunteer interest, and a "Get updates by email" link to a mailing list that announces each new post on the Updates page (R6). A Google Form or mailing list is enough. Rewrite the "Will students be involved? Alums?" FAQ answer to point to it.

**R15. Revise the FAQ list.** *Effort M. All personas.*
Update or retire time-sensitive answers ("When will construction start?", "What about parking?"). Add:
- How do I get my employer to match my gift?
- What happens if costs rise or the goal isn't met?
- Where do groups sleep at Camelot now?
- How are donors recognized?
- How much is Camelot used?

Consider moving "Who is managing this project?" higher, or onto the overview (R5).

**R16. Add impact and usage numbers.** *Effort S once the data exists. Decision: what data the cabin managers can provide. Personas P1, P3, P4.*
For example: visitor-nights per year, number of MITOC trips and events based at Camelot, share of first-year students, and capacity before and after the loft closure. Even three numbers would make the case far stronger for the analytical personas.

### Suggested order of work

1. **This week (no decisions):** R1, R2, R4, R12, R14.
2. **After a short committee check-in to settle facts and policies:** R3, R7, R9, then R8 and R13. At the same check-in, name an owner for updates (open question 9).
3. **Updates page:** R6, once there's an owner. The past-milestone posts can be written as soon as Phase 1 photos are collected, without waiting for the restructure.
4. **Larger restructure:** R5 with R10, R11, R15, R16. Do this once the content from steps 2 and 3 exists, since the new overview mainly reorganizes that content and shows the latest update.

---

## 7. Content accuracy and upkeep

These need one agreed value. Check with the committee before changing them.

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

**Display bug**
- The check-mailing address in the FAQ ([bunkhouse_faqs.yml:70-72](../../_data/bunkhouse_faqs.yml#L70-L72)) appears on the website as one run-on line ("Massachusetts Institute of Technology P. O. Box 412926 Boston, MA…"). Kramdown merges the three `>` lines into a single paragraph. Ending each line with two spaces, or with `<br>`, keeps the line breaks.

**Upkeep risks**
- The thermometer figures are updated by hand in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml) and show no date. Add an `updated:` field and display it (R6). Updating the figures can be part of writing each post.
- An Updates page (R6) only helps while it's kept current. Agree on an owner and a minimum schedule before launch. Consider adding a reminder to whoever owns the page, for example a recurring calendar entry every quarter.
- The project facts are written separately in four places (overview, FAQ, homepage banner, rentals page), which is how they drifted apart. Consider keeping key facts in `bunkhouse_settings.yml` (total cost, current phase, target dates, nightly fee) and inserting them everywhere they appear.
- There's a commented-out "History" page in the menu ([bunkhouse_settings.yml:8-9](../../_data/bunkhouse_settings.yml#L8-L9)). The Updates page (R6) replaces it, so delete the commented-out entry when adding "Updates" to the menu.

---

## 8. Open questions for MITOC

1. **Money:** does the $468K raised include funds spent on Phase 1? What's the current Phase 2 budget, and has the $1.3M estimate been updated since 2022?
2. **Schedule:** what funding level, and by what date, lets construction start? Is "Coming 2027" the completion target or the start?
3. **Thermometer:** should it show Phase 2 only, or the whole campaign?
4. **Giving options:** which non-cash and pledge options does MIT support for fund 3892696? Who's the named contact for larger gifts? Is there any donor recognition or naming policy?
5. **Matching:** what should employer-matching donors enter (recipient, designation)? Can MIT provide a link for this?
6. **Current capacity and fee:** how many can sleep at Camelot now, and is the planned bunkhouse fee $10 or $20 per night?
7. **Photos and data:** are there photos of the finished Phase 1 work, and usage figures from the cabin managers?
8. **Volunteering:** what in-person or skills-based help is the project actually looking for?
9. **Ownership:** who will write posts for the Updates page and keep the thermometer current? What's the minimum schedule (for example, quarterly plus each milestone)? Who sends the matching email announcement?
