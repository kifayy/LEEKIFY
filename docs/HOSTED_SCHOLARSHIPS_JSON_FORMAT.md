# Hosted Scholarships – Form Schema & Answers JSON Format

PathPicker's hosted scholarships use a **flexible JSON form schema** so each scholarship can have different intake fields. Student answers are stored in a matching key-value format for easy export.

---

## 1. Form Schema (`form_schema` in `hosted_scholarships`)

Defines which fields appear on the intake form. Change per scholarship.

```json
{
  "fields": [
    {
      "key": "full_name",
      "label": "Full Name",
      "type": "text",
      "required": true
    },
    {
      "key": "email",
      "label": "Email Address",
      "type": "email",
      "required": true
    },
    {
      "key": "grade_level",
      "label": "Grade Level",
      "type": "select",
      "required": true,
      "options": ["High School (9th)", "High School (10th)", "College Freshman", "College Sophomore", "College Junior", "College Senior", "Graduate Student"]
    },
    {
      "key": "school_name",
      "label": "School Name",
      "type": "text",
      "required": false
    },
    {
      "key": "intended_major",
      "label": "Intended or Current Major",
      "type": "text",
      "required": false
    },
    {
      "key": "gpa",
      "label": "GPA (optional)",
      "type": "text",
      "required": false
    },
    {
      "key": "state",
      "label": "State",
      "type": "text",
      "required": false
    },
    {
      "key": "essay",
      "label": "Why do you deserve this scholarship?",
      "type": "textarea",
      "required": false,
      "maxLength": 1000
    }
  ]
}
```

### Field Types

| `type`    | Description                    |
|-----------|--------------------------------|
| `text`    | Single-line text               |
| `email`   | Email with validation          |
| `tel`     | Phone number                   |
| `select`  | Dropdown (requires `options`)  |
| `textarea`| Multi-line text                |
| `number`  | Numeric input                  |
| `date`    | Date picker                    |

### Optional Properties

- `placeholder` – Input placeholder text  
- `maxLength` – Max characters (e.g. for `textarea`)  
- `options` – Array of strings (required for `type: "select"`)

---

## 2. Answers (`answers` in `hosted_scholarship_submissions`)

Student responses as key-value pairs. Keys must match `form_schema` field keys.

```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "grade_level": "College Freshman",
  "school_name": "State University",
  "intended_major": "Computer Science",
  "gpa": "3.8",
  "state": "CA",
  "essay": "I have been passionate about technology since..."
}
```

---

## 3. Export to Providers

Use `getSubmissionsForExport` (requires `SUPABASE_SERVICE_ROLE_KEY`) and `submissionsToExportRows`:

```ts
import {
  getHostedScholarshipBySlug,
  getSubmissionsForExport,
  submissionsToExportRows,
} from "@/lib/supabase/queries/hosted-scholarships";

const scholarship = await getHostedScholarshipBySlug("my-scholarship");
if (!scholarship) return;
const submissions = await getSubmissionsForExport(scholarship.id);
const rows = submissionsToExportRows(submissions, scholarship.form_schema);
// rows: { id, created_at, full_name, email, grade_level, ... }[]
// Write to CSV or send to provider API
```

Keys in `answers` are dynamic and driven by `form_schema`, so the export adapts when you change the schema.

---

## 4. Recommended Fields for Most Scholarships

| Key             | Label                      | Type     | Notes                         |
|-----------------|----------------------------|----------|-------------------------------|
| `full_name`     | Full Name                  | text     | Required                      |
| `email`         | Email Address              | email    | Required                      |
| `grade_level`   | Grade Level                | select   | Options per your segments     |
| `school_name`   | School Name                | text     | Optional                      |
| `intended_major`| Intended / Current Major   | text     | Optional                      |
| `gpa`           | GPA                        | text     | Optional                      |
| `state`         | State                      | text     | Optional                      |
| `essay`         | Short response / essay     | textarea | Per-scholarship wording       |

Add or remove fields per scholarship by editing `form_schema` in the DB or admin UI.
