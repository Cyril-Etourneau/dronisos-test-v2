import { render } from "@testing-library/vue";
import Map from "@/components/Map.vue";
import { DroneStatus } from "@/drones/status";

const LMapStub = {
  name: "LMap",
  props: ["zoom", "center"],
  template:
    '<div data-testid="l-map" :data-zoom="String(zoom)" :data-center="JSON.stringify(center)"><slot /></div>',
};

const LTileLayerStub = {
  name: "LTileLayer",
  props: ["url", "attribution"],
  template:
    '<div data-testid="tile-layer" :data-url="url" :data-attribution="attribution"></div>',
};

const DroneMarkerStub = {
  name: "DroneMarker",
  props: ["drone"],
  template: '<div data-testid="drone-marker" :data-drone-name="drone.name"></div>',
};

const drones = [
  {
    name: "Drone 1",
    position: [2, 48, 100],
    status: DroneStatus.Ok,
  },
  {
    name: "Drone 2",
    position: [3, 49, 150],
    status: DroneStatus.LowBattery,
  },
];

describe("Map.vue", () => {
  it("passes map and tile-layer configuration", () => {
    const { getByTestId } = render(Map, {
      props: {
        drones,
      },
      stubs: {
        LMap: LMapStub,
        LTileLayer: LTileLayerStub,
        DroneMarker: DroneMarkerStub,
      },
    });

    const map = getByTestId("l-map");
    const tileLayer = getByTestId("tile-layer");

    expect(map.getAttribute("data-zoom")).toBe("6");
    expect(map.getAttribute("data-center")).toBe("[4,9]");
    expect(tileLayer.getAttribute("data-url")).toBe(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    );
    expect(tileLayer.getAttribute("data-attribution")).toContain(
      "OpenStreetMap",
    );
  });

  it("renders one DroneMarker per drone", () => {
    const { getAllByTestId } = render(Map, {
      props: {
        drones,
      },
      stubs: {
        LMap: LMapStub,
        LTileLayer: LTileLayerStub,
        DroneMarker: DroneMarkerStub,
      },
    });

    const markers = getAllByTestId("drone-marker");

    expect(markers).toHaveLength(2);
    expect(markers[0].getAttribute("data-drone-name")).toBe("Drone 1");
    expect(markers[1].getAttribute("data-drone-name")).toBe("Drone 2");
  });
});
