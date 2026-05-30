# College hero image upload (my.pathpicker.com)

Use [`lib/college-image-upload-constraints.ts`](../lib/college-image-upload-constraints.ts) in the dashboard upload pipeline.

## Rules

| Constraint | Value |
|------------|-------|
| Max dimension | 1200px (width or height, `fit: inside`) |
| Encode quality | 80 (WebP preferred) |
| Target size | ~80–150 KB |
| Hard reject | > 512 KB |

## Integration

1. Import `validateCollegeHeroFileSize`, `COLLEGE_HERO_MAX_DIMENSION_PX`, and `COLLEGE_HERO_ENCODE_QUALITY`.
2. Before GCS upload, resize with Sharp (see example in the constraints module).
3. Store the public URL in `colleges.new_image_link`.
4. Set object metadata on upload: `Cache-Control: public, max-age=31536000, immutable`.

## Audit scripts (this repo)

```bash
# Flag oversized heroes and weak cache headers
node scripts/audit-college-hero-images.mjs

# Compare GCS bucket objects vs Supabase URLs (orphans + oversized)
node scripts/gcs-bucket-audit.mjs --bucket=pathpicker
node scripts/gcs-bucket-audit.mjs --bucket=images_592
```

## GCS cache headers (one-time / after bulk upload)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/gcs-set-cache-headers.ps1
```
