docker login -u fergut
docker build -t traffic-control-service .
docker image tag traffic-control-service fergut/traffic-control-service:latest
docker image push fergut/traffic-control-service:latest

APP_PORT=6000
DAPR_STATE_STORE_NAME="statestore"
DAPR_PUB_SUB_NAME="pubsub";
DAPR_PUB_SUB_TOPIC="speedingviolations";

