# Scholarship article spec: categories and `scholarships_page` fields

Use this when generating new rows for `public.scholarships_page` so articles show under the right category and URLs.

---

## Valid categories (use these exactly)

Articles are listed at **`/scholarships/{category_slug}/{slug}`**. Only these category slugs exist:

| category_slug          | Category name (display) | Notes |
|------------------------|-------------------------|--------|
| `by-major`             | By Major                | Field of study |
| `by-state`             | By State                | State-based |
| `high-school-students` | High School Students    | Grade-level |
| `college-students`     | College Students        | Undergrad/grad |
| `easy-to-win`          | Easy to Win             | No-essay / sweepstakes |

- **category_slug** must be one of the five values above (exact string).
- **category_id** should be the UUID of the matching row in `scholarship_categories`. You can look it up with `SELECT id FROM scholarship_categories WHERE slug = 'easy-to-win';` or omit and set it in a follow-up. If you omit it, the app still works as long as **category_slug** is set.

---

## `scholarships_page` columns for an INSERT

Required for the article to show and be matched to a category:

| Column             | Type      | Required | What to put |
|--------------------|-----------|----------|-------------|
| **title**          | text      | yes      | Article headline. |
| **slug**           | text      | yes      | URL segment, lowercase, hyphens (e.g. `student-debt-sweepstakes-2026`). Must be unique. |
| **category_slug**  | text      | yes      | One of: `by-major`, `by-state`, `high-school-students`, `college-students`, `easy-to-win`. |
| **content**        | text      | yes      | Full article body as **HTML**: `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `<a href="...">`. |
| **published_at**   | timestamptz | yes    | When the article goes live (e.g. `now()` or a timestamp). If NULL, the article won’t appear in listings. |

Optional but recommended:

| Column             | Type      | What to put |
|--------------------|-----------|-------------|
| **meta_title**     | text      | SEO title (e.g. `Article Title \| Pathpicker`). |
| **meta_description** | text    | SEO description, ~140–160 chars. |
| **summary**        | text      | 2–3 sentence “answer at top” (plain text). Shown in a box above the hero. |
| **faq**            | jsonb     | Array of `{ "question": "...", "answer": "..." }` for the FAQ block. |
| **og_image**       | text      | Full URL to share image. |
| **canonical_url**   | text     | Canonical path or URL if different from `/scholarships/{category_slug}/{slug}`. |
| **auto_tag**       | text      | Optional tag (e.g. `sweepstake`) for internal use. |
| **category_id**     | uuid      | UUID from `scholarship_categories` where `slug = category_slug`. |
| **filter_field**   | text      | Optional filter (e.g. `is_sweepstake`). |
| **filter_type**     | text      | Optional (e.g. `eq`). |

Do not set in INSERT (they have defaults): **id**, **created_at**, **updated_at**.

---

## Example INSERT (minimal, matched to category)

```sql
INSERT INTO public.scholarships_page (
  title,
  slug,
  meta_title,
  meta_description,
  summary,
  content,
  published_at,
  category_slug,
  category_id,
  filter_field,
  filter_type,
  faq
) VALUES (
  'Your Article Title Here',
  'your-article-slug-here',                    -- URL: /scholarships/easy-to-win/your-article-slug-here
  'Your Article Title | Pathpicker',
  'Short SEO description.',
  'One or two sentence summary for the answer-at-top box.',
  '<p>First paragraph.</p><h2>First section</h2><p>More content...</p>',  -- HTML body
  now(),
  'easy-to-win',                              -- MUST be one of the 5 category_slug values
  (SELECT id FROM public.scholarship_categories WHERE slug = 'easy-to-win'),
  'is_sweepstake',                            -- optional
  'eq',                                       -- optional
  '[{"question": "FAQ question?", "answer": "FAQ answer."}]'::jsonb
);
```

---

## Rules for the AI

1. **category_slug** must be exactly one of: `by-major`, `by-state`, `high-school-students`, `college-students`, `easy-to-win`. No other values will match a category.
2. **slug** must be unique, lowercase, hyphenated (e.g. `best-stem-scholarships-2026`). It becomes the last segment of the URL.
3. **content** must be HTML. Use `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, and `<a href="...">` as needed. Internal links: `/scholarships/award/{award-slug}` for individual scholarships.
4. Set **published_at** (e.g. `now()`) so the article appears; leave it NULL only for drafts.
5. **category_id** can be set with a subquery: `(SELECT id FROM public.scholarship_categories WHERE slug = 'your-category-slug')`.
