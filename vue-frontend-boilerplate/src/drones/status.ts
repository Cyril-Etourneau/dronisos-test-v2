/** Available drone statuses returned by backend data. */
enum DroneStatus {
    Ok = "OK",
    LostLink = "LOST_LINK",
    BadConfig = "BAD_CONFIG",
    MotorKo = "MOTOR_KO",
    LowBattery = "LOW_BATTERY",
}

function getStatusColor(status: DroneStatus): string {
    switch (status) {
        case DroneStatus.Ok:
            return "green";
        case DroneStatus.LowBattery:
            return "orange";
        case DroneStatus.LostLink:
        case DroneStatus.BadConfig:
        case DroneStatus.MotorKo:
            return "red";
        default:
            return "black";
    }
}

export { DroneStatus, getStatusColor };
