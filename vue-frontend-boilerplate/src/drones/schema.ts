import { z } from "zod";
import { DroneStatus } from "./status";

const droneSchema = z.object({
    name: z.string(),
    position: z.tuple([z.number(), z.number(), z.number()]),
    status: z.nativeEnum(DroneStatus),
});

/**
 * Drone data model.
 *
 * Prototype:
 * `type Drone = { name: string; position: [number, number, number]; status: string }`
 */
type Drone = z.infer<typeof droneSchema>;

const dronesArraySchema = z.array(droneSchema);

/**
 * Validates and parses unknown drone payloads.
 *
 * Prototype: `validateDrones(data: unknown): Drone[]`
 *
 * @param data Raw payload returned by the backend.
 * @returns Parsed drone array.
 */
function validateDrones(data: unknown): Drone[] {
    return dronesArraySchema.parse(data);
}

export { Drone, droneSchema, validateDrones };
