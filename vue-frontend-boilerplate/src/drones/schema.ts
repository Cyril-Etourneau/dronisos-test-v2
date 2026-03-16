import { z } from "zod";

const DroneSchema = z.object({
    name: z.string(),
    position: z.tuple([z.number(), z.number(), z.number()]),
    status: z.string(),
});

type Drone = z.infer<typeof DroneSchema>;

const DronesArraySchema = z.array(DroneSchema);

function validateDrones(data: unknown): Drone[] {
    return DronesArraySchema.parse(data);
}

export { Drone, validateDrones };
