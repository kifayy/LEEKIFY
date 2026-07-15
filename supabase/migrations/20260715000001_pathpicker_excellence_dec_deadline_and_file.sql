-- PathPicker Excellence: deadline Dec 31 2026 + required supporting PDF on form
-- Private bucket for application document uploads (service role only)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'scholarship-applications',
  'scholarship-applications',
  false,
  5242880, -- 5 MB
  array['application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No public storage policies: uploads/downloads use service role only.

update public.hosted_scholarships
set
  deadline = '2026-12-31T23:59:59Z'::timestamptz,
  description = 'Awarded to students who demonstrate strong potential. Apply with your profile and upload a supporting PDF document.',
  form_schema = '{
    "fields": [
      {"key": "full_name", "label": "Full Name", "type": "text", "required": true},
      {"key": "email", "label": "Email Address", "type": "email", "required": true},
      {"key": "grade_level", "label": "Grade Level", "type": "select", "required": true, "options": ["High School (9th)", "High School (10th)", "High School (11th)", "High School (12th)", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate Student"]},
      {"key": "school_name", "label": "School Name", "type": "text", "required": false},
      {"key": "gpa", "label": "GPA (optional)", "type": "text", "required": false},
      {"key": "state", "label": "State", "type": "text", "required": false},
      {"key": "supporting_document", "label": "Supporting Document (PDF)", "type": "file", "required": true, "accept": ".pdf,application/pdf"}
    ]
  }'::jsonb,
  updated_at = now()
where slug = 'pathpicker-excellence-2026'
   or (
     is_active = true
     and lower(title) like '%pathpicker excellence%'
   );
