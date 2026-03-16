import { DroneStatus, getStatusColor } from "@/drones/status";

describe("drone status", () => {
  it("returns the expected color for each known status", () => {
    expect(getStatusColor(DroneStatus.Ok)).toBe("green");
    expect(getStatusColor(DroneStatus.LowBattery)).toBe("orange");
    expect(getStatusColor(DroneStatus.LostLink)).toBe("red");
    expect(getStatusColor(DroneStatus.BadConfig)).toBe("red");
    expect(getStatusColor(DroneStatus.MotorKo)).toBe("red");
  });

  it("returns black for unknown statuses", () => {
    expect(getStatusColor("UNKNOWN" as DroneStatus)).toBe("black");
  });
});
