-- Set hosted scholarship(s) deadline to March 20, 2026
update public.hosted_scholarships
set deadline = '2026-03-20T23:59:59Z'::timestamptz
where is_active = true;
