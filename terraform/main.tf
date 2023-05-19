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
  zones                    = [var.zone]
  regional                 = false
  network                  = module.vpc.network_name
  subnetwork               = module.vpc.subnets_names.0
  ip_range_pods            = local.ip_range_pods
  ip_range_services        = local.ip_range_services
  remove_default_node_pool = true
  initial_node_count       = 1
  kubernetes_version       = "1.26.3-gke.1000"

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

module "peering" {
  source  = "GoogleCloudPlatform/sql-db/google//modules/private_service_access"
  version = "15.0.0"

  project_id    = var.project_id
  vpc_network   = module.vpc.network_name
  prefix_length = 24
}

module "database" {
  source  = "GoogleCloudPlatform/sql-db/google//modules/postgresql"
  version = "15.0.0"

  project_id        = var.project_id
  name              = var.project_id
  zone              = var.zone
  region            = var.region
  availability_type = "ZONAL"
  database_version  = "POSTGRES_14"
  user_name         = var.database_user_name
  user_password     = var.database_user_password

  ip_configuration = {
    allocated_ip_range                            = "google-managed-services-${module.vpc.network_name}"
    authorized_networks                           = []
    enable_private_path_for_google_cloud_services = false
    ipv4_enabled                                  = true
    private_network                               = "projects/${var.project_id}/global/networks/${module.vpc.network_name}"
    require_ssl                                   = false
  }
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = var.project_id
  format        = "DOCKER"
}
