# Leekify | Internal Product Specification & Backend Architecture

> Internal use only. PathPicker schema, migrations, and product surfaces are retired. Leekify is greenfield on Supabase project `cigpftkwxfokqapbykzd`.

---

## 1. Executive Summary & Brand Identity

Leekify is a consumer-facing cybersecurity and data breach intelligence platform designed to replace legacy lookups with an actionable, conversion-optimized privacy engine. While traditional tools stop at basic passive indexing, Leekify pairs real-time personal exposure discovery with high-urgency remediation, class-action settlement tracking, and continuous identity monitoring.

### SEO & Metadata Configuration

| Field | Value |
|-------|--------|
| **SEO Page Title** | Leekify \| See If Your Data Was Leaked |
| **Meta Description** | Find out if your personal information was compromised in data breaches. Search your email on leekify.com to see where your data was leaked and learn what to do. |
| **Target URL** | https://leekify.com |
| **Market Category** | Consumer Cybersecurity, Identity Threat Monitoring, Class-Action Claim Intelligence |

---

## 2. Product Features

| Feature | User value |
|---------|------------|
| **Full exposure ledger (unblurred leaks)** | Curiosity/fear: see exact stolen data. |
| **Watch 3 IDs (email, phone)** | Coverage: tracks primary, secondary, mobile. |
| **Real-time text/email breach alerts** | Panic prevention: know before hackers strike. |
| **Settlement notifications for leaked brands** | Upside: get notified of company payout windows. |
| **24/7 Data Monitoring** | Anti-churn: proves subscription is working. |
| **Exportable PDF digital risk report** | Tangible value: flex/store a score. |

---

## 3. Product Surfaces (Marketing Shell)

Current Next.js app keeps the PathPicker **visual shell** (home, pricing, contact, legal) with Leekify branding and copy. PathPicker product routes (browse, schools, discover, apply, quiz, etc.) redirect to `/`.

Planned product flows (to build against this spec):

1. **Public email search** — guest enters email → exposure ledger preview (blurred → unblurred behind conversion).
2. **Account + watches** — auth; up to 3 monitored identifiers (email / phone).
3. **Alerts** — email + SMS when new breaches or settlements match watches.
4. **Dashboard** — 24/7 monitoring status, ledger, risk score, PDF export.
5. **Billing** — subscription gate for full ledger, multi-ID watch, PDF, SMS.

---

## 4. Backend Architecture (Target)

**Project:** `cigpftkwxfokqapbykzd` (`https://cigpftkwxfokqapbykzd.supabase.co`)  
**Stack:** Next.js App Router + `@supabase/ssr` + Postgres (RLS) + Edge/server actions for search & alerts.

### 4.1 Core domains

```
Auth (Supabase Auth)
  └── profiles
        ├── identity_watches (max 3: email / phone)
        ├── subscriptions / entitlements
        ├── exposure_ledger_views (per-user resolved hits)
        ├── alert_preferences + alert_delivery_log
        ├── settlement_subscriptions / settlement_notifications
        └── risk_reports (PDF metadata + storage paths)
```

### 4.2 Proposed tables (greenfield — not applied yet)

| Table | Purpose |
|-------|---------|
| `profiles` | User profile linked to `auth.users`; plan tier; risk score cache |
| `identity_watches` | Up to 3 IDs per user (`email` \| `phone`); normalized hash for lookup |
| `breach_sources` | Catalog of known breaches / dumps (name, date, brands, fields) |
| `breach_records` | Indexed exposure rows (hashed identifier → breach + field payload refs) |
| `exposure_hits` | Resolved matches for a watch or guest search session |
| `guest_search_sessions` | Rate-limited anonymous email lookups; conversion funnel |
| `alert_channels` | Email / SMS endpoints verified for a user |
| `alert_events` | Queued / sent breach or settlement alerts |
| `settlements` | Class-action / brand payout windows tied to breach sources |
| `settlement_notifications` | User-facing settlement alerts |
| `risk_reports` | Generated PDF digital risk reports (Blob/Storage path, score, generated_at) |
| `api_rate_limits` | Abuse protection for search / alert verify / report export |

### 4.3 APIs / server responsibilities (planned)

| Endpoint / action | Behavior |
|-------------------|----------|
| `POST /api/search` | Normalize email → hash → lookup hits → return ledger (blurred if free) |
| Watch CRUD | Enforce max 3 IDs; rehash on write; kick monitoring job |
| Alert worker | Poll new `breach_records` / settlements → match watches → send email/SMS |
| `POST /api/reports/pdf` | Entitlement check → assemble risk report → store PDF → return URL |
| Rate limits | IP + identifier buckets via `api_rate_limits` RPC |

### 4.4 Security principles

- RLS on all public-schema tables; service role only for ingestion workers and report generation.
- Never store raw passwords from dumps in cleartext in app DB; store field-level exposure metadata and controlled reveal payloads behind entitlement.
- Hash watched identifiers at rest for matching; show plaintext only to the owning authenticated user (or gated guest session).
- Publishable key in browser; service role server-only.
- Rate-limit guest search aggressively.

### 4.5 Data ingestion (later)

- Batch/stream breach intelligence into `breach_sources` + `breach_records`.
- Settlement scrapers / partner feeds → `settlements`.
- Monitoring cron proves “24/7” with last-check timestamps on watches.

---

## 5. Retired: PathPicker

Do **not** migrate PathPicker tables (`colleges`, `scholarships`, `hosted_scholarships`, `intent_pages`, etc.) to Leekify. Repo migrations and PathPicker query/API layers are deleted. New schema starts empty on `cigpftkwxfokqapbykzd`.

---

## 6. Environment

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://leekify.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cigpftkwxfokqapbykzd.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser / SSR publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only (search admin, reports, workers) — add when backend ships |

---

## 7. Implementation status

| Area | Status |
|------|--------|
| Marketing shell rebrand (home, pricing, contact, legal) | Done |
| PathPicker routes redirected + backend deleted | Done |
| RapidAPI email breach search (`POST /api/breach/search`) | Live — sensitive values redacted server-side |
| Leekify schema on Supabase | **Not applied yet** (this document is the blueprint) |
| Watches / alerts / PDF / settlements | **Not built yet** |
