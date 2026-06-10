-- Browse discovery analytics (demand signals for future /college-search promotion).

create table if not exists public.browse_search_events (
  id bigint generated always as identity primary key,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists browse_search_events_type_created_idx
  on public.browse_search_events (event_type, created_at desc);

alter table public.browse_search_events enable row level security;

comment on table public.browse_search_events is 'Server-side browse/discover event log; inserts via service role API only.';
