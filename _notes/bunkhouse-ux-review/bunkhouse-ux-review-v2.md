# Camelot bunkhouse pages: UX review, v2 (follow-up)

*Review date 2026-11-22, on branch `bunkhouse-edits` at commit `ea58f41` (Stages 1–4, 6a and 6e built; the branch is pushed, 52 commits ahead of `main`, with no PR open). I checked the source and a local `jekyll build` in Chrome at 1280 px and about 500 px wide. Screenshots from this review are in [screenshots/](screenshots/) and start with `r3-`.*

This follows [bunkhouse-ux-review.md](bunkhouse-ux-review.md) (v1: first review 2026-11-19, second review 2026-11-20). R-numbers, persona names (P1–P6), and section letters refer to that document. [implementation-plan.md](implementation-plan.md) still tracks the work. This document checks how well the built site answers v1, and lists what's left.

---

## 1. Summary

**The section now does what v1 asked for, in almost every place that didn't need photos.** The six-page structure is built, and each page has a clear job. Home is a short pitch ([desktop](screenshots/r3-home-desktop.jpg), [phone](screenshots/r3-home-phone.jpg)), about 2½ screens long on a phone. About tells the full story under headings. Donate opens with "Give online" above the fold on a phone, then covers matching, check, stock/DAF/IRA, and named contacts ([phone](screenshots/r3-donate-phone.jpg)). Every fact is stored once. Every page has its own title, tab title, highlighted menu item, and share tags. The committee has answered all of round 2.

**What's still missing is evidence of progress.** There's no Updates page, and the section has no photos of the real cabin or the Phase 1 work. Every image is still an architect's drawing. That leaves repeat donors (P1, P5) without the strongest reason v1 found for giving again: seeing what their last gift built. It is now the largest gap by a wide margin.

**The second risk is the schedule, and the committee has chosen not to address it on the site.** The hero says "Coming 2027". Construction needs the full $1.3M by late spring 2027, and $832,000 is still to go. Phase 1 raised about $400,000 over three years. That leaves roughly $68,000 raised so far toward Phase 2, which a careful reader can work out from the About page. Respecting the committee's decision (round-2 Q3), the site shouldn't speculate. But the web team should agree on a date to decide whether the 2027 dates still hold (F5).

**Scorecard**

| | v1, 2026-11-19 | v1 second review, 2026-11-20 | Now |
|---|---|---|---|
| R1–R21 done | 0 of 21 | 8 | **15 done, 3 partly, 2 dropped by decision, 1 not started** (R6, Updates) |
| Open problems in v1 section B (13) | — | 13 | **9 fixed, 2 closed by decision, 2 open** |
| Personas served "fair" or better | 3 of 6 | 5 of 6 | **6 of 6**. P2 and P6 are now good. |
| Tasks answered on their intended page (v1 section E) | 1 of 10 | 2 of 10 | **7 of 10** |

**The five most useful follow-ups**

| # | Follow-up | Why | Effort |
|---|---|---|---|
| F1 | **Open a PR and get a deploy preview** for the web team. Test the share previews there. | The branch is pushed but 52 commits ahead of `main`, with no PR. None of this helps a donor until it ships, and the share tags (R21) can't be tested until then. | S |
| F2 | **Get one good photo of the cabin now**, separately from the Phase 1 photos, and put it on Home and About. | The four files in `images/camelot/` are 160×120 px thumbnails. A real photo is the cheapest fix for "every image is a drawing". | S, once someone sends a photo |
| F3 | **Build the Updates setup (Stage 5a) now**, with the menu item hidden, so posts can go up the day the photos arrive. | It's the only stage that needs no input, and it's the one blocking the biggest gap. | M |
| F4 | **Write the backfill posts (5b) as soon as Phase 1 photos arrive**, and set the recurring reminder (5c). | Repeat donors need to see their gift at work. | M, web team |
| F5 | **Pick a decision date for the 2027 schedule** (for example 1 March 2027). If the goal looks out of reach, change `hero_subtitle`, `groundbreaking`, and `completion` that day, and post about it. | "Coming 2027" becomes a credibility problem the moment it's clearly wrong. It's a one-line change, but someone has to own the call. | S, web team and committee |

Section 6 has the full list, including about ten small copy fixes.

---

## 2. Recommendation status (R1–R21)

✅ done · 🟡 partly done · ⛔ dropped by a committee or maintainer decision · ❌ not started

| R | Recommendation | Status | Notes |
|---|---|---|---|
| R1 | Fix the dead phone Donate button | ✅ | |
| R2 | Link back to the main site | ✅ | Footer "© 2026 MITOC" on every page. The near-the-top "MITOC home" link from R20 was declined by the maintainer. |
| R3 | Fix stale and contradictory facts | ✅ | All facts live in `facts:`. I found one new inconsistency (N3, below). |
| R4 | Connect `/rentals/camelot`; add `/bunkhouse` redirect | ✅ | |
| R5 | Restructure the overview | ⛔ | Replaced by R17 and R18, as planned. |
| R6 | Updates page | ❌ | Only the "As of November 2026" line exists. Home's Latest update slot is built and hidden. Blocked on Phase 1 photos for 5b, but 5a could be built now (F3). |
| R7 | State the money plainly | ✅ | About's "Costs" section, FAQ cost answers, thermometer with "to go". What happens if the goal is missed is left out at the committee's request (Q3). |
| R8 | Ways to give | ✅ | Became R19. |
| R9 | Gift preset and small-gift wording | ✅ | Preset lowered to $500 (Q9). "Gifts of every size count" on the hero, Donate, and About. |
| R10 | Compact hero; phone hero height | ✅ | Compact strip is now a solid green band. |
| R11 | "What is Camelot?" for newcomers | 🟡 | The text and the rentals link are on Home and About. No photo (F2). |
| R12 | Homepage banner for newcomers | ✅ | Its last paragraph still says "MITOCers" (N8). |
| R13 | Get involved | ⛔ | The committee asked to avoid volunteering text (Q8). |
| R14 | Project page headings and captions | ✅ | Also gained a jump list. |
| R15 | Revise the FAQ | 🟡 | Time-sensitive answers are current. Fee and usage are in cost-3. Matching and non-cash gifts are on the Donate page instead. Missed-goal and recognition questions were dropped (no policy to state). "Will students be involved?" is unchanged (see N15). |
| R16 | Usage numbers | 🟡 | One figure (about 1,000 person-nights a year), only in FAQ cost-3. Not in About's case for the bunkhouse. |
| R17 | Home as a one-screen pitch | 🟡 | Built and short. Missing: a real photo, and a matching line in "Donate" (N11). The Latest update slot waits on Updates. |
| R18 | About as the full story | ✅ | Headed sections, timeline, `#funding`, `#leaders`. Two small structure issues (N7). |
| R19 | Donate page | ✅ | Full version, after round-2 Q5 and Q6. |
| R20 | Page identity | ✅ | Titles, tab titles, `h1`, active menu item. Near-top main-site link declined. |
| R21 | Share previews | 🟡 | Tags are built and correct in the HTML. **Not tested** in a real link preview, which needs a deploy (F1). |

---

## 3. v1's open problems (v1 section B), now

| Severity in v1 | Problem | Now |
|---|---|---|
| Major | "Why now" only in the FAQ | ✅ On Home ("will not remain safe to sleep in for much longer") and in About's "Camelot today". |
| Major | Overview was four unheaded paragraphs in date order | ✅ Home is headed and short. History is a timeline list on About. |
| Major | No photos of the real cabin or Phase 1 | ❌ **Still open.** F2, F4. |
| Major | No progress over time | ❌ **Still open.** F3, F4. |
| Major | No matching, stock/DAF/IRA, pledge, or larger-gift information | ✅ Donate page, with MIT's matching lookup, MIT's ways-to-give page, and two named contacts. |
| Major | Schedule credibility: what if the goal is missed? | ⛔ Committee decided not to address it (Q3). Residual risk; see F5. |
| Minor | Same tab title everywhere; no current-page highlight; no project page heading | ✅ |
| Minor | Groundbreaking condition stated twice; "2027" twice in the hero | ✅ Tagline is now "Phase 1 complete · Phase 2 fundraising now". |
| Minor | "As of" line hard to read over the drawing | ✅ The thermometer box is 85% opaque ([desktop](screenshots/r3-home-desktop.jpg)). |
| Minor | Main-site link only in the footer | ⛔ The maintainer declined a navbar link. The footer is acceptable now that Home is short. |
| Minor | Is Phase 0 inside the $1.3M? | ✅ No; said in FAQ cost-2 and the phases answer. |
| Minor | "Will students be involved?" is vague | ⛔ Left as is by the committee (see N15). |
| Minor | "Raised by" vs "given or pledged" | ✅ "Raised by" everywhere. |

---

## 4. Personas, now

| Persona | v1 second review | Now | What's still missing for them |
|---|---|---|---|
| P1: Phase 1 major donor | Fair | **Fair to good.** Costs are clear, Phase 1 donors are thanked, and there's a larger-gift path with named people. | Photos of what Phase 1 built, any update since 2025, and who Lucas Ehinger is (N4). |
| P2: Engineer with matching | Fair | **Good.** Home makes the case in under a minute. Matching is the first section after "Give online". The preset is $500. | Home doesn't mention matching (N11), so they find it only on the Donate page. |
| P3: Former Camelot manager | Fair | **Fair to good.** Facts agree, the fee and a usage figure are stated, and the cost-per-night reasoning is laid out. | That reasoning says "$1 million" while the site says about $900,000 (N3). No volunteering path, by decision. |
| P4: Former trip leader, project leader | Fair | **Fair.** Timeline, phases, and team are clear, and the funding condition is stated plainly. | Any acknowledgement of schedule risk with $832K to go and about six months left (F5). |
| P5: Current member, small donor | Fair | **Fair.** Small gifts are clearly welcome. | Still nothing new to see between visits (F3, F4). |
| P6: New member | Fair to poor | **Good.** Home opens with what Camelot is and links to the visiting page. The banner explains Camelot before asking for money. | A photo of the real place (F2), and "MITOCers" in the banner (N8). |

**Which page answers each task** (the v1 section E table, now)

| Task | Intended page | Now |
|---|---|---|
| Understand what Camelot is | Home; About | ✅ (no photo) |
| Understand why a bunkhouse is needed now | Home; About | ✅ |
| See progress so far | Updates; Home teaser; About timeline | 🟡 About's timeline only |
| Know how much is still needed | Hero; About `#funding` | ✅ |
| Trust the schedule and budget | About; FAQ | 🟡 Budget yes; schedule risk unaddressed |
| Give online | Every Donate button | ✅ One extra click, through the Donate page, as decided |
| Get a gift matched | Donate | ✅ |
| Give stock, IRA, a pledge, or a large gift | Donate | ✅ |
| Volunteer or contribute expertise | About | ⛔ Dropped by the committee |
| Visit Camelot, or get back to the main site | Home; footer | ✅ |

---

## 5. New findings from this review

These weren't in v1, or have appeared since. Severity uses v1's scale. "Committee" marks items whose wording came from the committee, so changes should go back to them.

| # | Severity | Finding | Where | Suggested fix |
|---|---|---|---|---|
| N1 | Major | No real photos anywhere, and the only cabin photos in the repo are 160×120 px. | Whole section; `images/camelot/` | F2. Ask the cabin managers for one high-resolution cabin photo now, without waiting for the Phase 1 set. |
| N2 | Major | Schedule risk, as in the summary. The site can't say what happens if the goal is missed, but it will look wrong once 2027 is clearly out of reach. | Hero `hero_subtitle`; facts `groundbreaking`, `completion` | F5. An internal decision date and owner. No site change now. |
| N3 | Minor | FAQ cost-3 says "a $1 million bunkhouse works out to about $10 per person per night", but `phase2_cost` is about $900,000. P3 will notice. (Committee) | [_data/bunkhouse_faqs.yml](../../_data/bunkhouse_faqs.yml), "How will the bunkhouse be funded?" | Use `%phase2_cost%`: "an approximately $900,000 bunkhouse works out to about $9 per person per night". Or say "roughly $1 million" on purpose. Check with the committee. |
| N4 | Minor | The Donate page names Lucas Ehinger as a contact, but he isn't mentioned anywhere else (About's team section names only David Lawrence and Greg Wallace, at the maintainer's request). A major donor will want to know who they're writing to. | [donate.md](../../_pages/camelot/donate.md), "Stock, donor-advised funds…" | Add a short role after each name on the Donate page, from the committee. |
| N5 | Minor | "Roughly 15 percent of MIT alumni work for companies that match charitable gifts" has no source on the page. (Committee, `b3e541f`) | [donate.md](../../_pages/camelot/donate.md), matching section | Confirm it comes from MIT's matching-gifts page. If not, drop the number. |
| N6 | Minor | On the Donate page at phone width, two identical "Give online" buttons appear within one screen: the compact strip's and the page's own ([phone](screenshots/r3-donate-phone.jpg)). Harmless, but it looks unplanned. | [bunkhouse.html](../../_layouts/bunkhouse.html), `on_donate_page` branch | Hide the strip's button on the Donate page, or leave it. Low priority. |
| N7 | Minor | About's "The plan" is now one sentence about the 2019–21 design, placed after "The bunkhouse vision" and repeated by the timeline. About also has no opening line saying it's the full story (v1 C3, item 1). | [about.md](../../_pages/camelot/about.md) | Fold "The plan" into the vision section or drop it. Consider a one-line intro under the title. |
| N8 | Minor | "MITOCers" is still used in About's team section and in the homepage banner's last paragraph, which newcomers see on every main-site page. About's team paragraph also has an agreement error ("an eager committee … are spearheading"). | [about.md](../../_pages/camelot/about.md) `#leaders`; [camelot_banner.html](../../_includes/camelot_banner.html) | "MITOC members". "An eager committee of current MITOC members is leading…" |
| N9 | Minor | Home's "Where things stand" lists every kind of engineer that supported Phase 1. That's About-level detail on the page meant to be a quick pitch. | [index.md](../../_pages/camelot/index.md) | Trim to "a new bridge, parking lot, and access trail, plus the final construction drawings". The full list is already in About's Costs section. |
| N10 | Minor | The usage figure (about 1,000 person-nights a year, half from circuses) is the strongest number for analytical readers, and it only appears inside a cost answer in the FAQ. | FAQ cost-3 | Add it to About's "Camelot today" or the vision section. |
| N11 | Minor | Home's "Donate" section doesn't mention matching. v1 D1 suggested "Many employers match gifts". | [index.md](../../_pages/camelot/index.md) | One sentence linking to the matching section on the Donate page (give it an id such as `#matching`). |
| N12 | Minor | About's timeline has "2023: The Groton planning board approves the project". The maintainer added this from the old page text in Stage 4, and it was flagged as not committee-confirmed. | [about.md](../../_pages/camelot/about.md), Timeline | Confirm the committee saw it in the round-2 doc. If not, ask. |
| N13 | Minor | The tax-deductibility answer talks only about giving online. Check and stock donors get receipts too. | [donate.md](../../_pages/camelot/donate.md) | "Yes. MIT will send you a statement documenting your tax-deductible gift." |
| N14 | Minor | The phone-only Donate button at the bottom of subpages is still the original large size. The maintainer hasn't decided whether to shrink it (handoff notes). | [bunkhouse.html](../../_layouts/bunkhouse.html) | Maintainer's call. |
| N15 | Note | FAQ "Will students be involved in construction? Alums?" still says "where possible, we plan to involve MITOC members", with no way to say you're interested. The committee left it as is and asked to avoid volunteering text. | FAQ timeline group | Leave as decided. If it draws emails, a closing "Interested? Email mitoc-bunkhouse@mit.edu" is the smallest fix. |
| N16 | Note | FAQ why-2 and why-5 repeat About's loft and code paragraph nearly word for word. That's two copies to keep in step (v1 section F). | FAQ; About "Camelot today" | Acceptable for now. If either changes, change both, or move the paragraph into `summary:`. |
| N17 | Outside scope | Typos on `/rentals/camelot` that predate this work: "thororughly", "though the trees", "only if has been boiled", "for the everything". It also writes "2.5 hour drive" instead of using the `drive_time` fact. | [rentals/camelot.md](../../_pages/rentals/camelot.md) | A separate small commit, if the cabin managers don't mind. |
| N18 | Outside scope | The Project details page still has no one-sentence intro saying the design is final (v1 D4, optional). | [project.md](../../_pages/camelot/project.md) | Optional. |

**Checked and fine:** Home is about 2½ phone screens. The "As of" line is readable. The active menu item is highlighted. `--` in the FAQ phases list renders as an en dash. Share tags are present on every page. Redirects for `/bunkhouse`, `/camelot/give`, and `/camelot/overview` are in `_redirects`. Old FAQ anchors keep working through `old_ids`.

---

## 6. Follow-up list

In suggested order. "Who" says who has to act; "maintainer" means the site maintainer, with Claude Code if useful.

### Now (no new input needed)

| # | Item | Who | Effort |
|---|---|---|---|
| F1 | Open a PR from `bunkhouse-edits` (already pushed), so the web team reviews a Netlify deploy preview. Paste the preview URLs for Home, About, and Donate into Slack or a link-preview checker to test R21. Run `html-proofer` on the build. | Maintainer | S |
| F3 | Stage 5a: the `camelot_updates` collection, post layout, and `/camelot/updates` index, with the menu item left out until the first post exists (implementation plan, 5a). Add the short "how to add a post" note from 5c at the same time. | Maintainer | M |
| F6 | Copy fixes that don't change meaning: N8 ("MITOCers", grammar), N9 (trim Home's Phase 1 sentence), N7 (fold "The plan"; optional intro line), N11 (matching line on Home), N13 (tax-deductibility wording). Regenerate the content-review doc after. | Maintainer | S |

### Needs a quick answer from the committee

| # | Item | Effort |
|---|---|---|
| F7 | N3: "$1 million" vs about $900,000 in FAQ cost-3. | S |
| F8 | N4: a role for each named Donate contact. | S |
| F9 | N5: the source for "roughly 15 percent". | S |
| F10 | N12: confirm the June 2023 planning board approval. | S |

These four can go in one short email; a full content-review round isn't needed.

### Needs photos

| # | Item | Who | Effort |
|---|---|---|---|
| F2 | One high-resolution photo of the cabin, for Home ("What is Camelot") and About ("Camelot today"). Ask the cabin managers directly; it doesn't need to wait for the Phase 1 set. | Cabin managers, then maintainer | S |
| F4 | Phase 1 photos (bridge, parking lot, trail), then the 5b backfill posts and a Phase 1 photo in Home's "Where things stand". Set the 5c reminder every 3–4 months, with updating the thermometer as part of each post. | Committee, then web team | M |

### Decisions to schedule

| # | Item | Who |
|---|---|---|
| F5 | A decision date (suggested: 1 March 2027) for whether late spring 2027 groundbreaking still holds. If not: change `hero_subtitle`, `groundbreaking`, and `completion` the same day, and write an Updates post. Until then, refresh `donations_amount`, `number_donors`, and `donations_as_of` at least monthly, so the "to go" figure visibly moves. | Web team with the committee |
| F11 | N14: shrink the phone-only bottom Donate button, or leave it. N6: hide the duplicate "Give online" on the Donate page, or leave it. | Maintainer |

### Optional

- N10: put the usage figure on About.
- N16: deduplicate the loft and code paragraph between the FAQ and About.
- N17: rentals typos and the `drive_time` fact.
- N18: a Project details intro sentence.
- An RSS feed for Updates (5a, optional).

**When F2–F4 are done**, run v1's final check again: walk each persona's top questions (v1 Part 2, section 4) on the deployed site. The task table in section 4 above should then show "See progress so far" as answered, leaving only the two items closed by decision.

---

## 7. Method and limits

- Source read at `ea58f41`: the six bunkhouse pages, both layouts, the settings and FAQ data, the homepage banner, the rentals page, and `_redirects`. Rendered with `jekyll build` and served locally.
- Headless Chrome can't render narrower than about 500 px, so the "phone" screenshots are 500 px wide, not 390 px. Layout at true phone width should be checked on a device or in DevTools before the PR merges.
- The MIT giving form, MIT's matching-gift lookup, and MIT's ways-to-give page are external and weren't checked beyond confirming the links.
- This is an expert review against the v1 personas, with no user testing or analytics, as before.
