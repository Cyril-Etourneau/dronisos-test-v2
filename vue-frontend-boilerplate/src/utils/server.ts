import { validateDrones } from "@/drones/schema";

/**
 * Builds backend base URL from current origin and target port.
 *
 * Prototype: `getBackendUrl(port?: number): string`
 *
 * @param port Backend port number.
 * @returns Backend origin URL.
 */
function getBackendUrl(port = 5000): string {
    const url = new URL(location.origin);
    url.port = port.toString();

    return url.origin;
}

/**
 * Fetches drones from backend and validates the payload.
 *
 * Prototype: `fetchDrones(): Promise<Drone[]>`
 *
 * @returns Validated drones, or an empty list on request/validation failure.
 */
async function fetchDrones() {
    try {
        const response = await fetch(getBackendUrl());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const drones = validateDrones(data);
        return drones;
    } catch (error) {
        console.error("Failed to fetch drones:", error);
        return [];
    }
}

export { fetchDrones };
