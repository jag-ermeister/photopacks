# Runpod

- Serverless worker template code: https://github.com/runpod-workers/worker-template
- Serverless docs: https://docs.runpod.io/docs/overview

## Template

- When creating the template, be sure to give a tag value in `Container Image`, e.g.: `jgustine/photo-pack-generation-image:1`
- Give at least 80 GB of disk space

## Endpoint

- When creating the endpoint, I have selected `24 GB GPU`, and selected cards `A5000` and `L4` under `Advanced Options`.
- Click on a worker to make sure it pulls down an image correctly.


### Experiment 1
- L4 GPU
- 4160 steps
- Start training at: 2023-12-11T04:01:21.111718531Z