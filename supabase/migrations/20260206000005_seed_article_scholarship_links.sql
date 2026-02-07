-- Seed: Add tags to scholarships and create sample article with linked scholarships
-- Run after 20260206000004

-- Add tags to existing scholarships (for "Best scholarships for STEM kids" demo)
update public.scholarships
set tags = array['stem', 'high-school', 'achievement']
where slug in ('coca-cola-scholars', 'gates-scholarship', 'dell-scholars', 'cameron-impact', 'questbridge-match');

-- Create sample article
insert into public.scholarships_page (
  title,
  slug,
  meta_title,
  meta_description,
  content,
  published_at,
  auto_tag
) values (
  'Best Scholarships for STEM Kids in 2025',
  'best-stem-scholarships',
  'Best STEM Scholarships for Kids 2025 | Pathpicker',
  'Curated list of top STEM scholarships for students. Apply to engineering, science, and tech scholarships with deadlines and amounts.',
  '<p>STEM scholarships help students pursue careers in science, technology, engineering, and math. Here are our top picks for 2025.</p>',
  now(),
  'stem'
)
on conflict (slug) do nothing;

-- Link scholarships to the article (by display_order)
insert into public.scholarship_article_scholarships (article_id, scholarship_id, display_order)
select
  (select id from public.scholarships_page where slug = 'best-stem-scholarships'),
  s.id,
  row_number() over (order by s.deadline nulls last) - 1
from public.scholarships s
where 'stem' = any(s.tags)
on conflict (article_id, scholarship_id) do nothing;
