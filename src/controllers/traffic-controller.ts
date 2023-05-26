import express, { Request, Response } from 'express';
import { VehicleState } from '../models/vehicle-state';
import { SpeedingViolation } from '../models/speeding-violation';
import { DaprVehicleStateRepository } from '../repositories/dapr-vehicle-state-repository';
import { DaprVehicleSpeedingViolationMessaging } from '../messaging/dapr-vehicle-speeding-violation-messaging';
import { DefaultSpeedingViolationCalculator } from '../domain-services/default-speeding-violation-calculator';

const router = express.Router();

const vehicleStateRepository = new DaprVehicleStateRepository();
const vehicleSpeedingViolationMessaging = new DaprVehicleSpeedingViolationMessaging();
const speedingViolationCalculator = new DefaultSpeedingViolationCalculator();

router.post('/entrycam', async (req: Request, res: Response) => {

    try {

        console.log("ENTRY detected in lane %s at %s of vehicle with license-number %s.", req.body.lane, req.body.timestamp, req.body.licenseNumber);

        const vehicleState : VehicleState = { 
            licenseNumber: req.body.licenseNumber,
            entryTimestamp: req.body.timestamp,
            exitTimestamp: "",
        };
    
        await vehicleStateRepository.SaveVehicleStateAsync(vehicleState);
    
        res.status(200).send();   

    } catch (error) {
        console.log("Error occurred while processing ENTRY %s", error);
        res.status(500).send();  
    }

});

router.post('/exitcam', async (req: Request, res: Response) => {

    try {

        var state = await vehicleStateRepository.GetVehicleStateAsync(req.body.licenseNumber);

        console.log("EXIT detected in lane %s at %s of vehicle with license-number %s.", req.body.lane, req.body.timestamp, req.body.licenseNumber);

        state.exitTimestamp = req.body.timestamp;
        await vehicleStateRepository.SaveVehicleStateAsync(state);

        const violation = speedingViolationCalculator.DetermineSpeedingViolationInKmh(state.entryTimestamp, state.exitTimestamp);        
        if (violation > 0) {

            console.log("Speeding violation detected (%s KMh) of vehicle with license-number %s.", violation, state.licenseNumber);

            const speedingViolation : SpeedingViolation = {
                vehicleId : state.licenseNumber,
                roadId : speedingViolationCalculator.GetRoadId(),
                violationInKmh : violation,
                timestamp : req.body.timestamp            
            }

            await vehicleSpeedingViolationMessaging.PublishSpeedViolation(speedingViolation);
        }

        res.status(200).send();   

    } catch (error) {
        console.log("Error occurred while processing EXIT %s", error);
        res.status(500).send();  
    }

});

export { router as trafficController };