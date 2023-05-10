resource "google_secret_manager_secret" "jwt_secret" {
  secret_id = "jwt-secret"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "jwt_secret_version" {
  secret = google_secret_manager_secret.jwt_secret.id

  secret_data = var.jwt_secret
}

resource "google_secret_manager_secret" "stripe_private_key" {
  secret_id = "stripe-private-key"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "stripe_private_key_version" {
  secret = google_secret_manager_secret.stripe_private_key.id

  secret_data = var.stripe_private_key
}


resource "google_secret_manager_secret" "stripe_public_key" {
  secret_id = "stripe-public-key"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "stripe_public_key_version" {
  secret = google_secret_manager_secret.stripe_public_key.id

  secret_data = var.stripe_public_key
}

resource "google_secret_manager_secret" "stripe_webhook_key" {
  secret_id = "stripe-webhook-key"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "stripe_webhook_key_version" {
  secret = google_secret_manager_secret.stripe_webhook_key.id

  secret_data = var.stripe_webhook_key
}

resource "google_secret_manager_secret" "database_url" {
  secret_id = "database-url"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_version" {
  secret = google_secret_manager_secret.database_url.id

  secret_data = var.database_url
}

resource "google_secret_manager_secret" "mailer_dsn" {
  secret_id = "mailer-dsn"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "mailer_dsn_version" {
  secret = google_secret_manager_secret.mailer_dsn.id

  secret_data = var.mailer_dsn
}




