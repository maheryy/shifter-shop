module "secret_manager" {
  source  = "GoogleCloudPlatform/secret-manager/google"
  version = "~> 0.1"

  project_id = var.project_id

  secrets = [
    {
      name                  = "jwt-secret"
      automatic_replication = true
      secret_data           = var.jwt_secret
    },
    {
      name                  = "stripe-private-key"
      automatic_replication = true
      secret_data           = var.stripe_private_key
    },
    {
      name                  = "stripe-public-key"
      automatic_replication = true
      secret_data           = var.stripe_public_key
    },
    {
      name                  = "stripe-webhook-key"
      automatic_replication = true
      secret_data           = var.stripe_webhook_key
    },
    {
      name                  = "database-url"
      automatic_replication = true
      secret_data           = var.database_url
    },
    {
      name                  = "mailer-dsn"
      automatic_replication = true
      secret_data           = var.mailer_dsn
    },
  ]
}
