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

variable "database_url" {
  type      = string
  sensitive = true
}

variable "mailer_dsn" {
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
