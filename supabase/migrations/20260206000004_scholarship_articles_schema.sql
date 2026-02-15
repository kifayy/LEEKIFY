-- Phase 1: Add tags to scholarships, junction table, article enhancements

-- 1. Add tags and meta to scholarships
alter table public.scholarships add column if not exists tags text[] default '{}';
alter table public.scholarships add column if not exists meta_description text;
create index if not exists idx_scholarships_tags on public.scholarships using gin(tags);

-- 2. Junction table: article <-> scholarships
create table if not exists public.scholarship_article_scholarships (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.scholarships_page(id) on delete cascade,
  scholarship_id uuid not null references public.scholarships(id) on delete cascade,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  unique(article_id, scholarship_id)
);

create index if not exists idx_sas_article on public.scholarship_article_scholarships(article_id);
create index if not exists idx_sas_scholarship on public.scholarship_article_scholarships(scholarship_id);

alter table public.scholarship_article_scholarships enable row level security;
drop policy if exists "Allow public read on scholarship_article_scholarships" on public.scholarship_article_scholarships;
create policy "Allow public read on scholarship_article_scholarships"
  on public.scholarship_article_scholarships for select using (true);

-- 3. Enhance scholarships_page for SEO and bulk generation
alter table public.scholarships_page add column if not exists og_image text;
alter table public.scholarships_page add column if not exists canonical_url text;
alter table public.scholarships_page add column if not exists auto_tag text;
