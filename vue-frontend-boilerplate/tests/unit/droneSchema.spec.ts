import { validateDrones } from "@/drones/schema";

describe("drone schema", () => {
  it("parses a valid drones payload", () => {
    const payload = [
      {
        name: "Alpha",
        position: [2.3, 48.8, 120],
        status: "OK",
      },
      {
        name: "Beta",
        position: [3.4, 49.1, 80],
        status: "LOW_BATTERY",
      },
    ];

    const result = validateDrones(payload);

    expect(result).toEqual(payload);
  });

  it("parses an empty array", () => {
    expect(validateDrones([])).toEqual([]);
  });

  it("throws when payload is not an array", () => {
    expect(() => validateDrones({})).toThrow();
  });

  it("throws when a drone has an invalid position tuple", () => {
    const payload = [
      {
        name: "Alpha",
        position: [2.3, 48.8],
        status: "OK",
      },
    ];

    expect(() => validateDrones(payload)).toThrow();
  });

  it("throws when a required field is missing", () => {
    const payload = [
      {
        position: [2.3, 48.8, 120],
        status: "OK",
      },
    ];

    expect(() => validateDrones(payload)).toThrow();
  });

  it("throws when field types are invalid", () => {
    const payload = [
      {
        name: "Alpha",
        position: [2.3, "48.8", 120],
        status: 123,
      },
    ];

    expect(() => validateDrones(payload)).toThrow();
  });
});
