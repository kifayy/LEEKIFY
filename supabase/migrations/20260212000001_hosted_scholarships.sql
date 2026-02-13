-- Hosted Scholarships: PathPicker's own scholarship intake forms
-- Each scholarship has a configurable form_schema (JSON); student submissions store answers (JSON)
-- Easy to export to providers: answers match form keys dynamically

-- 1. hosted_scholarships: defines each scholarship and its intake form
create table if not exists public.hosted_scholarships (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  amount text,
  deadline timestamptz,
  provider_export_id text,  -- optional: ID for provider export mapping
  form_schema jsonb not null default '{"fields":[]}',  -- see docs: field definitions
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_hosted_scholarships_slug on public.hosted_scholarships (slug);
create index if not exists idx_hosted_scholarships_is_active on public.hosted_scholarships (is_active);
create index if not exists idx_hosted_scholarships_deadline on public.hosted_scholarships (deadline);

alter table public.hosted_scholarships enable row level security;
create policy "Allow public read on hosted_scholarships"
  on public.hosted_scholarships for select using (is_active = true);

-- 2. hosted_scholarship_submissions: student intake responses
create table if not exists public.hosted_scholarship_submissions (
  id uuid primary key default gen_random_uuid(),
  hosted_scholarship_id uuid not null references public.hosted_scholarships(id) on delete cascade,
  answers jsonb not null default '{}',  -- key-value pairs matching form_schema field keys
  ip_hash text,  -- hashed IP for dedup / abuse prevention (optional)
  source text,  -- e.g. 'pathpicker_web', 'embed', 'awarded_app'
  exported_at timestamptz,  -- when exported to provider (optional)
  created_at timestamptz not null default now()
);

create index if not exists idx_hosted_submissions_scholarship on public.hosted_scholarship_submissions (hosted_scholarship_id);
create index if not exists idx_hosted_submissions_created on public.hosted_scholarship_submissions (created_at);
create index if not exists idx_hosted_submissions_exported on public.hosted_scholarship_submissions (exported_at) where exported_at is null;

alter table public.hosted_scholarship_submissions enable row level security;
create policy "Allow public insert on hosted_scholarship_submissions"
  on public.hosted_scholarship_submissions for insert with check (true);
