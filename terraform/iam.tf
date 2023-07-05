resource "google_service_account" "shifter_shop_api" {
  account_id = "shifter-shop-api"
}

resource "google_project_iam_member" "shifter_shop_api_cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "jwt_secret_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.jwt_secret.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_private_key_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.stripe_private_key.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_public_key_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.stripe_public_key.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_key_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.stripe_webhook_key.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "database_url_users_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_users.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_products_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_products.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_categories_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_categories.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_reviews_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_reviews.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_orders_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_orders.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_cart_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_cart.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_profiles_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_profiles.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}
resource "google_secret_manager_secret_iam_member" "database_url_inventory_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.database_url_inventory.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "mailer_dsn_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.mailer_dsn.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_secret_manager_secret_iam_member" "amqp_url_iam_member" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.amqp_url.id
  member    = "serviceAccount:${google_service_account.shifter_shop_api.email}"
}

resource "google_service_account_iam_member" "shifter_shop_api_iam_member" {
  service_account_id = google_service_account.shifter_shop_api.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[default/shifter-shop-api]"
}
