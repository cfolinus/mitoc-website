# Camelot bunkhouse pages: staggered implementation plan

*Drafted 2026-11-19 from section 6 of [bunkhouse-ux-review.md](bunkhouse-ux-review.md). R-numbers refer to that section.*

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
- **R4 (redirect only):** Add `/bunkhouse /camelot 301` and `/bunkhouse/* /camelot 301` to [_redirects](../../_redirects).
- **Display bug:** Keep the line breaks in the check-mailing address in [bunkhouse_faqs.yml:70-72](../../_data/bunkhouse_faqs.yml#L70-L72) by ending each line with two spaces or `<br>`.

### 1b. Links and newcomer copy (one PR, about 1 hour)
- **R4 (rentals):** Replace the stale "Bunkhouse project" section in [rentals/camelot.md:55-57](../../_pages/rentals/camelot.md#L55-L57) with two sentences that don't depend on any fact still being decided, plus a link to `/camelot`. Leave "40 or more" (line 11) alone until 2a.
- **R12 (structure):** Show "Learn more" next to Donate in the collapsed banner footer. Rewrite the banner's opening to say what Camelot is, and remove "As you may know." Leave the disputed claims (the distance, "Since 2013", "end of its useful life", "design now complete") for 2a.

### 1c. Project page headings (one PR, about 1 hour)
- **R14:** In [project.md](../../_pages/camelot/project.md), add `##` headings and a caption for each drawing, and end with links to the FAQs and Donate.

### 1d. Compact hero (one PR, a few hours)
- **R10:** Show the full hero only on the overview, using a front-matter flag such as `hero: full`. Use a one-row title, thermometer, and Donate bar on the subpages. Cap the hero's height on phones. Give the `h3` a light backing so it has enough contrast.
- R3 changes the hero text later, so build the layout so the copy can change without touching the CSS.

**Check each PR** with `jekyll serve` at 1280 px and 390 px wide. Tap both Donate buttons on a phone-sized screen, open the phone menu, and confirm that `/bunkhouse` redirects. Running `html-proofer` (already in the Gemfile) catches broken links.

---

## Stage 2: Content fixes (after the committee check-in)

### 2a. Keep key facts in one place, then fix them (R3)
1. **Refactor first, without changing any wording:** move the facts that drift into [bunkhouse_settings.yml](../../_data/bunkhouse_settings.yml), for example `total_cost`, `current_phase`, `groundbreaking`, `completion_target`, `nightly_fee`, `distance_to_cabin`, and `capacity_now`. Then insert them with Liquid in the overview, the FAQ, the banner, and the rentals page. This removes the cause of the contradictions in section 7.
2. **Then settle the values:** update each row of section 7 to the agreed value. Pick one definition of "Phase 1". Update the hero ("Coming 2027" and the h3 subtitle) and the FAQ answers written in the past tense (trail work, "When will construction start?"). Finish the banner and rentals edits that 1b left for later.

### 2b. Money (R7, R9)
- **R7:** Add a "What Phase 2 will fund" section to the overview: Phase 1's cost and thanks to its donors, what the Phase 2 total covers and when it was last estimated, the amount raised, the remaining gap, and the funding level that lets construction start. Rewrite the FAQ cost answer, which still has its 2022 wording. Point the thermometer at whatever the committee chose, and add a "$X to go" figure computed in Liquid.
- **R9:** Remove or lower `&amount=1000` in `donate_link`. Add the line "314 people have given. Gifts of every size count." near the thermometer, with the donor count filled in from `number_donors`.
- **Add an `updated:` date** to `bunkhouse_settings.yml` and show "as of {date}" under the thermometer. Stage 3 can later switch this to the latest post's date.

### 2c. Ways to give and getting involved (R8, R13)
- **R8:** Create a new `/camelot/give` page and add it to the menu. Cover employer matching (the fund name and number, plus whatever details MIT gives for matching portals), checks (move this from the FAQ), stock, DAF, and IRA gifts (link to MIT's instructions), pledges, a named contact, and recognition, if the committee decides on any. Point the menu's "Donate" item to `/camelot/give` or keep it pointing to the form; recommend keeping the direct form link in the hero.
- **R13:** Add a "Get involved" block on the overview for now, with a volunteer signup form and a "Get updates by email" list. Rewrite the FAQ answer to "Will students be involved? Alums?" to point to it.

**After each content PR:** run `npm run build` in [tools/](tools/) to regenerate the content-review doc, so the committee reviews the current wording.

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
| 2 | 2a, 2b, 2c | Committee answers (Q1–6, 8) | 1–2 days |
| 3 | 3a, 3b, 3c | An owner (Q9) and photos (Q7) | Half a day of setup, then about 1 hour per post |
| 4 | 4a, 4b | Stages 2 and 3; usage data for R16 | 1–2 days |
