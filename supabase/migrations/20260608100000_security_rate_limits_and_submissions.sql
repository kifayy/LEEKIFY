-- Security: server-only rate limit buckets + block direct anon inserts to submissions.

create table if not exists public.api_rate_limits (
  bucket_key text not null,
  window_start timestamptz not null,
  hit_count integer not null default 0,
  primary key (bucket_key, window_start)
);

create index if not exists idx_api_rate_limits_window on public.api_rate_limits (window_start);

alter table public.api_rate_limits enable row level security;
-- No policies: anon/authenticated cannot read/write; service role bypasses RLS.

create or replace function public.increment_rate_limit(
  p_bucket_key text,
  p_window_start timestamptz,
  p_limit integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.api_rate_limits as r (bucket_key, window_start, hit_count)
  values (p_bucket_key, p_window_start, 1)
  on conflict (bucket_key, window_start)
  do update set hit_count = r.hit_count + 1
  returning hit_count into new_count;

  return new_count <= p_limit;
end;
$$;

revoke all on function public.increment_rate_limit(text, timestamptz, integer) from public;
grant execute on function public.increment_rate_limit(text, timestamptz, integer) to service_role;

-- Submissions must go through Next.js server action (service role), not direct REST API.
drop policy if exists "Allow public insert on hosted_scholarship_submissions" on public.hosted_scholarship_submissions;
