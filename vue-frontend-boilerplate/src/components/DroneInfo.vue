<template>
    <Map :drones="drones" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import { Drone } from "@/drones/schema";
import Map from "@/components/Map.vue";

@Component({
    components: {
        Map,
    },
})
export default class DroneInfo extends Vue {
    private readonly refreshRate = 10000; // 10 seconds
    private droneInterval: number | null = null;

    protected get drones(): Drone[] {
        return store.state.drones;
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
