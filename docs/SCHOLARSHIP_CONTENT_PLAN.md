# Scholarship Content & SEO Plan

A structured plan for scholarship pages, articles (e.g. "Best scholarships for STEM kids"), Supabase schema, and bulk generation.

---

## 1. Content Architecture Overview

| Type | URL | Purpose |
|------|-----|---------|
| **Scholarships index** | `/scholarships` | Browse all scholarships |
| **Individual scholarship** | `/scholarships/[slug]` | Single scholarship details |
| **Articles index** | `/scholarships/articles` | List all SEO articles |
| **Individual article** | `/scholarships/articles/[slug]` | Article like "Best scholarships for STEM kids" with linked scholarships |

---

## 2. Database Schema Changes (Supabase)

### 2.1 Add tags/categories to scholarships

Add a way to group scholarships for bulk article generation:

```sql
-- Add tags to scholarships (for filtering: stem, engineering, first-gen, etc.)
alter table public.scholarships add column if not exists tags text[] default '{}';
create index if not exists idx_scholarships_tags on public.scholarships using gin(tags);

-- Optional: add meta for individual scholarship SEO
alter table public.scholarships add column if not exists meta_description text;
```

### 2.2 Junction table: article ↔ scholarships

Links articles to scholarships and controls order:

```sql
create table if not exists public.scholarship_article_scholarships (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.scholarships_page(id) on delete cascade,
  scholarship_id uuid not null references public.scholarships(id) on delete cascade,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  unique(article_id, scholarship_id)
);

create index idx_sas_article on public.scholarship_article_scholarships(article_id);
create index idx_sas_scholarship on public.scholarship_article_scholarships(scholarship_id);
```

### 2.3 Enhance scholarships_page for SEO & bulk generation

```sql
-- Add fields for better SEO and bulk workflows
alter table public.scholarships_page add column if not exists og_image text;
alter table public.scholarships_page add column if not exists canonical_url text;
alter table public.scholarships_page add column if not exists is_published boolean default false;

-- For bulk generation: template that auto-fetches scholarships by tag
-- e.g. "stem" → fetches all scholarships where 'stem' = any(tags)
alter table public.scholarships_page add column if not exists auto_tag text;
```

---

## 3. Article Content Format

### Option A: Hybrid (recommended)

- **Intro/body**: Rich text in `content` (editor-friendly).
- **Scholarship list**: Stored in `scholarship_article_scholarships` and rendered as cards/links by the app.
- **Bulk generation**: Create article + insert rows in junction. Intro can be templated or AI-generated.

### Option B: Fully templated

- `content` stores a template with placeholders.
- `{{SCHOLARSHIP_CARDS}}` is replaced at render time with cards from the junction.
- Good for consistent layout; less flexible for custom copy.

### Recommended structure for article page

1. **H1** – Article title (e.g. "Best Scholarships for STEM Kids 2025")
2. **Intro paragraph(s)** – From `content`
3. **Scholarship cards section** – Pulled from `scholarship_article_scholarships`, ordered by `display_order`
4. **Optional outro** – Extra content after the cards

---

## 4. Bulk Generation Workflow

### 4.1 Tag-based auto-linking

1. Add tags to scholarships (e.g. `["stem", "engineering", "high-school"]`).
2. For an article like "Best scholarships for STEM kids":
   - Set `auto_tag = 'stem'` and/or use the junction.
   - Query: `scholarships where 'stem' = any(tags)`.
3. Bulk script can:
   - Create the article
   - Insert junction rows for all matching scholarships

### 4.2 Bulk generation script (Node/Supabase)

```ts
// Pseudocode for bulk article creation
const templates = [
  { slug: 'best-stem-scholarships', title: 'Best Scholarships for STEM Kids', auto_tag: 'stem' },
  { slug: 'best-engineering-scholarships', title: 'Best Engineering Scholarships', auto_tag: 'engineering' },
];

for (const t of templates) {
  const article = await supabase.from('scholarships_page').insert({...}).select().single();
  const scholarships = await supabase.from('scholarships').select('id').contains('tags', [t.auto_tag]);
  for (let i = 0; i < scholarships.length; i++) {
    await supabase.from('scholarship_article_scholarships').insert({
      article_id: article.id,
      scholarship_id: scholarships[i].id,
      display_order: i,
    });
  }
}
```

### 4.3 Supabase Studio / CSV import

- Maintain a `scholarship_article_seeds` table or CSV with: `slug, title, meta_title, meta_description, intro_content, auto_tag`.
- Use a migration or Edge Function to:
  - Insert into `scholarships_page`
  - Populate `scholarship_article_scholarships` from tags

---

## 5. SEO Checklist

| Item | Implementation |
|------|----------------|
| **Meta title/description** | Use `meta_title`, `meta_description` on articles; generate for scholarships |
| **Canonical URL** | `canonical_url` on articles; default to `/{path}` |
| **OG image** | `og_image` on articles; fallback to scholarship `image_url` |
| **Structured data** | Add JSON-LD: `Article` for articles, `Scholarship` for scholarships, `ItemList` for article scholarship lists |
| **Internal links** | Article → scholarships; scholarship → related articles (by shared tags) |
| **Sitemap** | Include `/scholarships`, `/scholarships/articles`, and all slugs |
| **generateStaticParams** | Pre-generate paths for top pages or use ISR |
| **Breadcrumbs** | Home → Scholarships → Article/Scholarship |
| **H1/H2 hierarchy** | Single H1; logical H2s for sections |

---

## 6. Implementation Order

1. **Phase 1 – Schema**
   - Add `tags` to `scholarships`
   - Create `scholarship_article_scholarships` junction
   - Add `og_image`, `auto_tag` (optional) to `scholarships_page`

2. **Phase 2 – Queries & UI**
   - Query scholarships by article (junction)
   - Render scholarship cards in article page
   - Add "Related articles" on scholarship page (by tags)

3. **Phase 3 – Bulk tools**
   - Script/Edge Function to create articles + link scholarships by tag
   - CSV import flow if needed

4. **Phase 4 – SEO**
   - JSON-LD structured data
   - Sitemap
   - Breadcrumbs

---

## 7. File Structure Summary

```
app/
  scholarships/
    page.tsx              # Index (all scholarships)
    [slug]/page.tsx       # Individual scholarship
    articles/
      page.tsx            # Article index
      [slug]/page.tsx     # Article (intro + linked scholarships)

lib/supabase/queries/
  scholarships.ts         # + getScholarshipsByTag, getScholarshipsForArticle
  scholarships-page.ts    # + getArticleWithScholarships

supabase/migrations/
  xxx_add_article_scholarship_junction.sql
  xxx_add_tags_to_scholarships.sql
```

---

## 8. Example Article Record (Supabase)

```json
{
  "id": "uuid",
  "title": "Best Scholarships for STEM Kids in 2025",
  "slug": "best-stem-scholarships",
  "meta_title": "Best STEM Scholarships for Kids 2025 | Pathpicker",
  "meta_description": "Curated list of top STEM scholarships for students. Apply to engineering, science, and tech scholarships with deadlines and amounts.",
  "content": "<p>STEM scholarships help students pursue careers in science, technology, engineering, and math. Here are our top picks for 2025.</p>",
  "published_at": "2025-02-06T00:00:00Z",
  "auto_tag": "stem",
  "og_image": "https://..."
}
```

Junction rows link this article to specific scholarships (by id), with `display_order` for ordering.
