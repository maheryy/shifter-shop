locals {
  subnet_name       = "${var.project_id}-subnet"
  ip_range_pods     = "${local.subnet_name}-pods"
  ip_range_services = "${local.subnet_name}-services"
}

module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "~> 7.0"

  project_id   = var.project_id
  network_name = "${var.project_id}-vpc"

  subnets = [
    {
      subnet_name   = local.subnet_name
      subnet_ip     = "10.0.0.0/24"
      subnet_region = var.region
    },
  ]

  secondary_ranges = {
    (local.subnet_name) = [
      {
        range_name    = local.ip_range_pods
        ip_cidr_range = "10.1.0.0/17",
      },
      {
        range_name    = local.ip_range_services
        ip_cidr_range = "10.2.0.0/22"
      }
    ]
  }
}

module "gke" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  version = "~> 25.0"

  project_id               = var.project_id
  name                     = var.project_id
  region                   = var.region
  network                  = module.vpc.network_name
  subnetwork               = module.vpc.subnets_names.0
  ip_range_pods            = local.ip_range_pods
  ip_range_services        = local.ip_range_services
  remove_default_node_pool = true
  initial_node_count       = 1
  kubernetes_version       = "1.25.8-gke.500"

  node_pools = [
    {
      name      = "e2-small"
      max_count = 2
    },
  ]

  node_pools_oauth_scopes = {
    all = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = var.project_id
  format        = "DOCKER"
}
