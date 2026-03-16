import { fireEvent, render } from "@testing-library/vue";
import { DroneStatus } from "@/drones/status";

const mockState = {
  history: [
    {
      timestamp: "2026-03-16T10:00:00.000Z",
      drones: [
        {
          name: "Drone 1",
          position: [2, 48, 100],
          status: DroneStatus.Ok,
        },
      ],
    },
    {
      timestamp: "2026-03-16T10:01:00.000Z",
      drones: [
        {
          name: "Drone 1",
          position: [2.1, 48.1, 101],
          status: DroneStatus.Ok,
        },
        {
          name: "Drone 2",
          position: [3, 49, 150],
          status: DroneStatus.LowBattery,
        },
      ],
    },
  ],
};

jest.mock("@/store", () => ({
  __esModule: true,
  default: {
    state: mockState,
  },
}));

import Map from "@/components/Map.vue";

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
  template: `
    <button
      type="button"
      data-testid="drone-marker"
      :data-drone-name="drone.name"
      @click="$emit('open-history', drone.name)"
    >
      marker
    </button>
  `,
};

const HistoryLineStub = {
  name: "HistoryLine",
  props: ["timestamp", "drone"],
  template:
    '<div data-testid="history-line" :data-timestamp="timestamp" :data-drone-name="drone.name"></div>',
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
        HistoryLine: HistoryLineStub,
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
        HistoryLine: HistoryLineStub,
      },
    });

    const markers = getAllByTestId("drone-marker");

    expect(markers).toHaveLength(2);
    expect(markers[0].getAttribute("data-drone-name")).toBe("Drone 1");
    expect(markers[1].getAttribute("data-drone-name")).toBe("Drone 2");
  });

  it("shows selected drone history when marker emits open-history", async () => {
    const { getAllByTestId, queryByText, getByText } = render(Map, {
      props: {
        drones,
      },
      stubs: {
        LMap: LMapStub,
        LTileLayer: LTileLayerStub,
        DroneMarker: DroneMarkerStub,
        HistoryLine: HistoryLineStub,
      },
    });

    expect(queryByText("History of")).toBeNull();

    const markers = getAllByTestId("drone-marker");
    await fireEvent.click(markers[0]);

    expect(getByText("History of")).toBeTruthy();
    expect(getByText("Drone 1")).toBeTruthy();

    const historyLines = getAllByTestId("history-line");
    expect(historyLines).toHaveLength(2);
    expect(historyLines[0].getAttribute("data-drone-name")).toBe("Drone 1");
    expect(historyLines[1].getAttribute("data-drone-name")).toBe("Drone 1");
  });
});
