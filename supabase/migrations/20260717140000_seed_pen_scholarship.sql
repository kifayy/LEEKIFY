-- PEN Scholarship — same hosted_scholarships table as Excellence
insert into public.hosted_scholarships (
  slug,
  title,
  description,
  amount,
  deadline,
  form_schema,
  is_active
) values (
  'pen-scholarship',
  'PEN Scholarship - Spring 2027 Application',
  'Apply with your profile, essay, transcript, and supporting documents for the PEN Scholarship.',
  null,
  '2027-05-31T23:59:59Z'::timestamptz,
  '{
    "fields": [
      {"key": "first_name", "label": "First Name", "type": "text", "required": true},
      {"key": "last_name", "label": "Last Name", "type": "text", "required": true},
      {"key": "email", "label": "Email", "type": "email", "required": true},
      {"key": "phone", "label": "Phone", "type": "tel", "required": true, "placeholder": "123-456-7890"},
      {"key": "applicant_birthdate", "label": "Applicant Birthdate", "type": "date", "required": true},
      {"key": "citizenship", "label": "Citizenship", "type": "select", "required": true, "placeholder": "Select Citizenship", "options": ["United States Citizen", "Permanent Resident", "International Student", "Other"]},
      {"key": "city", "label": "City", "type": "text", "required": true},
      {"key": "state", "label": "State", "type": "select", "required": true, "placeholder": "Select State", "options": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]},
      {"key": "country", "label": "Country", "type": "select", "required": true, "placeholder": "Select Country", "options": ["United States", "Canada", "Mexico", "United Kingdom", "Australia", "India", "China", "Philippines", "Nigeria", "Germany", "France", "Brazil", "Japan", "South Korea", "Other"]},
      {"key": "college_name", "label": "College Name", "type": "text", "required": true},
      {"key": "school_level", "label": "School Level", "type": "select", "required": true, "placeholder": "Select School Level", "options": ["High School Senior", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate Student"]},
      {"key": "gpa", "label": "GPA", "type": "select", "required": true, "placeholder": "Select GPA", "options": ["Below 2.0", "2.0 – 2.49", "2.5 – 2.99", "3.0 – 3.49", "3.5 – 3.99", "4.0+"]},
      {"key": "enrolled_in_college", "label": "Enrolled In College", "type": "radio", "required": true, "options": ["No", "Yes"]},
      {"key": "applicant_headshot", "label": "Applicant Headshot", "type": "file", "required": true, "accept": ".png,.jpeg,.jpg,image/png,image/jpeg", "helpText": "Supported formats: .png, .jpeg, .jpg."},
      {"key": "essay_upload", "label": "Essay Upload", "type": "file", "required": true, "accept": ".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document", "helpText": "Applicants must submit an essay of approximately 1000 words to apply for this scholarship: How do you define the American Dream? Do you believe it is attainable today?"},
      {"key": "academic_transcript", "label": "Academic Transcript", "type": "file", "required": true, "accept": ".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document", "helpText": "You must submit your most recently received academic transcript indicating your cumulative GPA and year in school."},
      {"key": "proof_of_enrollment", "label": "Proof Of Enrollment", "type": "file", "required": false, "accept": ".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document", "helpText": "If your most recent transcript does not indicate your enrollment in an accredited U.S. college or university, you must upload a document such as an enrollment confirmation letter, class schedule, etc., that confirms your enrollment."},
      {"key": "consent_to_publish", "label": "Consent To Publish", "type": "checkbox", "required": true, "helpText": "By submitting your application, you consent that your name, photograph, and essay may be published on our website, social media, and other marketing channels."},
      {"key": "disclaimer", "label": "Disclaimer", "type": "checkbox", "required": true, "helpText": "I confirm that none of the documentation included in my application includes any personally identifiable or private information, such as social security numbers or credit card numbers."},
      {"key": "agree_to_terms", "label": "Agree To Terms", "type": "checkbox", "required": true, "helpText": "You agree to the Privacy Policy."}
    ]
  }'::jsonb,
  true
) on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  amount = excluded.amount,
  deadline = excluded.deadline,
  form_schema = excluded.form_schema,
  is_active = true,
  updated_at = now();
