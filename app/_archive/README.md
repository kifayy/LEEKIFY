# Archived pages

Pages here are not routed (Next.js ignores `_`-prefixed folders). Restore by moving the folder back under `app/` and re-adding any nav/links.

## scholarship-quiz

- **Saved:** `scholarship-quiz/page.tsx`
- **To restore:** Move `app/_archive/scholarship-quiz/` to `app/scholarship-quiz/`, then:
  - Add `{ href: "/scholarship-quiz", label: "Scholarship Quiz" }` to header nav (`components/site-header.tsx`) and footer Product links (`components/site-footer.tsx`)
  - Add `/scholarship-quiz` to `app/sitemap.ts`
  - Update any CTAs that were changed to `/scholarships` back to `/scholarship-quiz` (desktop hero, hero-quiz-cards, enter-scholarships-section, article page “Browse scholarships” link)
