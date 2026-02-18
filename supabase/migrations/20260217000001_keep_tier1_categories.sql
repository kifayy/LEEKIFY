-- Keep only Tier 1 SEO categories: By Major, By State, By Grade Level, Easy to Win, By Ethnicity, By Amount

-- 1. Nullify scholarships_page references to categories we're deleting (avoid FK violation)
update public.scholarships_page
set category_id = null,
    category_slug = null
where category_slug in (
  'by-city', 'by-gender', 'by-gpa', 'by-deadline', 'by-type',
  'by-sport', 'by-interest', 'by-career-goal', 'by-school-type',
  'by-military', 'by-disability', 'by-religion', 'by-first-generation',
  'by-international'
);

-- 2. Delete non-Tier-1 categories
delete from public.scholarship_categories
where slug in (
  'by-city', 'by-gender', 'by-gpa', 'by-deadline', 'by-type',
  'by-sport', 'by-interest', 'by-career-goal', 'by-school-type',
  'by-military', 'by-disability', 'by-religion', 'by-first-generation',
  'by-international'
);

-- 3. Update display_order for remaining Tier 1 categories
update public.scholarship_categories set display_order = 1 where slug = 'by-major';
update public.scholarship_categories set display_order = 2 where slug = 'by-state';
update public.scholarship_categories set display_order = 3 where slug = 'by-grade-level';
update public.scholarship_categories set display_order = 4 where slug = 'easy-to-win';
update public.scholarship_categories set display_order = 5 where slug = 'by-ethnicity';
update public.scholarship_categories set display_order = 6 where slug = 'by-amount';
