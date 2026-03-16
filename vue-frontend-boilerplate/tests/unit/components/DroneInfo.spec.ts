import { fireEvent, render } from "@testing-library/vue";
import { DroneStatus } from "@/drones/status";

const mockDispatch = jest.fn();
const mockState = {
  drones: [
    {
      name: "Alpha",
      position: [1.1, 2.2, 3.3],
      status: DroneStatus.Ok,
    },
    {
      name: "Beta",
      position: [4.4, 5.5, 6.6],
      status: DroneStatus.LowBattery,
    },
  ],
};

jest.mock("@/store", () => ({
  __esModule: true,
  default: {
    state: mockState,
    dispatch: mockDispatch,
  },
}));

import DroneInfo from "@/components/DroneInfo.vue";

const MapStub = {
  name: "Map",
  props: ["drones"],
  template: '<div data-testid="map" :data-drones="JSON.stringify(drones)"></div>',
};

const DroneFilterStub = {
  name: "DroneFilter",
  template: `
    <div data-testid="drone-filter">
      <button
        type="button"
        data-testid="filter-name"
        @click="$emit('change', { name: 'Al', status: [] })"
      >
        filter-name
      </button>
      <button
        type="button"
        data-testid="filter-status"
        @click="$emit('change', { name: '', status: ['LOW_BATTERY'] })"
      >
        filter-status
      </button>
      <button
        type="button"
        data-testid="filter-combined"
        @click="$emit('change', { name: 'a', status: ['LOW_BATTERY'] })"
      >
        filter-combined
      </button>
      <button
        type="button"
        data-testid="filter-name-trimmed"
        @click="$emit('change', { name: '  Alpha  ', status: [] })"
      >
        filter-name-trimmed
      </button>
    </div>
  `,
};

const componentStubs = {
  Map: MapStub,
  DroneFilter: DroneFilterStub,
};

describe("DroneInfo.vue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockDispatch.mockReset();
    mockState.drones = [
      {
        name: "Alpha",
        position: [1.1, 2.2, 3.3],
        status: DroneStatus.Ok,
      },
      {
        name: "Beta",
        position: [4.4, 5.5, 6.6],
        status: DroneStatus.LowBattery,
      },
    ];
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("passes store drones to Map", () => {
    const { getByTestId } = render(DroneInfo, {
      stubs: componentStubs,
    });

    const map = getByTestId("map");
    expect(map.getAttribute("data-drones")).toBe(JSON.stringify(mockState.drones));
  });

  it("dispatches syncDrones on mount and on interval", () => {
    render(DroneInfo, {
      stubs: componentStubs,
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith("syncDrones");

    jest.advanceTimersByTime(10000);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenLastCalledWith("syncDrones");
  });

  it("clears refresh interval on destroy", () => {
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    const { unmount } = render(DroneInfo, {
      stubs: componentStubs,
    });

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });

  it("updates displayed drones when filter change event is emitted", async () => {
    const { getByTestId } = render(DroneInfo, {
      stubs: componentStubs,
    });

    const map = getByTestId("map");

    expect(map.getAttribute("data-drones")).toBe(JSON.stringify(mockState.drones));

    await fireEvent.click(getByTestId("filter-name"));

    expect(map.getAttribute("data-drones")).toBe(
      JSON.stringify([mockState.drones[0]]),
    );

    await fireEvent.click(getByTestId("filter-status"));

    expect(map.getAttribute("data-drones")).toBe(
      JSON.stringify([mockState.drones[1]]),
    );

    await fireEvent.click(getByTestId("filter-combined"));

    expect(map.getAttribute("data-drones")).toBe(
      JSON.stringify([mockState.drones[1]]),
    );

    await fireEvent.click(getByTestId("filter-name-trimmed"));

    expect(map.getAttribute("data-drones")).toBe(
      JSON.stringify([mockState.drones[0]]),
    );
  });
});
