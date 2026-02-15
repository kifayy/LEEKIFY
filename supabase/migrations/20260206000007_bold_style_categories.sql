-- Bold.org-style: scholarship_categories, scholarships_page updates, junction ai_description

-- 1. Create scholarship_categories
create table if not exists public.scholarship_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  display_order int default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);

create index if not exists idx_scholarship_categories_slug on public.scholarship_categories (slug);

alter table public.scholarship_categories enable row level security;
drop policy if exists "Allow public read on scholarship_categories" on public.scholarship_categories;
create policy "Allow public read on scholarship_categories"
  on public.scholarship_categories for select using (true);

-- 2. Seed 20 categories
insert into public.scholarship_categories (name, slug, display_order) values
  ('By Major', 'by-major', 1),
  ('By State', 'by-state', 2),
  ('By City', 'by-city', 3),
  ('By Ethnicity', 'by-ethnicity', 4),
  ('By Gender', 'by-gender', 5),
  ('By Grade Level', 'by-grade-level', 6),
  ('By GPA', 'by-gpa', 7),
  ('By Deadline', 'by-deadline', 8),
  ('By Amount', 'by-amount', 9),
  ('By Type', 'by-type', 10),
  ('By Sport', 'by-sport', 11),
  ('By Interest', 'by-interest', 12),
  ('By Career Goal', 'by-career-goal', 13),
  ('By School Type', 'by-school-type', 14),
  ('By Military', 'by-military', 15),
  ('By Disability', 'by-disability', 16),
  ('By Religion', 'by-religion', 17),
  ('First-Gen', 'by-first-generation', 18),
  ('International', 'by-international', 19),
  ('Easy to Win', 'easy-to-win', 20)
on conflict (slug) do nothing;

-- 3. Update scholarships_page
alter table public.scholarships_page add column if not exists category_id uuid references public.scholarship_categories(id);
alter table public.scholarships_page add column if not exists category_slug text;
alter table public.scholarships_page add column if not exists filter_field text;
alter table public.scholarships_page add column if not exists filter_type text;

create index if not exists idx_scholarships_page_category_slug on public.scholarships_page (category_slug);

-- 4. Add ai_description to junction
alter table public.scholarship_article_scholarships add column if not exists ai_description text;
