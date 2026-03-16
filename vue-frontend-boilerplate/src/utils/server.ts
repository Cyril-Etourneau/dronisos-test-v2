import { validateDrones } from "@/drones/schema";

function getBackendUrl(port = 5000): string {
    const url = new URL(location.origin);
    url.port = port.toString();

    return url.origin;
}

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
