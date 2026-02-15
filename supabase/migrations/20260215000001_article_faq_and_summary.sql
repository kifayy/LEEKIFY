-- Add FAQ (structured for FAQPage schema) and optional summary (answer-at-top) for AI-ready content template
alter table public.scholarships_page add column if not exists faq jsonb;
alter table public.scholarships_page add column if not exists summary text;

comment on column public.scholarships_page.faq is 'Array of { question, answer } for FAQ block and FAQPage schema';
comment on column public.scholarships_page.summary is '2-3 sentence answer at top of article (AI-overview friendly)';
