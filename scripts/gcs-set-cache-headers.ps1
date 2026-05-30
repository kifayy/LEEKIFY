# Set long-lived Cache-Control on all public objects in PathPicker GCS buckets.
# Run once after upload pipeline changes, or when new objects are added without metadata.
# Requires: gcloud auth login && gsutil configured for the project.

$ErrorActionPreference = "Stop"
$CacheControl = "Cache-Control:public, max-age=31536000, immutable"
$Buckets = @("gs://images_592", "gs://pathpicker")

foreach ($bucket in $Buckets) {
  Write-Host "Setting cache headers on $bucket ..."
  gsutil -m setmeta -h $CacheControl -r $bucket/**
  Write-Host "Done: $bucket"
}

Write-Host "All buckets updated."
