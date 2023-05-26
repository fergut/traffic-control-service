import { differenceInSeconds, parse } from "date-fns";

const roadId = "A12";
const sectionLengthInKm = 10;
const maxAllowedSpeedInKmh = 100;
const legalCorrectionInKmh = 5;

class DefaultSpeedingViolationCalculator  {

    DetermineSpeedingViolationInKmh(entryTimestamp: string, exitTimestamp: string): number
    {
        const entryDate = new Date(entryTimestamp);
        const exitDate = new Date(exitTimestamp);

        const elapsedMinutes = differenceInSeconds(exitDate, entryDate) ; // 1 sec. == 1 min. in simulation
        const avgSpeedInKmh = Math.round((sectionLengthInKm / elapsedMinutes) * 60);
        const violation = avgSpeedInKmh - maxAllowedSpeedInKmh - legalCorrectionInKmh;
        
        return violation;
    }    

    GetRoadId() {
        return roadId;
    }

}

export { DefaultSpeedingViolationCalculator };