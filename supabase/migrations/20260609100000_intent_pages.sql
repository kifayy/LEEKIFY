-- Discover intent pages: AI-framed answer pages keyed by canonical slug.

create table if not exists public.intent_pages (
  slug text primary key,
  intent_type text not null default 'match_list',
  intent_json jsonb not null default '{}'::jsonb,
  title text,
  h1 text,
  meta_description text,
  intro text,
  summary text,
  why_fit text,
  best_for text,
  not_ideal_for text,
  methodology text,
  faq jsonb not null default '[]'::jsonb,
  highlighted_slugs text[] not null default '{}',
  index_state text not null default 'draft'
    check (index_state in ('draft', 'eligible', 'indexed', 'suppressed', 'retired')),
  search_count integer not null default 1,
  raw_query_samples text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists intent_pages_index_state_idx on public.intent_pages (index_state);
create index if not exists intent_pages_updated_at_idx on public.intent_pages (updated_at desc);

alter table public.intent_pages enable row level security;

create policy "intent_pages public read"
  on public.intent_pages for select
  to anon, authenticated
  using (true);

comment on table public.intent_pages is 'Canonical /discover/{slug} answer pages; writes via service role API only.';
