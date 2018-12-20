# Build docker image
* `ng build --prod`
* `docker build -t lightcheck:prod .`

# Export docker image
`docker save -o OUTPUT_FILE lightcheck:prod`

# Run docker image
`docker run -p 80:80 lightcheck:prod`