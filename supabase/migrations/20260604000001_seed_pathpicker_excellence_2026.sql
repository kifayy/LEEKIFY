-- Ensure PathPicker Excellence 2026 apply page has an active hosted scholarship row
insert into public.hosted_scholarships (
  slug,
  title,
  description,
  amount,
  deadline,
  form_schema,
  is_active
) values (
  'pathpicker-excellence-2026',
  'PathPicker Excellence Award 2026',
  'Awarded to students who demonstrate strong potential. Apply with your profile and a short response.',
  '$3,100',
  '2026-06-23T23:59:59Z'::timestamptz,
  '{
    "fields": [
      {"key": "full_name", "label": "Full Name", "type": "text", "required": true},
      {"key": "email", "label": "Email Address", "type": "email", "required": true},
      {"key": "grade_level", "label": "Grade Level", "type": "select", "required": true, "options": ["High School (9th)", "High School (10th)", "High School (11th)", "High School (12th)", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate Student"]},
      {"key": "school_name", "label": "School Name", "type": "text", "required": false},
      {"key": "gpa", "label": "GPA (optional)", "type": "text", "required": false},
      {"key": "state", "label": "State", "type": "text", "required": false}
    ]
  }'::jsonb,
  true
) on conflict (slug) do update set
  title = excluded.title,
  amount = excluded.amount,
  deadline = excluded.deadline,
  is_active = true,
  updated_at = now();
