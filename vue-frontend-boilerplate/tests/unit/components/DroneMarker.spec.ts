import { fireEvent, render } from "@testing-library/vue";
import DroneMarker from "@/components/DroneMarker.vue";
import { DroneStatus } from "@/drones/status";

const openPopupSpy = jest.fn();
const closePopupSpy = jest.fn();

const LMarkerStub = {
  name: "LMarker",
  props: ["latLng"],
  data() {
    return {
      markerEvent: {
        target: {
          openPopup: openPopupSpy,
          closePopup: closePopupSpy,
        },
      },
    };
  },
  template: `
    <div
      data-testid="l-marker"
      :data-lat-lng="JSON.stringify(latLng)"
      @mouseover="$emit('mouseover', markerEvent)"
      @mouseout="$emit('mouseout', markerEvent)"
    >
      <slot />
    </div>
  `,
};

const DroneIconStub = {
  name: "DroneIcon",
  props: ["color"],
  template: '<div data-testid="drone-icon" :data-color="color"></div>',
};

const DronePopupStub = {
  name: "DronePopup",
  props: ["statusColor", "drone"],
  template:
    '<div data-testid="drone-popup" :data-status-color="statusColor" :data-drone-name="drone.name"></div>',
};

const drone = {
  name: "Drone B",
  position: [1.5, 43.6, 50],
  status: DroneStatus.LowBattery,
};

describe("DroneMarker.vue", () => {
  beforeEach(() => {
    openPopupSpy.mockReset();
    closePopupSpy.mockReset();
  });

  it("passes marker and popup/icon props derived from drone", () => {
    const { getByTestId } = render(DroneMarker, {
      props: {
        drone,
      },
      stubs: {
        LMarker: LMarkerStub,
        DroneIcon: DroneIconStub,
        DronePopup: DronePopupStub,
      },
    });

    const marker = getByTestId("l-marker");
    const icon = getByTestId("drone-icon");
    const popup = getByTestId("drone-popup");

    expect(marker.getAttribute("data-lat-lng")).toBe("[43.6,1.5]");
    expect(icon.getAttribute("data-color")).toBe("orange");
    expect(popup.getAttribute("data-status-color")).toBe("orange");
    expect(popup.getAttribute("data-drone-name")).toBe("Drone B");
  });

  it("opens popup on hover and closes popup on mouseout", async () => {
    const { getByTestId } = render(DroneMarker, {
      props: {
        drone,
      },
      stubs: {
        LMarker: LMarkerStub,
        DroneIcon: DroneIconStub,
        DronePopup: DronePopupStub,
      },
    });

    const marker = getByTestId("l-marker");

    await fireEvent.mouseOver(marker);
    expect(openPopupSpy).toHaveBeenCalledTimes(1);

    await fireEvent.mouseOut(marker);
    expect(closePopupSpy).toHaveBeenCalledTimes(1);
  });
});
