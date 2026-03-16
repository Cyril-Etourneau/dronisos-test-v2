<template>
    <LMarker
        :lat-lng="[drone.position[1], drone.position[0]]"
        @mouseover="openPopup"
        @mouseout="closePopup"
    >
        <DroneIcon :color="statusColor" />
        <DronePopup :status-color="statusColor" :drone="drone" />
    </LMarker>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import L from "leaflet";
import { LMarker, LPopup } from "vue2-leaflet";
import { Drone } from "@/drones/schema";
import { DroneStatus } from "@/drones/status";
import DroneIcon from "./DroneIcon.vue";
import DronePopup from "./DronePopup.vue";

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
        switch (this.drone.status) {
            case DroneStatus.Ok:
                return "green";
            case DroneStatus.LowBattery:
                return "orange";
            case DroneStatus.LostLink:
            case DroneStatus.BadConfig:
            case DroneStatus.MotorKo:
                return "red";
            default:
                return "black";
        }
    }

    private openPopup(event: L.LeafletEvent): void {
        const marker = event.target as L.Marker;
        marker.openPopup();
    }

    private closePopup(event: L.LeafletEvent): void {
        const marker = event.target as L.Marker;
        marker.closePopup();
    }
}
</script>
