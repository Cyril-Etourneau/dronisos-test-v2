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
  it("renders drone details", () => {
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

    expect(getByText("Drone A")).toBeTruthy();
    expect(getByText("Position (lng, lat, height):")).toBeTruthy();
    expect(getByText("2.35")).toBeTruthy();
    expect(getByText("48.85")).toBeTruthy();
    expect(getByText("120")).toBeTruthy();
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
});
