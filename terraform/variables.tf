variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

variable "zone" {
  type = string
}

variable "jwt_secret" {
  type      = string
  sensitive = true
}

variable "stripe_private_key" {
  type      = string
  sensitive = true
}

variable "stripe_public_key" {
  type      = string
  sensitive = true
}

variable "stripe_webhook_key" {
  type      = string
  sensitive = true
}

variable "database_url_users" {
  type      = string
  sensitive = true
}
variable "database_url_products" {
  type      = string
  sensitive = true
}
variable "database_url_categories" {
  type      = string
  sensitive = true
}
variable "database_url_reviews" {
  type      = string
  sensitive = true
}
variable "database_url_orders" {
  type      = string
  sensitive = true
}
variable "database_url_cart" {
  type      = string
  sensitive = true
}
variable "database_url_profiles" {
  type      = string
  sensitive = true
}
variable "database_url_inventory" {
  type      = string
  sensitive = true
}

variable "mailer_dsn" {
  type      = string
  sensitive = true
}

variable "amqp_url" {
  type      = string
  sensitive = true
}

variable "database_user_name" {
  type      = string
  sensitive = true
}

variable "database_user_password" {
  type      = string
  sensitive = true
}
