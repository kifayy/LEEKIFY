-- scholarships_page: SEO articles (e.g. "best scholarships for stem majors")
create table if not exists public.scholarships_page (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  meta_title text,
  meta_description text,
  content text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_scholarships_page_slug on public.scholarships_page (slug);
create index if not exists idx_scholarships_page_published_at on public.scholarships_page (published_at);

alter table public.scholarships_page enable row level security;

drop policy if exists "Allow public read access on scholarships_page" on public.scholarships_page;
create policy "Allow public read access on scholarships_page"
  on public.scholarships_page for select
  using (true);
