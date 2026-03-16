<template>
    <div>
        <DroneFilter class="mb-4" @change="onFilterChange" />
        <Map :drones="filteredDrones" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DroneFilter from "@/components/DroneFilter.vue";
import Map from "@/components/Map.vue";
import { Drone } from "@/drones/schema";
import store from "@/store";

type DroneFilterValue = {
    name: string;
    status: string[];
};

@Component({
    components: {
        Map,
        DroneFilter,
    },
})
export default class DroneInfo extends Vue {
    private readonly refreshRate = 10000; // 10 seconds
    private droneInterval: number | null = null;
    private droneFilter: DroneFilterValue = {
        name: "",
        status: [],
    };

    protected get drones(): Drone[] {
        return store.state.drones;
    }

    protected get filteredDrones(): Drone[] {
        const nameQuery = this.droneFilter.name.trim();
        const hasStatusFilter = this.droneFilter.status.length > 0;

        return this.drones.filter((drone) => {
            const nameMatches =
                nameQuery.length === 0 || drone.name.includes(nameQuery);

            const statusMatches =
                !hasStatusFilter ||
                this.droneFilter.status.includes(drone.status);

            return nameMatches && statusMatches;
        });
    }

    private onFilterChange(nextFilter: DroneFilterValue): void {
        this.droneFilter = {
            name: nextFilter.name,
            status: [...nextFilter.status],
        };
    }

    mounted(): void {
        store.dispatch("syncDrones");

        this.droneInterval = window.setInterval(() => {
            store.dispatch("syncDrones");
        }, this.refreshRate);
    }

    beforeDestroy(): void {
        if (this.droneInterval) {
            clearInterval(this.droneInterval);
        }
    }
}
</script>
