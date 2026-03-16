import { render } from "@testing-library/vue";
import HistoryLine from "@/components/HistoryLine.vue";
import { DroneStatus } from "@/drones/status";

const VListStub = {
  name: "v-list",
  template: '<div data-testid="v-list"><slot /></div>',
};

const VListItemStub = {
  name: "v-list-item",
  template: '<div data-testid="v-list-item"><slot /></div>',
};

const VListItemContentStub = {
  name: "v-list-item-content",
  template: '<div data-testid="v-list-item-content"><slot /></div>',
};

const stubs = {
  "v-list": VListStub,
  "v-list-item": VListItemStub,
  "v-list-item-content": VListItemContentStub,
};

describe("HistoryLine.vue", () => {
  it("renders timestamp, status, and coordinates", () => {
    const { getByText } = render(HistoryLine, {
      props: {
        timestamp: "2026-03-16T10:00:00.000Z",
        drone: {
          name: "Drone A",
          position: [2.35, 48.85, 120],
          status: DroneStatus.Ok,
        },
      },
      stubs,
    });

    expect(getByText("Timestamp:")).toBeTruthy();
    expect(getByText("2026-03-16T10:00:00.000Z")).toBeTruthy();
    expect(getByText("Status:")).toBeTruthy();
    expect(getByText(DroneStatus.Ok)).toBeTruthy();
    expect(getByText("Longitude:")).toBeTruthy();
    expect(getByText("2.35")).toBeTruthy();
    expect(getByText("Latitude:")).toBeTruthy();
    expect(getByText("48.85")).toBeTruthy();
    expect(getByText("Position Z:")).toBeTruthy();
    expect(getByText("120")).toBeTruthy();
  });

  it("applies the expected color class from drone status", () => {
    const lowBatteryView = render(HistoryLine, {
      props: {
        timestamp: "2026-03-16T10:00:00.000Z",
        drone: {
          name: "Drone A",
          position: [2.35, 48.85, 120],
          status: DroneStatus.LowBattery,
        },
      },
      stubs,
    });

    expect(
      lowBatteryView
        .getByText(DroneStatus.LowBattery)
        .classList.contains("drone-status--orange"),
    ).toBe(true);

    const criticalView = render(HistoryLine, {
      props: {
        timestamp: "2026-03-16T10:01:00.000Z",
        drone: {
          name: "Drone A",
          position: [2.4, 48.9, 118],
          status: DroneStatus.MotorKo,
        },
      },
      stubs,
    });

    expect(
      criticalView.getByText(DroneStatus.MotorKo).classList.contains("drone-status--red"),
    ).toBe(true);
  });
});
