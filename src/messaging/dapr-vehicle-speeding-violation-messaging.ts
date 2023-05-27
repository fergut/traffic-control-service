import { SpeedingViolation } from "../models/speeding-violation";
import { DaprClient, CommunicationProtocolEnum } from "@dapr/dapr";

const daprHost = process.env.DAPR_HOST ?? "http://localhost";
const daprPort = process.env.DAPR_HTTP_PORT;
const communicationProtocol = CommunicationProtocolEnum.HTTP;


const DAPR_PUB_SUB_NAME = process.env.DAPR_PUB_SUB_NAME ?? "pubsub";
const DAPR_PUB_SUB_TOPIC = process.env.DAPR_PUB_SUB_TOPIC ?? "speedingviolations";

const client = new DaprClient(daprHost, daprPort, communicationProtocol);

class DaprVehicleSpeedingViolationMessaging  {

    async PublishSpeedViolation(speedingViolation : SpeedingViolation) {
        const result = await client.pubsub.publish(DAPR_PUB_SUB_NAME, DAPR_PUB_SUB_TOPIC, speedingViolation);
    }

}

export { DaprVehicleSpeedingViolationMessaging };