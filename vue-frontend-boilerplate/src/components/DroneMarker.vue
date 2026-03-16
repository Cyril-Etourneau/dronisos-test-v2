<template>
    <LMarker
        :lat-lng="[drone.position[1], drone.position[0]]"
        :icon="markerIcon"
        @mouseover="openPopup"
        @mouseout="closePopup"
    >
        <LPopup>
            <div>
                <strong>{{ drone.name }}</strong>
                <br />
                Status: <span :style="{ color: statusColor }">{{ drone.status }}</span>
                <br />
                Position:<br />
                {{ drone.position[0] }}<br />
                {{ drone.position[1] }}<br />
                {{ drone.position[2] }}<br />
            </div>
        </LPopup>
    </LMarker>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import L from "leaflet";
import { LMarker, LPopup } from "vue2-leaflet";
import { Drone } from "@/drones/schema";
import { DroneStatus } from "@/drones/status";

@Component({
    components: {
        LMarker,
        LPopup,
    },
})
export default class DroneMarker extends Vue {
    @Prop({ required: true })
    private drone!: Drone;

    private readonly markerSize = 16;

    protected get markerIcon(): L.DivIcon {
        return L.divIcon({
            className: "vuetify-marker",
            html: `<i class="v-icon notranslate mdi mdi-circle theme--light" style="color: ${this.statusColor}; font-size: ${this.markerSize}px; line-height: ${this.markerSize}px;"/>`,
            iconSize: [this.markerSize, this.markerSize],
            iconAnchor: [this.markerSize / 2, this.markerSize / 2],
            popupAnchor: [0, 0],
        });
    }

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
