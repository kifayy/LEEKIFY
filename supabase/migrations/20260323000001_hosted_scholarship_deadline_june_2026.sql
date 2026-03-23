-- Set PathPicker Excellence deadline to June 23, 2026
update public.hosted_scholarships
set deadline = '2026-06-23T23:59:59Z'::timestamptz
where slug = 'pathpicker-excellence-2026'
   or (
     is_active = true
     and lower(title) like '%pathpicker excellence%'
   );
