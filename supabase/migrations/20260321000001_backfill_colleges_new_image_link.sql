-- Default campus image for colleges without new_image_link (NULL, blank, or literal "null")
UPDATE public.colleges
SET new_image_link = 'https://storage.googleapis.com/images_592/pexels-armin-rimoldi-5553059.jpg'
WHERE new_image_link IS NULL
   OR trim(new_image_link) = ''
   OR lower(trim(new_image_link)) = 'null';
