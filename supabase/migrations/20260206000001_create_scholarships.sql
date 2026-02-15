-- Scholarships table: individual scholarship listings
create table if not exists public.scholarships (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  provider text not null,
  amount text,
  deadline timestamptz,
  is_featured boolean not null default false,
  external_link text,
  image_url text,
  slug text not null unique,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_scholarships_slug on public.scholarships (slug);
create index if not exists idx_scholarships_is_featured on public.scholarships (is_featured);
create index if not exists idx_scholarships_deadline on public.scholarships (deadline);

-- Enable RLS (optional; adjust policies as needed)
alter table public.scholarships enable row level security;

drop policy if exists "Allow public read access on scholarships" on public.scholarships;
create policy "Allow public read access on scholarships"
  on public.scholarships for select
  using (true);
