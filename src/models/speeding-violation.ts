interface SpeedingViolation {
    vehicleId: string;
    roadId: string;
    violationInKmh: number;
    timestamp: string;
}

export { SpeedingViolation };
