# Photo Packs Infrastructure

### Deployment

- Export your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables and then follow
the instructions for dev or prod
- *NOTE* you may want to `unset` the following environment variables:
  - `WEIGHTS_S3_BUCKET_NAME`
  - `INFERENCE_IMAGES_S3_BUCKET_NAME`
  - `TRAINING_IMAGES_S3_BUCKET_NAME`

  
##### Dev Deployment

- Select the terraform environment: `terraform workspace select dev`
- From the terraform folder, execute the following:
  - `terraform init -var-file=dev.tfvars`
  - `terraform plan -var-file=dev.tfvars`
  - `terraform apply -var-file=dev.tfvars`
- From the batch folder, execute `serverless deploy --stage dev`
- After deploying Elastic Beanstalk, be sure to update Route53 records.

##### Prod Deployment

- Select the terraform environment: `terraform workspace select prod`
- From the terraform folder, execute the following:
  - `terraform init -var-file=prod.tfvars`
  - `terraform plan -var-file=prod.tfvars`
  - `terraform apply -var-file=prod.tfvars`
- From the batch folder, execute `serverless deploy --stage prod`
- After deploying Elastic Beanstalk, be sure to update Route53 records.
