resource "google_service_account" "readonly_secrets" {
  account_id   = "readonly-secrets"
  display_name = "Read secrets"
}

resource "google_secret_manager_secret_iam_member" "jwt_secret_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.jwt_secret.id
  member    = "serviceAccount:${google_service_account.readonly_secrets.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_private_key_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.stripe_private_key.id
  member    = "serviceAccount:${google_service_account.readonly_secrets.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_public_key_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.stripe_public_key.id
  member    = "serviceAccount:${google_service_account.readonly_secrets.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_key_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.stripe_webhook_key.id
  member    = "serviceAccount:${google_service_account.readonly_secrets.email}"
}

resource "google_secret_manager_secret_iam_member" "database_url_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url.id
  member    = "serviceAccount:${google_service_account.readonly_secrets.email}"
}

resource "google_secret_manager_secret_iam_member" "mailer_dsn_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.mailer_dsn.id
  member    = "serviceAccount:${google_service_account.readonly_secrets.email}"
}

resource "google_service_account_iam_member" "readonly_secrets_member" {
  service_account_id = google_service_account.readonly_secrets.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[default/readonly-secrets]"
}
