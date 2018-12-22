# Build docker image
* `ng build --prod`
* `docker build -t johanwannheden/lightcheck .`

# Export docker image to file
`docker save -o OUTPUT_FILE lightcheck:latest`

# Export docker image to Docker Hub
`docker push johanwannheden/lightcheck:latest`

# Run docker image
`docker run -p 80:80 lightcheck:latest`