-- Allow any file type for scholarship application uploads (remove PDF-only MIME filter)

update storage.buckets
set allowed_mime_types = null
where id = 'scholarship-applications';

update public.hosted_scholarships
set
  description = 'Awarded to students who demonstrate strong potential. Apply with your profile and upload a supporting document.',
  form_schema = '{
    "fields": [
      {"key": "full_name", "label": "Full Name", "type": "text", "required": true},
      {"key": "email", "label": "Email Address", "type": "email", "required": true},
      {"key": "grade_level", "label": "Grade Level", "type": "select", "required": true, "options": ["High School (9th)", "High School (10th)", "High School (11th)", "High School (12th)", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate Student"]},
      {"key": "school_name", "label": "School Name", "type": "text", "required": false},
      {"key": "gpa", "label": "GPA (optional)", "type": "text", "required": false},
      {"key": "state", "label": "State", "type": "text", "required": false},
      {"key": "supporting_document", "label": "Supporting Document", "type": "file", "required": true}
    ]
  }'::jsonb,
  updated_at = now()
where slug = 'pathpicker-excellence-2026'
   or (
     is_active = true
     and lower(title) like '%pathpicker excellence%'
   );
