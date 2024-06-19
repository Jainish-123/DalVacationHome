# Google cloud

- Setup project on google cloud console
- Install and setup google cloud cli
- Enable APIS for Registry, Cloud Run, Cloud Build, Deployment Manager

# Docker
- Install docker
- Move to frontend directory
- Run `docker build -t gcr.io/YOUR_PROJECT_ID/serverless-frontend:latest .` to build docker image
- RUN `docker push gcr.io/YOUR_PROJECT_ID/serverless-frontend:latest` to push image to Google cloud artifact registry

# Execute Cloud run
- Move to infra directory
- Run `gcloud builds submit --region=us-central1 --config frontend_cloudbuild.yml` to deploy create docker image to cloud run function
- Run `gcloud beta run services add-iam-policy-binding --region=us-central1 --member=allUsers --role=roles/run.invoker serverless-frontend` to allow public access to service. (This command may require admin access to execute so please make sure that you are running terminal with admin access)
- Above command will output public url for service which can be used to access application


# Future scope
- Integrate docker image creation and deployment with CI/CD (just now our repository in Gitlab so we will not be able to access google cloud from that so above commands need to be executed manually)
