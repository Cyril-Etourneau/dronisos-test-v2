<template>
    <LMarker
        :lat-lng="[drone.position[1], drone.position[0]]"
        @mouseover="openPopup"
        @mouseout="closePopup"
        @click="openHistory"
    >
        <DroneIcon :color="statusColor" />
        <DronePopup :status-color="statusColor" :drone="drone" />
    </LMarker>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import L from "leaflet";
import { LMarker, LPopup } from "vue2-leaflet";
import DroneIcon from "@/components/DroneIcon.vue";
import DronePopup from "@/components/DronePopup.vue";
import { Drone } from "@/drones/schema";
import { getStatusColor } from "@/drones/status";

@Component({
    components: {
        LMarker,
        LPopup,
        DroneIcon,
        DronePopup,
    },
})
export default class DroneMarker extends Vue {
    @Prop({ required: true })
    private drone!: Drone;

    private readonly markerSize = 16;

    protected get statusColor(): string {
        return getStatusColor(this.drone.status);
    }

    private openPopup(event: L.LeafletEvent): void {
        const marker = event.target as L.Marker;
        marker.openPopup();
    }

    private closePopup(event: L.LeafletEvent): void {
        const marker = event.target as L.Marker;
        marker.closePopup();
    }

    private openHistory(): void {
        this.$emit("open-history", this.drone.name);
    }
}
</script>
