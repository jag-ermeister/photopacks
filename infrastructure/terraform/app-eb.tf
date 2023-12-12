resource "aws_cloudwatch_log_group" "beanstalk_logs" {
  name              = "/aws/elasticbeanstalk/${var.eb_env_name}"
  retention_in_days = 30
}

resource "aws_elastic_beanstalk_application" "BeanstalkApplication" {
  name        = var.eb_app_name
  description = "Photo Pack App"
}

resource "aws_elastic_beanstalk_environment" "BeanstalkDevEnv" {
  name                = var.eb_env_name
  application         = aws_elastic_beanstalk_application.BeanstalkApplication.name
  solution_stack_name = "64bit Amazon Linux 2 v3.5.1 running Python 3.8"
  tier                = "WebServer"
  description         = "Photo Packs App Environment"

  # This item is a resource managed in the mimic terraform config
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = var.eb_ec2_instance_profile_arn
  }

  # This item is a resource managed in the mimic terraform config
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = var.eb_service_role_arn
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.MyVPC.id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = "${aws_subnet.public1.id},${aws_subnet.public2.id}"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = "True"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = aws_security_group.eb_sg.id
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = "true"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "DeleteOnTerminate"
    value     = "true"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "RetentionInDays"
    value     = "30"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DB_NAME"
    value     = var.db_name
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DB_USER"
    value     = var.db_user
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DB_PASSWORD"
    value     = var.db_password
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DB_HOST"
    value     = aws_db_instance.rds_instance.address
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "AWS_ACCESS_KEY_ID"
    value     = var.aws_access_key_id
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "AWS_SECRET_ACCESS_KEY"
    value     = var.aws_secret_access_key
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "AWS_S3_REGION_NAME"
    value     = var.aws_region
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "API_URL"
    value     = var.api_url
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "ORDER_IMAGES_S3_BUCKET_NAME"
    value     = var.order_images_s3_bucket_name
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SDXL_BATCH_JOB_QUEUE_NAME"
    value     = var.sdxl_batch_job_queue_name
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SDXL_BATCH_JOB_DEFN_NAME"
    value     = var.sdxl_batch_job_defn_name
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RUNPOD_JOB_SUBMIT_URL"
    value     = var.runpod_job_submit_url
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RUNPOD_API_KEY"
    value     = var.runpod_api_key
  }
}
