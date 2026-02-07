-- Seed: Add tags to scholarships and create sample article with linked scholarships
-- Includes schema from 20260206000004 in case it wasn't applied

-- Ensure schema exists
alter table public.scholarships add column if not exists tags text[] default '{}';
alter table public.scholarships add column if not exists meta_description text;
create index if not exists idx_scholarships_tags on public.scholarships using gin(tags);

create table if not exists public.scholarship_article_scholarships (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.scholarships_page(id) on delete cascade,
  scholarship_id uuid not null references public.scholarships(id) on delete cascade,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  unique(article_id, scholarship_id)
);
create index if not exists idx_sas_article on public.scholarship_article_scholarships(article_id);
create index if not exists idx_sas_scholarship on public.scholarship_article_scholarships(scholarship_id);
alter table public.scholarship_article_scholarships enable row level security;
drop policy if exists "Allow public read on scholarship_article_scholarships" on public.scholarship_article_scholarships;
create policy "Allow public read on scholarship_article_scholarships"
  on public.scholarship_article_scholarships for select using (true);

alter table public.scholarships_page add column if not exists og_image text;
alter table public.scholarships_page add column if not exists canonical_url text;
alter table public.scholarships_page add column if not exists auto_tag text;

-- Seed example scholarships (if none exist)
insert into public.scholarships (title, provider, amount, deadline, is_featured, slug, content, image_url)
values
  (
    'Coca-Cola Scholars Program',
    'Coca-Cola Foundation',
    '$20,000',
    (current_date + interval '90 days')::timestamptz,
    true,
    'coca-cola-scholars',
    'The Coca-Cola Scholars Program is one of the largest corporate-sponsored, achievement-based scholarship programs in the United States. Recognizes 150 high school seniors each year.',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'
  ),
  (
    'Gates Scholarship',
    'Bill & Melinda Gates Foundation',
    'Full ride',
    (current_date + interval '60 days')::timestamptz,
    true,
    'gates-scholarship',
    'The Gates Scholarship is a highly selective, full scholarship for exceptional, Pell-eligible, minority, high school seniors. Covers full cost of attendance.',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600'
  ),
  (
    'Dell Scholars Program',
    'Michael & Susan Dell Foundation',
    '$20,000',
    (current_date + interval '45 days')::timestamptz,
    true,
    'dell-scholars',
    'Dell Scholars Program supports students who have overcome significant obstacles to pursue their education. Includes scholarship plus ongoing support services.',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600'
  ),
  (
    'Cameron Impact Scholarship',
    'Bryan Cameron Education Foundation',
    '$50,000',
    (current_date + interval '120 days')::timestamptz,
    true,
    'cameron-impact',
    'Four-year, full-tuition scholarship for students who demonstrate excellence in academics, leadership, and community service.',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600'
  ),
  (
    'QuestBridge National Match',
    'QuestBridge',
    'Full ride',
    (current_date + interval '30 days')::timestamptz,
    true,
    'questbridge-match',
    'Connects high-achieving, low-income students with full four-year scholarships to top colleges. Over 2,000 full scholarships awarded annually.',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600'
  )
on conflict (slug) do nothing;

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
