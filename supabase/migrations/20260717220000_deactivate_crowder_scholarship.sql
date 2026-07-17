-- Deactivate duplicate Crowder row; PEN is the live scholarship
update public.hosted_scholarships
set is_active = false, updated_at = now()
where slug = 'crowder-scholarship';
