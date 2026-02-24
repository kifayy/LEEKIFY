-- Remove image_url from scholarships; award/slug pages no longer show images.
ALTER TABLE public.scholarships DROP COLUMN IF EXISTS image_url;
