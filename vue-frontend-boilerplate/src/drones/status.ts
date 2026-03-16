/** Available drone statuses returned by backend data. */
enum DroneStatus {
    Ok = "OK",
    LostLink = "LOST_LINK",
    BadConfig = "BAD_CONFIG",
    MotorKo = "MOTOR_KO",
    LowBattery = "LOW_BATTERY",
}

export { DroneStatus };
