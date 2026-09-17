-- Recent public breaches shown on the home carousel and /breach/[slug] pages.
create table if not exists public.recent_breaches (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  organization text not null,
  logo_url text,
  logo_bg text not null default '#111827',
  rows_label text not null,
  rows_count bigint,
  breach_date date,
  added_at date,
  summary text,
  what_happened text,
  data_exposed text,
  eligibility text,
  disclaimer text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists recent_breaches_published_sort_idx
  on public.recent_breaches (is_published, sort_order asc, breach_date desc nulls last);

create index if not exists recent_breaches_slug_idx
  on public.recent_breaches (slug);

alter table public.recent_breaches enable row level security;

-- Public read of published breaches only (anon + authenticated).
create policy "Public can read published breaches"
  on public.recent_breaches
  for select
  to anon, authenticated
  using (is_published = true);

-- Seed featured carousel breaches (ss1-style home row).
insert into public.recent_breaches (
  slug,
  organization,
  logo_url,
  logo_bg,
  rows_label,
  rows_count,
  breach_date,
  added_at,
  summary,
  what_happened,
  data_exposed,
  eligibility,
  disclaimer,
  sort_order
) values
(
  'chess-com-2026',
  'Chess.com',
  'https://logo.clearbit.com/chess.com',
  '#000000',
  '4.7M records',
  4700000,
  '2026-09-14',
  '2026-09-14',
  'A large Chess.com-related dataset was reported with an estimated 4.7M rows.',
  'A Chess.com-related scrape/breach dataset surfaced in September 2026. Exposed records may include account-linked identifiers from people who used Chess.com.',
  'Email addresses and related account identifiers may appear in this dataset. Exact fields vary by record.',
  'If you have ever created a Chess.com account or used an email with Chess.com, search that email on Leekify to see whether it appears in this breach.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice. Always change passwords and enable 2FA on affected accounts.',
  10
),
(
  'microsoft-2026',
  'Microsoft',
  'https://logo.clearbit.com/microsoft.com',
  '#00A4EF',
  '4M records',
  4000000,
  '2026-07-26',
  '2026-08-09',
  'A Microsoft-linked breach dataset was reported with an estimated 4M rows.',
  'A Microsoft-related breach dataset was reported in mid-2026. If your Microsoft, Outlook, Hotmail, or work M365 email was exposed elsewhere, it may appear in related dumps.',
  'Email addresses and associated identity fields may be included. Field coverage can differ across records.',
  'Search any Microsoft-linked email on Leekify to check whether it shows up in this or related breaches.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  20
),
(
  'frontier-airlines-2026',
  'Frontier Airlines',
  'https://logo.clearbit.com/flyfrontier.com',
  '#1E1E1E',
  '3M records',
  3000000,
  '2026-07-26',
  '2026-08-09',
  'A Frontier Airlines breach dataset was reported with an estimated 3M rows.',
  'Frontier Airlines customer data was reported in a 2026 breach dataset. Travelers who booked with Frontier may have personal details in exposed records.',
  'Emails, booking-related identifiers, and other personal data may be present depending on the record.',
  'If you have flown Frontier or used an email for Frontier bookings, check that email on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  30
),
(
  'virta-health-2026',
  'Virta Health',
  'https://logo.clearbit.com/virtahealth.com',
  '#0B3D2E',
  '437k records',
  437000,
  '2026-04-01',
  '2026-09-16',
  'A Virta Health breach dataset was reported with an estimated 437k rows.',
  'Virta Health patient/customer data was reported in a 2026 breach dataset. Health-related services can expose sensitive contact and account details when breached.',
  'Email addresses and related personal identifiers may appear. Treat any match as a signal to secure accounts.',
  'If you used Virta Health with your email, search it on Leekify to see if it appears in this breach.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice. Health data exposure may warrant additional caution.',
  40
),
(
  'payup-2026',
  'PayUp',
  'https://logo.clearbit.com/payup.com',
  '#111827',
  '289k records',
  289000,
  '2026-08-19',
  '2026-09-10',
  'A PayUp breach dataset was reported with an estimated 289k rows.',
  'PayUp-related records were reported in an August 2026 breach dataset. Users of the service may have emails and account data exposed.',
  'Email addresses and account-related fields may be included.',
  'If you signed up for PayUp, check the email you used on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  50
),
(
  'arizona-state-university-asu-2026',
  'Arizona State',
  'https://logo.clearbit.com/asu.edu',
  '#8C1D40',
  '1.1M records',
  1100000,
  '2026-08-17',
  '2026-09-08',
  'An Arizona State University (ASU) breach dataset was reported with an estimated 1.1M rows.',
  'Arizona State University data was reported in an August 2026 breach dataset. Students, alumni, staff, or applicants may be affected.',
  'University-related emails and personal identifiers may appear in exposed rows.',
  'If you used an ASU or personal email with Arizona State, search it on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  60
),
(
  'vimeo-2026',
  'Vimeo',
  'https://logo.clearbit.com/vimeo.com',
  '#1AB7EA',
  '122k records',
  122000,
  '2026-04-28',
  '2026-05-07',
  'A Vimeo breach dataset was reported with an estimated 122k rows.',
  'Vimeo-related account data was reported in a 2026 breach dataset. Creators and viewers with Vimeo accounts may have emails exposed.',
  'Email addresses and related account identifiers may be included.',
  'If you have a Vimeo account, check that email on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  70
),
(
  'udemy-2026',
  'Udemy',
  'https://logo.clearbit.com/udemy.com',
  '#A435F0',
  '1.4M records',
  1400000,
  '2026-04-24',
  '2026-04-29',
  'A Udemy breach dataset was reported with an estimated 1.4M rows.',
  'Udemy user data was reported in an April 2026 breach dataset. Learners and instructors may have account emails exposed.',
  'Email addresses and related learning-account fields may appear.',
  'If you took or taught courses on Udemy, search your Udemy email on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  80
)
on conflict (slug) do update set
  organization = excluded.organization,
  logo_url = excluded.logo_url,
  logo_bg = excluded.logo_bg,
  rows_label = excluded.rows_label,
  rows_count = excluded.rows_count,
  breach_date = excluded.breach_date,
  added_at = excluded.added_at,
  summary = excluded.summary,
  what_happened = excluded.what_happened,
  data_exposed = excluded.data_exposed,
  eligibility = excluded.eligibility,
  disclaimer = excluded.disclaimer,
  sort_order = excluded.sort_order,
  is_published = true,
  updated_at = now();
