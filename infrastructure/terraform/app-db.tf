resource "aws_db_instance" "rds_instance" {
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "13.10"
  instance_class         = "db.t3.micro"
  identifier             = var.db_identifier
  db_name                = var.db_name
  username               = var.db_user
  password               = var.db_password
  skip_final_snapshot    = true # TODO: this should be false for prod
  db_subnet_group_name   = aws_db_subnet_group.example.name
  vpc_security_group_ids = [
    aws_security_group.rds_sg.id,
  ]
}
