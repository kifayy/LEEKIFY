# School page SEO hub specification (PathPicker)

Single source of truth for **`/schools/{slug}`** pages: how student search intent maps to headings, copy, metadata, and structured data. **URL slugs are unchanged.**

---

## Current implementation (reference)

| Area | Location |
|------|----------|
| Page & `generateMetadata` | [`app/schools/[slug]/page.tsx`](../app/schools/[slug]/page.tsx) |
| Title / description / keywords | [`lib/school-page-metadata.ts`](../lib/school-page-metadata.ts) |
| Visible “Common questions” hub | [`components/school/SchoolSeoHubSection.tsx`](../components/school/SchoolSeoHubSection.tsx) |
| FAQ + metadata copy builders | [`lib/school-seo-hub-faq.ts`](../lib/school-seo-hub-faq.ts) |
| JSON-LD | [`components/school/school-page-json-ld.tsx`](../components/school/school-page-json-ld.tsx) |
| College fields | [`types/college-detail.ts`](../types/college-detail.ts) |

---

## Strategic framing

### One URL, many intents

Each school URL is a **mini hub** for:

1. **Admission chances & stats** — odds, selectivity, test/GPA language (careful: only state numbers present in your data).
2. **Requirements & process** — essays, deadlines, ED/EA/RD (prefer pointing to official sources for policy that changes yearly).
3. **Financial aid & cost** — tuition, net price, aid framing.
4. **Campus & student life** — vibe, dorms, social scene.
5. **Majors & academics** — fit, outcomes (only with defensible data).
6. **Yield & decisions** — timelines, waitlist (usually discovery copy unless sourced).

### What to avoid

- Hidden text, keyword dumps, or **FAQ schema that claims numbers not shown in visible copy**.
- Invented acceptance rates, test medians, aid amounts, or deadlines.

### When data is missing — discovery copy (approved)

Keep **natural query language** in questions/headings; answers use **soft, exploratory** copy, e.g.:

- “Discover how selective admission feels for **{School}** on PathPicker…”
- “Explore tuition and financial fit signals for **{School}**—confirm figures on the official site.”

Rotate **2–4 variants per cluster** (seeded by `college.id`) so 2k+ pages aren’t byte-identical.

---

## Query clusters → on-page map

Use these **H2** anchors (IDs) for predictable structure. The live page surfaces the **Common questions** block at `id="seo-hub"`.

| Cluster | Suggested H2 | When data exists | When data is missing |
|--------|----------------|------------------|----------------------|
| Admission chances & stats | Admissions chances & selectivity | Lead with `acceptance_rate` if set; location/context from `campus_vibe` / `highlights` | Discovery: odds, selectivity, fit exploration on PathPicker |
| Requirements & process | Applications, essays & timelines | Only if stored in DB; else link official admissions | Discovery + “confirm on official site” |
| Financial aid & cost | Tuition, cost & financial fit | `tuition_range` / `avg_price` snippets | Discovery; no dollar amounts |
| Campus & student life | Campus life & what the school is known for | `personality_line`, `campus_vibe`, `highlights` | Discovery + vibe sections below |
| Majors & academics | Majors, strengths & career fit | Highlights only—no fabricated rankings | Discovery |
| Yield & decisions | Decisions, waitlists & timelines | Sourced dates only | Discovery |

---

## Title tag playbook

- **Default target**: useful for branded + head-term combinations; Google may truncate—front-load **school name**.
- **When `meta_title` is set in DB**: keep override; append `| PathPicker` if missing (existing behavior).
- **When no `meta_title`** (implemented in code):
  - If **`acceptance_rate` present**:  
    `{SchoolName}: {rounded}% acceptance, admissions & costs | PathPicker`
  - **Else**:  
    `{SchoolName}: acceptance rate, admissions chances, costs & fit | PathPicker`

Tune lengths in Search Console; shorten if needed per brand guidelines.

---

## Meta description playbook (≈150–160 characters)

- **When `meta_description` is set**: use it.
- **When stats exist** (`acceptance_rate`, `location`, cost snippet):  
  Combine 2–3 factual bits + differentiator from `personality_line` or `highlights[0]` + CTA (“See odds, costs, and vibe on PathPicker.”).
- **When light on stats**:  
  `Explore {SchoolName} on PathPicker: admission chances, costs, campus vibe, and fit.`  
  **No false numbers.**

---

## `keywords` array

**Google ignores HTML meta keywords** for ranking. The field remains useful for internal organization or exports. When not provided in DB, the app generates a **short, deduped** list: school name, a few `{SchoolName} + intent` phrases, `location`, `PathPicker`—no repetition spam.

---

## Structured data

1. **`CollegeOrUniversity`** + **`BreadcrumbList`** — always (existing).
2. **`FAQPage`** — optional; emitted when the visible FAQ block has items. Every FAQ answer in JSON-LD **must match** visible text (same strings from shared builder).
3. **Validation**: [Google Rich Results Test](https://search.google.com/test/rich-results).
4. **Advanced (optional later)**: `WebPage` + `speakable` only with stable selectors.

---

## Internal linking

- **Browse**: link to [`/browse-schools`](../app/browse-schools).
- **Engagement**: quizzes (`/archetype-quiz`, etc.) where contextually relevant.
- **Similar schools**: existing section continues hub discovery.

---

## Measurement

- **Google Search Console**: monitor queries containing `{SchoolName}` + tokens like `acceptance`, `admission`, `tuition`, `SAT`, `deadline`, `essay`, `financial aid`.
- **cadence**: baseline → review after ~6 weeks on representative high-traffic schools.

---

## Appendix A — Original fill-in-the-blank templates (verbatim)

*`{School}` = university / college name.*

### Admission chances & stats

- Odds of getting into `{School}` University
- Chance of admission at `{School}`
- `{School}` acceptance rate [year]
- How hard is it to get into `{School}`
- `{School}` admit rate
- `{School}` rejection rate
- What GPA do you need to get into `{School}`
- `{School}` average SAT score admitted students
- `{School}` average ACT score
- `{School}` class profile

### Requirements & process

- `{School}` application requirements
- Does `{School}` require letters of recommendation
- `{School}` essay prompts
- `{School}` supplemental essays
- How many AP classes does `{School}` want
- Does `{School}` look at freshman grades
- `{School}` interview required
- `{School}` early decision acceptance rate
- `{School}` early action vs regular decision
- `{School}` rolling admissions deadline

### Financial aid & cost

- `{School}` tuition cost
- `{School}` financial aid for international students
- Average scholarship amount at `{School}`
- `{School}` net price calculator
- Does `{School}` meet 100% of financial need
- `{School}` merit scholarships requirements

### Campus & student life

- What is `{School}` known for
- `{School}` student reviews
- `{School}` campus life
- Is `{School}` a party school
- `{School}` dorms freshman year
- `{School}` greek life

### Majors & academics

- Best majors at `{School}`
- `{School}` computer science ranking
- `{School}` pre-med acceptance rate
- Is `{School}` good for [major]
- `{School}` graduate school placement rate

### Yield & decisions

- `{School}` waitlist acceptance rate
- When does `{School}` release decisions
- Does `{School}` send likely letters

### Recommended H2/H3 anchoring (Appendix A)

| Example query phrase | Recommended section |
|---------------------|---------------------|
| Chance of admission at `{School}` | H2: Admissions chances & selectivity; body + FAQ mirror phrasing |
| `{School}` tuition cost | H2: Tuition, cost & financial fit |
| What is `{School}` known for | H2: Campus life & reputation |
| When does `{School}` release decisions | FAQ item (discovery unless official dates sourced) |

---

## Appendix B — Additional high-intent templates

1. `{School}` transfer acceptance rate  
2. `{School}` transfer requirements  
3. Is `{School}` test optional / test blind  
4. Does `{School}` superscore SAT / ACT  
5. `{School}` middle 50 SAT / ACT  
6. `{School}` average GPA admitted students  
7. `{School}` out of state admissions harder  
8. `{School}` international student percentage / international friendly  
9. `{School}` need blind or need aware  
10. `{School}` meets full demonstrated financial need (Y/N + nuance)  
11. `{School}` student faculty ratio / average class size  
12. `{School}` honors college / honors program requirements  
13. `{School}` CS ranking / engineering ranking *(only with honest sourcing)*  
14. `{School}` pre law / pre med advising  
15. `{School}` starting salary / outcomes *(only with data)*  
16. `{School}` ROI / worth the cost  
17. `{School}` common data set  
18. `{School}` application deadline early action / early decision / regular decision dates  
19. `{School}` application fee waiver  
20. `{School}` portfolio / audition required majors  
21. `{School}` credit for AP / IB policy  
22. `{School}` dual enrollment / gap year policy  
23. `{School}` defer admission policy  
24. `{School}` waitlist strategy / when waitlist releases  
25. `{School}` honors vs scholars programs difference  
26. `{School}` undergraduate research opportunities  
27. `{School}` study abroad participation  
28. `{School}` co-op / internship availability  
29. `{School}` dorms guaranteed / housing cost  
30. `{School}` freshman live on campus requirement  
31. `{School}` campus safety / crime statistics *(word carefully; prefer official reports)*  
32. `{School}` transportation / car policy freshman  
33. `{School}` diversity demographics *(only with data)*  
34. `{School}` religious affiliation / cultural climate  
35. `{School}` athletic division / big sports culture  

**Optional extensions** (policy-sensitive): legacy status, demonstrated interest, residue “test optional” queries, “chance me `{School}`” — prefer tools that encourage holistic planning over speculative guarantees.

---

## Success checklist

- [ ] Hub section visible at `#seo-hub` with crawlable HTML FAQ-style Q&A.  
- [ ] Metadata follows title/description playbooks when DB overrides absent.  
- [ ] FAQ JSON-LD matches visible answers; no numeric claims without data.  
- [ ] Slugs unchanged; sitemap still lists `/schools/{slug}`.
