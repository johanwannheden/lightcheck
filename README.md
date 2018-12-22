# Build docker image
* `ng build --prod`
* `docker build -t johanwannheden/lightcheck .`

# Deploy to Docker Hub
* `docker push johanwannheden/lightcheck:latest`

# Export to file
`docker save -o OUTPUT_FILE lightcheck:latest`

# Run docker image
`docker run -p 80:80 lightcheck:latest`

# Test using docker compose
`docker-compose up` and `docker-compose down --rmi all`