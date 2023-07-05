terraform {
  # cloud {
  #   organization = "shifter-shop"

  #   workspaces {
  #     name = "shifter-shop"
  #   }
  # }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.62.0"
    }
  }

  required_version = ">= 1.4.5"
}

