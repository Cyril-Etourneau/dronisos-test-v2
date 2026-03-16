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
    mockFetchDrones.mockReset();
  });

  it("initializes with an empty drones list", () => {
    expect(store.state.drones).toEqual([]);
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
  });

  it("syncDrones action commits empty list when server returns empty list", async () => {
    mockFetchDrones.mockResolvedValue([]);

    await store.dispatch("syncDrones");

    expect(mockFetchDrones).toHaveBeenCalledTimes(1);
    expect(store.state.drones).toEqual([]);
  });
});
