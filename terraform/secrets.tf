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

resource "google_secret_manager_secret" "database_url_users" {
  secret_id = "database-url-users"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_users_version" {
  secret = google_secret_manager_secret.database_url_users.id

  secret_data = var.database_url_users
}

resource "google_secret_manager_secret" "database_url_products" {
  secret_id = "database-url-products"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_products_version" {
  secret = google_secret_manager_secret.database_url_products.id

  secret_data = var.database_url_products
}

resource "google_secret_manager_secret" "database_url_categories" {
  secret_id = "database-url-categories"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_categories_version" {
  secret = google_secret_manager_secret.database_url_categories.id

  secret_data = var.database_url_categories
}

resource "google_secret_manager_secret" "database_url_reviews" {
  secret_id = "database-url-reviews"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_reviews_version" {
  secret = google_secret_manager_secret.database_url_reviews.id

  secret_data = var.database_url_reviews
}

resource "google_secret_manager_secret" "database_url_orders" {
  secret_id = "database-url-orders"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_orders_version" {
  secret = google_secret_manager_secret.database_url_orders.id

  secret_data = var.database_url_orders
}

resource "google_secret_manager_secret" "database_url_cart" {
  secret_id = "database-url-cart"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_cart_version" {
  secret = google_secret_manager_secret.database_url_cart.id

  secret_data = var.database_url_cart
}

resource "google_secret_manager_secret" "database_url_profiles" {
  secret_id = "database-url-profiles"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_profiles_version" {
  secret = google_secret_manager_secret.database_url_profiles.id

  secret_data = var.database_url_profiles
}

resource "google_secret_manager_secret" "database_url_inventory" {
  secret_id = "database-url-inventory"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_url_inventory_version" {
  secret = google_secret_manager_secret.database_url_inventory.id

  secret_data = var.database_url_inventory
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

resource "google_secret_manager_secret" "amqp_url" {
  secret_id = "amqp-url"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "amqp_url_version" {
  secret = google_secret_manager_secret.amqp_url.id

  secret_data = var.amqp_url
}

