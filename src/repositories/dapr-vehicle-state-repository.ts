import { VehicleState } from "../models/vehicle-state";
import { DaprClient, CommunicationProtocolEnum } from "@dapr/dapr";

const daprHost = process.env.DAPR_HOST ?? "http://localhost";
const daprPort = process.env.DAPR_HTTP_PORT;
const communicationProtocol = CommunicationProtocolEnum.HTTP;

const DAPR_STATE_STORE_NAME = process.env.DAPR_STATE_STORE_NAME ?? "statestore";

const client = new DaprClient(daprHost, daprPort, communicationProtocol);

class DaprVehicleStateRepository  {

    async SaveVehicleStateAsync(vehicleState: VehicleState): Promise<void> {
        await client.state.save(DAPR_STATE_STORE_NAME, [{ key: vehicleState.licenseNumber, value: vehicleState }] );
    }

    async GetVehicleStateAsync(vehicleLicenseNumber: string): Promise<VehicleState> {
        const vehicleState = await client.state.get(DAPR_STATE_STORE_NAME, vehicleLicenseNumber) as VehicleState;
        return vehicleState;
    }

}

export { DaprVehicleStateRepository };


