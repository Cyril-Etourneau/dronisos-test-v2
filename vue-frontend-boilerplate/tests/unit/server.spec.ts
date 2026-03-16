import { fetchDrones } from "@/utils/server";

describe("utils/server", () => {
  const originalFetch = window.fetch;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    window.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    window.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("fetches drones from backend and returns validated data", async () => {
    const payload = [
      {
        name: "Alpha",
        position: [2.3, 48.8, 120],
        status: "OK",
      },
    ];

    (window.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    const result = await fetchDrones();

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect((window.fetch as jest.Mock).mock.calls[0][0]).toBe("http://localhost:5000");
    expect(result).toEqual(payload);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("returns an empty array when response is not ok", async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => [],
    });

    const result = await fetchDrones();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy.mock.calls[0][0]).toBe("Failed to fetch drones:");
  });

  it("returns an empty array when payload validation fails", async () => {
    (window.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ name: "Invalid", position: [1, 2], status: "OK" }],
    });

    const result = await fetchDrones();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy.mock.calls[0][0]).toBe("Failed to fetch drones:");
  });

  it("returns an empty array when fetch throws", async () => {
    (window.fetch as jest.Mock).mockRejectedValue(new Error("Network down"));

    const result = await fetchDrones();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy.mock.calls[0][0]).toBe("Failed to fetch drones:");
  });
});
