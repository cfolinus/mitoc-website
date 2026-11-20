# Camelot bunkhouse pages: staggered implementation plan

*Drafted 2026-11-19 from section 6 of [bunkhouse-ux-review.md](bunkhouse-ux-review.md). R-numbers refer to that section. Status last updated 2026-11-20.*

## Status

| Batch | Status | Commit (branch `bunkhouse-edits`) |
|---|---|---|
| Stage 0: send questions to the committee | **Partly answered.** The content-review doc came back 2026-11-20 with Part 1 (key facts), Q2, and Q3 filled in. Q4–Q9, the nightly fee, and the gift preset are still open. | — |
| 1a: code fixes (R1, R2, typo, redirect, address) | Done | `8e67d88` |
| 1b: banner and rentals links and copy (R12, R4) | Done, except the disputed facts left for 2a | `7f487e6` |
| 1c: project page headings and captions (R14) | Done | `54d59f8` |
| 1d: compact hero (R10), plus follow-up tweaks | Done | `2aba590` |
| 2a-1: key-facts refactor (no wording change) | Done | see `git log` |
| 2a-2: agreed facts and copy fixes (R3) | Done | see `git log` |
| 2b: money and thermometer (R7, R9 wording) | Done, except the R9 gift preset (Q10 in the new review doc) | see `git log` |
| 2c: ways to give, get involved (R8, R13) | **Blocked** on Q4, Q5, Q8 | — |
| Stage 3 onward | Not started | — |

Stage 1 isn't pushed or merged yet. The commits are only on the local `bunkhouse-edits` branch. Before starting new work, read the **Handoff notes** at the end of this file.

The plan follows the review's "Suggested order of work" with four adjustments:

- **Each stage is split into PR-sized batches.** Every batch can ship by itself.
- **Questions go to the committee on day 1**, so the decisions are ready by the time Stage 1 ships.
- **Stage 1 avoids every disputed fact.** R4 and R12 rewrite copy, so in Stage 1 they only add links and newcomer framing. Any number or claim listed in section 7 waits for Stage 2, so the copy isn't rewritten twice.
- **Two items move earlier.** R10 (the compact hero) only changes the layout, so it moves to Stage 1. R8 becomes its own `/camelot/give` page in Stage 2, so the R5 restructure can link to it instead of rewriting it.

```
Day 1        Stage 1 (no decisions)        Stage 2 (after check-in)      Stage 3            Stage 4
─────        ──────────────────────        ────────────────────────      ───────            ───────
Send Qs  ──► 1a code fixes                 2a key facts + R3             3a Updates infra   4a R5 + R11 overview
to the       1b links & copy (safe)   ──►  2b money: R7, R9         ──►  3b backfill posts ─► 4b R15 FAQ + R16
committee    1c R14 project headings       2c R8 /give, R13              3c upkeep process
             1d R10 compact hero
```

---

## Stage 0: Send the open questions (day 1, in parallel with Stage 1)

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

---

## Stage 1: Quick wins (no decisions needed, this week)

### 1a. Code fixes (one PR, about 1 hour)
- **R1:** In [_layouts/bunkhouse.html:35-37](../../_layouts/bunkhouse.html#L35-L37), replace the dead `<button>` with an `<a href="{{site.data.bunkhouse_settings.donate_link}}">`.
- **Typo:** Rename the class `bunkouse-donate-button` to `bunkhouse-donate-button` everywhere it appears: [bunkhouse.html](../../_layouts/bunkhouse.html), [camelot_banner.html](../../_includes/camelot_banner.html), and [css/mitoc.css](../../css/mitoc.css).
- **R2:** Add a "← MITOC home" item to the menu in [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml), or drop `hide_root=true`. Rename the "Camelot Bunkhouse" menu item to "Overview". Leave the commented-out History entry for now; Stage 3 removes it.
  - *As built:* I dropped `hide_root=true`. The "MIT Outing Club" brand link now shows at every width, including phones with the menu closed.
- **R4 (redirect only):** Add `/bunkhouse /camelot 301` and `/bunkhouse/* /camelot 301` to [_redirects](../../_redirects).
- **Display bug:** Keep the line breaks in the check-mailing address in [bunkhouse_faqs.yml:70-72](../../_data/bunkhouse_faqs.yml#L70-L72) by ending each line with two spaces or `<br>`.

### 1b. Links and newcomer copy (one PR, about 1 hour)
- **R4 (rentals):** Replace the stale "Bunkhouse project" section in [rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57) with two sentences that don't depend on any fact still being decided, plus a link to `/camelot`. Leave "40 or more" (line 11) alone until 2a.
- **R12 (structure):** Show "Learn more" next to Donate in the collapsed banner footer. Rewrite the banner's opening to say what Camelot is, and remove "As you may know." Leave the disputed claims (the distance, "Since 2013", "end of its useful life", "design now complete") for 2a.
  - *As built:* I renamed the link inside the expanded banner from "Read more" to "Learn more" to match. I removed "Since 2013" and "end of its useful life" from the first paragraph rather than replacing them.
  - *Still waiting for 2a:* in [camelot_banner.html](../../_includes/camelot_banner.html), "approximately 100m" (line 23), "$1.3 million" (line 26), "With the design now complete" (line 30), and "complete the new bunkhouse in 2027" (line 33). In [rentals/camelot.md:11](../../_pages/rentals/camelot.md#L11), "40 or more" (also misspelled "accomodate").

### 1c. Project page headings (one PR, about 1 hour)
- **R14:** In [project.md](../../_pages/camelot/project.md), add `##` headings and a caption for each drawing, and end with links to the FAQs and Donate.

### 1d. Compact hero (one PR, a few hours)
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

---

## Stage 2: Content fixes (after the committee check-in)

*Re-planned 2026-11-20 from the committee's answers in the returned [bunkhouse-content-review.docx](bunkhouse-content-review.docx). The committee filled in Part 1 and answered Q2 and Q3. They didn't edit any Part 3 wording, so the new copy below is drafted by the maintainer and reviewed batch by batch as usual.*

### Before starting: save the committee's copy
`npm run build` in [tools/](tools/) **overwrites** `bunkhouse-content-review.docx`, and the returned file (uncommitted) is the only record of the committee's answers. Rename it to `bunkhouse-content-review-2026-11-20-committee.docx` and commit it before regenerating anything.

### What the committee settled

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
| History | 2011 discussions begin · 2013 MITOC board approves · 2014–18 focus groups · 2018 founding gift (Joris Naiman) · 2019 Maclay hired · 2021 design complete · 2022–24 Phase 1 fundraising · 2024–25 Phase 1 built · 2026–27 Phase 2 fundraising | Settles "almost a decade" and "Since 2013". |
| Cabin condition | The committee wrote three paragraphs (Part 1, "Condition of the existing cabin"): near the end of its usable life *as sleeping space*; loft repaired but patches only go so far; can't be brought to lodging code; within a few years it won't be safe to sleep in; usable as kitchen and lounge for another 10–20 years. | Use it nearly verbatim in the FAQ. Both the banner's "end of its useful life" and the FAQ's "10–20 years" are true once each is qualified. |
| Contact | mitoc-bunkhouse@mit.edu (no named person) | |

**Still open.** Follow up with the committee, but don't let these block 2a or 2b:
- **Nightly fee** (Q6, second half): left blank. Remove the "$20" from the FAQ and don't state a number.
- **Phase 0 in the $1.3M?** The committee's list includes "design … work from architects", but the current FAQ says the initial Maclay design was paid for separately, and $300K + $1M = $1.3M suggests Phase 0 is outside the total. Until this is confirmed, describe the $1.3M as "Phases 1 and 2" and leave Phase 0's funding out.
- **What if the $1.3M isn't reached by spring 2027?** There's $832K to go and about six months left. Does groundbreaking slip to 2028? The answer belongs in R7 and R15. Until then, say only that full funding is needed before groundbreaking.
- **Phase 1's $300K:** was it raised, or was it the cost? Can Phase 1 donors be thanked by name or as a group?
- **Rentals parking instructions** belong to the cabin managers. Check the new wording with camelot-mgr@mit.edu.
- Q4 (non-cash gifts, contact, recognition), Q5 (matching), Q7 (photos, usage data), Q8 (volunteering), Q9 (updates owner), and the R9 gift preset.

### 2a-1. Key-facts refactor, no wording change (one PR, about 2 hours)
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

### 2a-2. Agreed facts and copy fixes (R3) (one PR, about half a day)
First add the newly agreed facts to `facts:` (`capacity_now`, `distance_to_bunkhouse`, `walk_from_parking`, `groundbreaking`, `completion`, `phase2_cost`, `parking_lot`), then edit the copy below. Labels match the content-review doc. Make one wording pass, keeping the current structure; the R5 restructure is Stage 4.

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

### 2b. Money and thermometer (R7, R9 wording) (one PR, a few hours)
- **Thermometer** in [bunkhouse.html](../../_layouts/bunkhouse.html):
  - Change the label to "Raised and pledged".
  - Add "$832,000 to go", computed as `donations_goal | minus: donations_amount`.
  - Add `donations_as_of: November 2026` to the settings and show "as of {date}" underneath. In the compact strip, keep it small or move it into a tooltip so the strip stays one row.
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

### 2c. Ways to give and getting involved (R8, R13): blocked
Waits on Q4 (non-cash, pledges, contact, recognition), Q5 (matching details), and Q8 (volunteering). The scope is the same as before:
- **R8:** a `/camelot/give` page covering matching, check (moved from the FAQ), stock, DAF and IRA gifts, pledges, a contact, and recognition. Keep the hero's direct form link.
- **R13:** a "Get involved" block, and rewrite FAQ timeline-4 to point to it.

*Optional, only if the committee is slow:* a minimal `/camelot/give` with just what's already true. That means online giving, the check instructions moved from the FAQ, the fund number 3892696 for matching portals, and "For stock, IRA, or larger gifts, email mitoc-bunkhouse@mit.edu". Expand it once Q4 and Q5 are answered.

### After each batch
- Run `npm run build` in [tools/](tools/) (only after the committee's copy is saved; see above).
- Regenerate the review doc. Rewrite the hard-coded Part 1 table and Part 2 questions in `make_content_doc.js`, so Part 1 shows the agreed values and Part 2 lists only the questions still open.
- Check at 1280 px and 390 px, as for Stage 1. The thermometer's new "to go" and "as of" lines need a look in the compact strip.

---

## Stage 3: Updates page (R6, once an owner is named)

**Gate:** someone has agreed to write a post at least every quarter, plus one at each milestone. If no one agrees, skip 3a and 3b, and add a dated milestone list to the overview in 4a instead.

### 3a. Infrastructure (one PR, a few hours)
- Add a `camelot_updates` collection with `output: true` and a permalink like `/camelot/updates/:title/` to [_config.yml](../../_config.yml). The site runs Jekyll 3.8 with no feed plugin. Collections work on 3.8, and an optional RSS feed can be a hand-written `feed.xml` template.
- Add a post layout with the five-part structure: what happened, photos, amount raised since the last post, what's next, and one ask. Add an index page at `/camelot/updates`.
- Add a "Latest update" include for the overview, and switch "as of" to the latest post's date.
- Add "Updates" to the menu and delete the commented-out History entry.

### 3b. Backfill posts (content, can start as soon as photos arrive)
- Write six posts: 2018 founding gift, 2019–21 design, fall 2022 launch, June 2023 approval, summer 2024 site work, and spring 2025 Phase 1 complete (with photos). Then write the Phase 2 kickoff post.
- This doesn't need the Stage 4 restructure.

### 3c. Upkeep
- Put a recurring quarterly reminder on the owner's calendar. Updating the thermometer becomes part of writing each post.
- Write a short note on how to add a post through GitHub's web editor.

---

## Stage 4: Overview restructure (once Stages 2 and 3 exist)

### 4a. Overview rewrite (R5, R11)
- Rewrite [index.md](../../_pages/camelot/index.md) in the section order R5 proposes: What is Camelot? · Why a new bunkhouse? · Latest update · What Phase 2 will fund · Ways to give · Get involved · Who's leading the project.
- Most of these sections reuse content from 2b, 2c, and 3a, either moved or summarized with a link to the full version.
- **R11:** Use real cabin photos from `/images/camelot/`, add location context, and link to `/rentals/camelot`. Explain "MITOCers" or drop it.
- Remove the history paragraphs, since the backfilled posts now cover that history.
- The final menu is: Overview · Updates · Project details · FAQs · Give/Donate · ← MITOC home.

### 4b. FAQ revision and impact numbers (R15, R16)
- **R15:** Retire or update the answers that depend on dates. Add questions on matching, rising costs or a missed goal, where groups sleep now, donor recognition, and how much Camelot is used. Move "Who is managing this project?" higher in the list.
- **R16:** Add three or more usage figures to the overview's "Why a new bunkhouse?" section and to the FAQ, once the cabin managers provide them. This can ship whenever the data arrives.

**Final check:** walk through each persona's top questions in section 4 again on the rendered site. The task matrix in section 5 should have no ✗ left in the cells that matter for each persona.

---

## Summary

| Stage | Batches | Waits on | Rough effort |
|---|---|---|---|
| 0 | Send the questions | Nothing | 30 min |
| 1 | 1a, 1b, 1c, 1d | Nothing | 1 day total |
| 2 | 2a-1, 2a-2, 2b, 2c | 2a and 2b are unblocked. 2c waits on Q4, Q5, Q8. | 1–2 days |
| 3 | 3a, 3b, 3c | An owner (Q9) and photos (Q7) | Half a day of setup, then about 1 hour per post |
| 4 | 4a, 4b | Stages 2 and 3; usage data for R16 | 1–2 days |

---

## Handoff notes

These were learned while building Stage 1. They're aimed at whoever (person or agent) picks this up next.

### Working agreements with the site maintainer
- **Do one batch at a time, commit it, and stop for review** before starting the next. The maintainer reviews each batch on the local server and often asks for small tweaks, which then go into that batch's commit.
- **Don't change a fact listed in the review's section 7** until the committee has agreed on its value. If a sentence containing one has to be rewritten, drop the claim rather than picking a value.
- Commit messages follow the pattern "… (UX review batch 1a)", with a bulleted list of what changed and the R-numbers.

### Running and checking the site
- **Local server:** run `bundle exec jekyll serve --livereload` from the repo root, then open http://localhost:4000/camelot. The site uses Jekyll 3.8 (see the Gemfile) and is hosted on Netlify, which is why redirects live in `_redirects`.
- **Built file names:** pages build to `_site/camelot.html` and `_site/camelot/faqs.html`, not `…/index.html`. That matters if you serve a build folder with a plain static server.
- **Screenshot quirks with headless Chrome:**
  - It won't render narrower than about 500 px. A 390 px window size still lays the page out wider and crops it. Use Chrome DevTools device mode, or a real phone on the same Wi-Fi, for true phone widths.
  - The full hero has `min-height: 57vh` at 768 px and wider. A very tall desktop window stretches it, so use realistic window heights such as 1280×800.
  - Loading a URL with a `#anchor` gives blank or broken screenshots. To see content further down, use a tall window at phone width (no vh rule applies there), or a scratch copy of the page with `.bunkhouse-banner{display:none}` added.
- Running `html-proofer` (in the Gemfile) checks for broken links.
- Run `npm run build` in [tools/](tools/) after content changes, to regenerate the committee's content-review doc.

### Code map (after Stage 1)
- **Hero and thermometer:** [_layouts/bunkhouse.html](../../_layouts/bunkhouse.html). It's a single template: `{% assign settings = site.data.bunkhouse_settings %}` at the top, with `bunkhouse-banner-full` or `-compact` chosen by `page.hero`. The thermometer numbers are wrapped in `.donations-stats`, and Donate is a sibling of that block.
- **Hero CSS:** in [css/mitoc.css](../../css/mitoc.css), shared `.bunkhouse-banner` rules come first, then a `/* Full hero */` block and a `/* Compact strip */` block, each with its own `min-width: 768px` media query.
- **Class names:** the class is now spelled `bunkhouse-donate-button`; the old `bunkouse` typo is gone everywhere.
- **Heading anchors:** the existing rule `.bunkhouse-container h2[id], h3[id] { scroll-margin-top: 70px }` keeps heading anchors clear of the fixed navbar. New `##` headings on any bunkhouse page are covered automatically.
- **Figures:** use `<figure class="bunkhouse-figure">` with `<figcaption>` for drawings and photos. Images shrink to fit narrow screens.
- **Homepage banner:** in [_includes/camelot_banner.html](../../_includes/camelot_banner.html), the collapsed footer is `.camelot-banner-actions` (Learn more and Donate). It's hidden when the banner is expanded. The click-to-expand script ignores clicks on `<a>` elements.
- **FAQ answers:** they live in [_data/bunkhouse_faqs.yml](../../_data/bunkhouse_faqs.yml) and are rendered by kramdown. Use `%donate_link%` as a placeholder for the donate URL. To keep line breaks inside a blockquote, end each line with `<br>`.

### Things to know for later stages
- **3a (Updates page):** there's no feed plugin and no existing collections in `_config.yml` (its plugins are jekyll-jolt, jekyll-sitemap, and jekyll-target-blank). An RSS feed would need a hand-written template, or adding `jekyll-feed` to the Gemfile and checking that Netlify builds it.
- **Phone Donate button:** the full-width Donate button at the bottom of phone pages (`.small-screen-only` in the layout) still uses the base button size. The user hasn't decided whether to shrink it too.
- **Unpushed commits:** Stage 1 isn't pushed. The maintainer hasn't yet decided whether to open a PR for Stage 1 alone or wait for more stages.
