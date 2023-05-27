docker login -u fergut
docker build -t traffic-control-service .
docker image tag traffic-control-service fergut/traffic-control-service:latest
docker image push fergut/traffic-control-service:latest

docker pull fergut/traffic-control-service:latest
docker run -p 6000:6000 fergut/traffic-control-service:latest

APP_PORT=6000
DAPR_HOST=http://localhost
DAPR_HTTP_PORT=3500

