resource "google_service_account" "readonly_secrets" {
  account_id   = "readonly-secrets"
  display_name = "Read secrets"
}

module "secret_manager_iam" {
  source = "terraform-google-modules/iam/google//modules/secret_manager_iam"

  secrets = module.secret_manager.secret_names

  bindings = {
    "roles/secretmanager.secretAccessor" = [
      "serviceAccount:${google_service_account.readonly_secrets.email}"
    ]
  }
}

module "service_accounts_iam" {
  source = "terraform-google-modules/iam/google//modules/service_accounts_iam"

  service_accounts = [
    google_service_account.readonly_secrets.name
  ]

  bindings = {
    "roles/iam.workloadIdentityUser" = [
      "serviceAccount:${var.project_id}.svc.id.goog[default/readonly-secrets]"
    ]
  }
}
