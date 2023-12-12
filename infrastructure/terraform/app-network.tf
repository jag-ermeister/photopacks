resource "aws_internet_gateway" "example" {
  vpc_id = aws_vpc.MyVPC.id

  tags = {
    Name = "${var.networking_name_prefix}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.MyVPC.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.example.id
  }

  tags = {
    Name = "${var.networking_name_prefix}-public"
  }
}

resource "aws_route_table_association" "public1" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public2" {
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.public.id
}

resource "aws_vpc" "MyVPC" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags                 = {
    Name = "${var.networking_name_prefix}-vpc"
  }
}

resource "aws_subnet" "public1" {
  vpc_id            = aws_vpc.MyVPC.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "${var.networking_name_prefix}-public"
  }
}

resource "aws_subnet" "public2" {
  vpc_id            = aws_vpc.MyVPC.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "${var.networking_name_prefix}-public-2"
  }
}

resource "aws_subnet" "private1" {
  vpc_id            = aws_vpc.MyVPC.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "${var.networking_name_prefix}-private"
  }
}

resource "aws_subnet" "private2" {
  vpc_id            = aws_vpc.MyVPC.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1c"

  tags = {
    Name = "${var.networking_name_prefix}-private-2"
  }
}

resource "aws_security_group" "rds_sg" {
  name_prefix = "rds_sg_"
  vpc_id      = aws_vpc.MyVPC.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.eb_sg.id]
  }

  tags = {
    Name = "${var.networking_name_prefix}-rds_sg"
  }
}


resource "aws_security_group" "eb_sg" {
  name_prefix = "eb_sg_"
  vpc_id      = aws_vpc.MyVPC.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private1.cidr_block, aws_subnet.private2.cidr_block]
  }

  tags = {
    Name = "${var.networking_name_prefix}-eb_sg"
  }
}

resource "aws_db_subnet_group" "example" {
  name       = var.db_subnet_group_name
  subnet_ids = [aws_subnet.private1.id, aws_subnet.private2.id]
}
