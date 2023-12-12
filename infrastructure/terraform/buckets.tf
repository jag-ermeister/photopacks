resource "aws_s3_bucket" "order_images" {
  bucket = var.order_images_s3_bucket_name

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "HEAD"]
    allowed_origins = [var.local_backend_url]
  }
}

resource "aws_s3_bucket_public_access_block" "order_images_public_access_block" {
  bucket = aws_s3_bucket.order_images.id

  block_public_acls       = false
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "order_images_public" {
  bucket = aws_s3_bucket.order_images.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.order_images.arn}/*"
        Principal = "*"
      }
    ]
  })
  depends_on = [
    aws_s3_bucket_public_access_block.order_images_public_access_block,
  ]
}

resource "aws_s3_bucket" "eb_deploy_bucket" {
  bucket = var.eb_deploy_s3_bucket_name
}