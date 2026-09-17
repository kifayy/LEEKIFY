-- Additional breaches shown after the initial carousel set (higher sort_order).
insert into public.recent_breaches (
  slug, organization, logo_url, logo_bg, rows_label, rows_count, breach_date, added_at,
  summary, what_happened, data_exposed, eligibility, disclaimer, sort_order, is_published
) values
(
  'osmo-wallet-2026', 'Osmo Wallet', '/images/breaches/osmo-wallet.png', '#111827', '230k records', 230000, '2026-08-10', '2026-09-02',
  'An Osmo Wallet breach dataset was reported with an estimated 230k rows.',
  'Osmo Wallet-related account data was reported in an August 2026 breach dataset. Crypto wallet users may have emails and account identifiers exposed.',
  'Email addresses and wallet-related account identifiers may appear.',
  'If you used Osmo Wallet with an email address, search it on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  90, true
),
(
  'restaurant-depot-2026', 'Restaurant Depot', '/images/breaches/restaurant-depot.png', '#FFFFFF', '3.7M records', 3700000, '2026-07-23', current_date,
  'A Restaurant Depot breach dataset was reported with an estimated 3.7M rows.',
  'Restaurant Depot customer or member data was reported in a July 2026 breach dataset. Business customers who shopped with Restaurant Depot may be affected.',
  'Emails and membership-related identifiers may be included.',
  'If you have a Restaurant Depot membership email, check it on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  100, true
),
(
  'carhartt-2026', 'Carhartt', '/images/breaches/carhartt.png', '#000000', '4.1M records', 4100000, '2026-08-13', current_date,
  'A Carhartt breach dataset was reported with an estimated 4.1M rows.',
  'Carhartt, Inc. customer data was reported in an August 2026 breach dataset. Online shoppers and account holders may have emails exposed.',
  'Email addresses and account-related fields may appear.',
  'If you shopped at Carhartt online or created an account, search that email on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  110, true
),
(
  'uber-freight-2026', 'Uber Freight', '/images/breaches/uber-freight.png', '#000000', '5.4M records', 5400000, '2026-08-07', current_date,
  'An Uber Freight breach dataset was reported with an estimated 5.4M rows.',
  'Uber Freight-related data was reported in an August 2026 breach dataset. Carriers, shippers, or drivers connected to Uber Freight may be affected.',
  'Emails and logistics-account identifiers may be included.',
  'If you used Uber Freight with an email, check it on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  120, true
),
(
  'allstate-2026', 'Allstate', '/images/breaches/allstate.png', '#0033A0', '940k records', 940000, '2026-07-26', '2026-08-09',
  'An Allstate breach dataset was reported with an estimated 940k rows.',
  'Allstate-related customer data was reported in a July 2026 breach dataset. Policyholders or quote seekers may have personal details exposed.',
  'Emails and insurance-related identifiers may appear.',
  'If you are an Allstate customer or requested a quote by email, search it on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  130, true
),
(
  'bonava-2026', 'Bonava', '/images/breaches/bonava.png', '#FFFFFF', '526k records', 526000, '2026-07-26', current_date,
  'A Bonava breach dataset was reported with an estimated 526k rows.',
  'Bonava-related customer or resident data was reported in a July 2026 breach dataset.',
  'Emails and related personal identifiers may be included.',
  'If you interacted with Bonava using an email, check it on Leekify.',
  'Leekify aggregates publicly reported breach intelligence for awareness. Results are informational and not legal advice.',
  140, true
)
on conflict (slug) do update set
  organization = excluded.organization,
  logo_url = excluded.logo_url,
  logo_bg = excluded.logo_bg,
  rows_label = excluded.rows_label,
  rows_count = excluded.rows_count,
  breach_date = excluded.breach_date,
  summary = excluded.summary,
  what_happened = excluded.what_happened,
  data_exposed = excluded.data_exposed,
  eligibility = excluded.eligibility,
  disclaimer = excluded.disclaimer,
  sort_order = excluded.sort_order,
  is_published = true,
  updated_at = now();
