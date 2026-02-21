# Post–Vercel transfer checklist (new org)

After moving this project to a different Vercel organization, use this as a quick check.

## 1. Check if Supabase is still linked

- In the **Vercel** project: **Settings → Integrations**.
- If the **Supabase** integration still shows as connected and env vars are present, you’re good—the link often survives an org transfer.
- Only if the integration is missing or disconnected: reinstall the Supabase integration and reconnect your Supabase project.

## 2. Confirm environment variables

- **Settings → Environment Variables** in Vercel.
- Check that all required vars are present for the new project (e.g. `NEXT_PUBLIC_SITE_URL`, Supabase keys, any secrets).
- Redeploy if you had to re-add variables so new builds use them.

## 3. (Optional) Micro compute upgrade

- In **Supabase**: **Project Settings → Compute & Disk**.
- If the project is under a paid org, you can manually trigger the **Micro** compute upgrade as mentioned in the transfer notice.

## 4. Redeploy

- Trigger a new deployment (e.g. push a commit or **Deployments → Redeploy**).
- Confirm the site works and that the app can talk to Supabase (e.g. scholarships, articles load).

---

**Note:** Vercel’s transfer message says the linked storage/integration will be removed, but in practice the Supabase link and env vars often stay intact when you only move the project between orgs. Check Integrations and env vars first; only reconnect if something is missing.
