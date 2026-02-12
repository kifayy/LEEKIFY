-- Extend scholarships table with raw schema columns for paste-in and AI filtering

alter table public.scholarships add column if not exists winners_picked_date date;
alter table public.scholarships add column if not exists description_short text;
alter table public.scholarships add column if not exists requirements_summary text;
alter table public.scholarships add column if not exists external_url text;
alter table public.scholarships add column if not exists trackable boolean;
alter table public.scholarships add column if not exists highlight_1 text;
alter table public.scholarships add column if not exists highlight_2 text;
alter table public.scholarships add column if not exists highlight_3 text;
alter table public.scholarships add column if not exists highlight_4 text;
alter table public.scholarships add column if not exists highlight_5 text;
alter table public.scholarships add column if not exists eligible_high_school boolean;
alter table public.scholarships add column if not exists eligible_college boolean;
alter table public.scholarships add column if not exists eligible_grad boolean;
alter table public.scholarships add column if not exists citizenship_required text;
alter table public.scholarships add column if not exists age_minimum text;
alter table public.scholarships add column if not exists num_awards text;
alter table public.scholarships add column if not exists apply_time_minutes text;
alter table public.scholarships add column if not exists priority text;
alter table public.scholarships add column if not exists last_verified date;
alter table public.scholarships add column if not exists field_of_study text;
alter table public.scholarships add column if not exists gpa_minimum text;
alter table public.scholarships add column if not exists degree_type_required text;
alter table public.scholarships add column if not exists residency_requirements text;
alter table public.scholarships add column if not exists is_monthly boolean;
alter table public.scholarships add column if not exists is_sweepstake boolean;
alter table public.scholarships add column if not exists by_us boolean;
alter table public.scholarships add column if not exists featured boolean;
alter table public.scholarships add column if not exists featured_images jsonb;
alter table public.scholarships add column if not exists custom_questions jsonb;
alter table public.scholarships add column if not exists mappings jsonb;
alter table public.scholarships add column if not exists autopilot boolean;

create index if not exists idx_scholarships_field_of_study on public.scholarships (field_of_study);
