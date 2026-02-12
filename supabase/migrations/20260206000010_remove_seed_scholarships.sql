-- Remove example/seed scholarships so only user-pasted scholarships remain
delete from public.scholarships
where slug in (
  'coca-cola-scholars',
  'gates-scholarship',
  'dell-scholars',
  'cameron-impact',
  'questbridge-match'
);
