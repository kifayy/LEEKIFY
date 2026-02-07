-- Seed example scholarships (safe to run multiple times)
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
