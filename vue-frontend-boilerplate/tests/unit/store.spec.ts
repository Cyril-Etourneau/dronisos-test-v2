import { DroneStatus } from "@/drones/status";

const mockFetchDrones = jest.fn();

jest.mock("@/utils/server", () => ({
  __esModule: true,
  fetchDrones: () => mockFetchDrones(),
}));

import store from "@/store";

describe("store", () => {
  const drones = [
    {
      name: "Alpha",
      position: [2.3, 48.8, 120] as [number, number, number],
      status: DroneStatus.Ok,
    },
    {
      name: "Beta",
      position: [3.4, 49.1, 80] as [number, number, number],
      status: DroneStatus.LowBattery,
    },
  ];

  beforeEach(() => {
    store.commit("setDrones", []);
    store.state.history = [];
    mockFetchDrones.mockReset();
  });

  it("initializes with an empty drones list", () => {
    expect(store.state.drones).toEqual([]);
    expect(store.state.history).toEqual([]);
  });

  it("updateHistory mutation adds most recent entry first", () => {
    const first = {
      timestamp: "2026-03-16T10:00:00.000Z",
      drones,
    };
    const second = {
      timestamp: "2026-03-16T10:01:00.000Z",
      drones: [drones[0]],
    };

    store.commit("updateHistory", first);
    store.commit("updateHistory", second);

    expect(store.state.history).toHaveLength(2);
    expect(store.state.history[0]).toEqual(second);
    expect(store.state.history[1]).toEqual(first);
  });

  it("updateHistory mutation keeps only the last 10 entries", () => {
    for (let i = 0; i < 12; i += 1) {
      store.commit("updateHistory", {
        timestamp: `2026-03-16T10:${String(i).padStart(2, "0")}:00.000Z`,
        drones,
      });
    }

    expect(store.state.history).toHaveLength(10);
    expect(store.state.history[0].timestamp).toBe("2026-03-16T10:11:00.000Z");
    expect(store.state.history[9].timestamp).toBe("2026-03-16T10:02:00.000Z");
  });

  it("setDrones mutation updates state", () => {
    store.commit("setDrones", drones);

    expect(store.state.drones).toEqual(drones);
  });

  it("getDrones getter returns current drones", () => {
    store.commit("setDrones", drones);

    expect(store.getters.getDrones).toEqual(drones);
  });

  it("syncDrones action fetches drones and commits them", async () => {
    mockFetchDrones.mockResolvedValue(drones);

    await store.dispatch("syncDrones");

    expect(mockFetchDrones).toHaveBeenCalledTimes(1);
    expect(store.state.drones).toEqual(drones);
    expect(store.state.history).toHaveLength(1);
    expect(store.state.history[0].drones).toEqual(drones);
    expect(Number.isNaN(Date.parse(store.state.history[0].timestamp))).toBe(false);
  });

  it("syncDrones action commits empty list when server returns empty list", async () => {
    mockFetchDrones.mockResolvedValue([]);

    await store.dispatch("syncDrones");

    expect(mockFetchDrones).toHaveBeenCalledTimes(1);
    expect(store.state.drones).toEqual([]);
    expect(store.state.history).toHaveLength(1);
    expect(store.state.history[0].drones).toEqual([]);
  });
});
