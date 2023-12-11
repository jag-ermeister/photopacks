Go here to check out why Batch jobs won't launch

https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#AutoScalingGroups:id=sdxl-generate-batch-compute-env-dev-asg-256a15df-0b59-36ff-80b2-d2220699bb62;view=activity

Launching a new EC2 instance. Status Reason: You have requested more vCPU capacity than your current vCPU limit of 0 allows for the instance bucket that the specified instance type belongs to. Please visit http://aws.amazon.com/contact-us/ec2-request to request an adjustment to this limit. Launching EC2 instance failed.

Trying to launch a g4dn.2xlarge



==========================================

# AWS Batch

### Experiment 1
- g5.xlarge
- 24 GB VRAM
- Submission Time: Dec 10 2023 09:45:47
- Job Start Time: Dec 10 2023 09:52:15
- Job Finish Time: Dec 10 2023 12:52:51 (Failure)
- This was for a total of 4160 steps
- Only took sample pictures at 4000 steps
- Training averaged 2.05s/it
- Got to 4000 steps in 2:16:52 of training time