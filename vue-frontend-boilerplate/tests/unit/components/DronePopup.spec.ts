import { render } from "@testing-library/vue";
import DronePopup from "@/components/DronePopup.vue";
import { DroneStatus } from "@/drones/status";

const LPopupStub = {
  name: "LPopup",
  template: '<div data-testid="l-popup"><slot /></div>',
};

const VColStub = {
  name: "v-col",
  template: '<div data-testid="v-col"><slot /></div>',
};

const drone = {
  name: "Drone A",
  position: [2.35, 48.85, 120],
  status: DroneStatus.Ok,
};

describe("DronePopup.vue", () => {
  it("renders drone details with labeled position fields", () => {
    const { container, getByText, getAllByText } = render(DronePopup, {
      props: {
        drone,
        statusColor: "green",
      },
      stubs: {
        LPopup: LPopupStub,
        "v-col": VColStub,
      },
    });

    expect(getByText("Drone A")).toBeTruthy();
    expect(getByText("Position (lng, lat, height):")).toBeTruthy();
    expect(getByText("Lng")).toBeTruthy();
    expect(getByText("Lat")).toBeTruthy();
    expect(getByText("Height")).toBeTruthy();
    expect(getByText("2.35")).toBeTruthy();
    expect(getByText("48.85")).toBeTruthy();
    expect(getByText("120")).toBeTruthy();

    expect(container.querySelector(".drone-popup-grid")).toBeTruthy();
    expect(container.querySelectorAll(".drone-popup-field")).toHaveLength(3);
    expect(getAllByText("Status:")).toHaveLength(1);
  });

  it("applies status class from statusColor", () => {
    const { getByText } = render(DronePopup, {
      props: {
        drone,
        statusColor: "green",
      },
      stubs: {
        LPopup: LPopupStub,
        "v-col": VColStub,
      },
    });

    const status = getByText(DroneStatus.Ok);
    expect(status.classList.contains("drone-status--green")).toBe(true);
  });

  it("uses black status class when statusColor is not provided", () => {
    const { getByText } = render(DronePopup, {
      props: {
        drone,
      },
      stubs: {
        LPopup: LPopupStub,
        "v-col": VColStub,
      },
    });

    const status = getByText(DroneStatus.Ok);
    expect(status.classList.contains("drone-status--black")).toBe(true);
  });

  it("applies the expected class for warning color", () => {
    const { getByText } = render(DronePopup, {
      props: {
        drone: {
          ...drone,
          status: DroneStatus.LowBattery,
        },
        statusColor: "orange",
      },
      stubs: {
        LPopup: LPopupStub,
        "v-col": VColStub,
      },
    });

    const status = getByText(DroneStatus.LowBattery);
    expect(status.classList.contains("drone-status--orange")).toBe(true);
  });
});
