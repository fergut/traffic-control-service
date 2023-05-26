import { SpeedingViolation } from "../models/speeding-violation";
import { DaprClient, CommunicationProtocolEnum } from "@dapr/dapr";

const daprHost = process.env.DAPR_HOST ?? "http://localhost";
const daprPort = process.env.DAPR_HTTP_PORT;
const communicationProtocol = CommunicationProtocolEnum.HTTP;

const pubSubName = "pubsub";
const topic = "speedingviolations";

const client = new DaprClient(daprHost, daprPort, communicationProtocol);

class DaprVehicleSpeedingViolationMessaging  {

    async PublishSpeedViolation(speedingViolation : SpeedingViolation) {
        const result = await client.pubsub.publish(pubSubName, topic, speedingViolation);
    }

}

export { DaprVehicleSpeedingViolationMessaging };