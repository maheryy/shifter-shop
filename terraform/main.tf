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
  source                      = "terraform-google-modules/kubernetes-engine/google"
  version                     = "~> 25.0"
  project_id                  = var.project_id
  name                        = "${var.project_id}-cluster"
  region                      = var.region
  zones                       = [ var.zone ]
  network                     = module.vpc.network_name
  subnetwork                  = module.vpc.subnets_names.0
  ip_range_pods               = local.ip_range_pods
  ip_range_services           = local.ip_range_services
  regional                    = false
  http_load_balancing         = true
  horizontal_pod_autoscaling  = true
  remove_default_node_pool    = true


  node_pools = [
    {
      name                      = "${var.project_id}-node-pool"
      machine_type              = "e2-standard-2"
      autoscaling               = true
      min_count                 = 1
      max_count                 = 4
      auto_repair               = true
      auto_upgrade              = true
      max_pods_per_node         = 100
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
  version = "15.1.0"

  project_id    = var.project_id
  vpc_network   = module.vpc.network_name
  prefix_length = 24
}

module "database" {
  source  = "GoogleCloudPlatform/sql-db/google//modules/postgresql"
  version = "15.1.0"

  project_id            = var.project_id
  name                  = var.project_id
  zone                  = var.zone
  region                = var.region
  availability_type     = "ZONAL"
  database_version      = "POSTGRES_15"
  user_name             = var.database_user_name
  user_password         = var.database_user_password
  additional_databases  = [
    {
      name = "users",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "products",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "categories",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "reviews",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "orders",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "cart",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "profiles",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
    {
      name = "inventory",
      charset = "UTF8",
      collation = "en_US.UTF8"
    },
  ]
  
  ip_configuration = {
    allocated_ip_range                            = "google-managed-services-${module.vpc.network_name}"
    authorized_networks                           = []
    enable_private_path_for_google_cloud_services = false
    ipv4_enabled                                  = true
    private_network                               = "projects/${var.project_id}/global/networks/${module.vpc.network_name}"
    require_ssl                                   = false
  }
}

resource "google_compute_global_address" "shiftershop" {
  name = "shiftershop"
}

module "dns" {
  source  = "terraform-google-modules/cloud-dns/google"
  version = "5.0.0"

  project_id = var.project_id
  name       = "shiftershop-pro"
  type       = "public"
  domain     = "shiftershop.pro."

  recordsets = [
    {
      name = ""
      type = "A"
      ttl  = 300
      records = [
        google_compute_global_address.shiftershop.address
      ]
    },
    {
      name = "api"
      type = "A"
      ttl  = 300
      records = [
        google_compute_global_address.shiftershop.address
      ]
    },
    {
      name = "admin"
      type = "A"
      ttl  = 300
      records = [
        google_compute_global_address.shiftershop.address
      ]
    },
  ]
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = var.project_id
  format        = "DOCKER"
}
