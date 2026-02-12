-- Set category_slug and filter_field for existing articles
update public.scholarships_page
set category_slug = 'by-major', filter_field = 'stem', filter_type = 'major'
where slug = 'best-stem-scholarships';
