-- Categories: remove By Ethnicity and By Amount; rename By Grade Level → High School Students; add College Students

-- 1. Nullify articles that used removed categories
update public.scholarships_page
set category_id = null,
    category_slug = null
where category_slug in ('by-ethnicity', 'by-amount');

-- 2. Update existing by-grade-level articles to new slug before we rename the category
update public.scholarships_page
set category_slug = 'high-school-students'
where category_slug = 'by-grade-level';

-- 3. Rename By Grade Level → High School Students (same slug change)
update public.scholarship_categories
set name = 'High School Students',
    slug = 'high-school-students'
where slug = 'by-grade-level';

-- 4. Delete By Ethnicity and By Amount
delete from public.scholarship_categories
where slug in ('by-ethnicity', 'by-amount');

-- 5. Insert College Students
insert into public.scholarship_categories (name, slug, display_order)
values ('College Students', 'college-students', 4)
on conflict (slug) do update set
  name = excluded.name,
  display_order = excluded.display_order;

-- 6. Set display_order: by-major 1, by-state 2, high-school-students 3, college-students 4, easy-to-win 5
update public.scholarship_categories set display_order = 1 where slug = 'by-major';
update public.scholarship_categories set display_order = 2 where slug = 'by-state';
update public.scholarship_categories set display_order = 3 where slug = 'high-school-students';
update public.scholarship_categories set display_order = 4 where slug = 'college-students';
update public.scholarship_categories set display_order = 5 where slug = 'easy-to-win';
