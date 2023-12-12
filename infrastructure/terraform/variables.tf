variable "aws_access_key_id" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "local_backend_url" {
  type = string
}

variable "order_images_s3_bucket_name" {
  type = string
}

variable "service_name" {
  type = string
}

variable db_name {
  type = string
}

variable db_identifier {
  type = string
}

variable db_user {
  type = string
}

variable db_password {
  type = string
}

variable db_subnet_group_name {
  type = string
}

variable eb_app_name {
  type = string
}

variable eb_env_name {
  type = string
}

variable eb_ec2_instance_profile_arn {
  type = string
}

variable eb_service_role_arn {
  type = string
}

variable networking_name_prefix {
  type = string
}

variable "eb_deploy_s3_bucket_name" {
  type = string
}
