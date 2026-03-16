<template>
    <LPopup>
        <v-col class="drone-popup">
            <div class="drone-name drone-popup-title">{{ drone.name }}</div>

            <div class="drone-popup-row">
                <span>Status:</span>
                <span class="drone-popup-status" :class="colorClass">{{
                    drone.status
                }}</span>
            </div>

            <div class="drone-popup-section-title">
                Position (lng, lat, height):
            </div>
            <div class="drone-popup-grid">
                <div class="drone-popup-field">
                    <span class="drone-popup-label">Lng</span>
                    <span>{{ drone.position[0] }}</span>
                </div>
                <div class="drone-popup-field">
                    <span class="drone-popup-label">Lat</span>
                    <span>{{ drone.position[1] }}</span>
                </div>
                <div class="drone-popup-field">
                    <span class="drone-popup-label">Height</span>
                    <span>{{ drone.position[2] }}</span>
                </div>
            </div>
        </v-col>
    </LPopup>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LPopup } from "vue2-leaflet";
import { Drone } from "@/drones/schema";

@Component({
    components: {
        LPopup,
    },
})
export default class DronePopup extends Vue {
    @Prop({ required: true })
    private drone!: Drone;

    @Prop({ required: false, default: "black" })
    private statusColor!: string;

    protected get colorClass(): string {
        return `drone-status--${this.statusColor}`;
    }
}
</script>

<style scoped>
.drone-popup {
    min-width: 220px;
    padding: 0.25em;
}

.drone-popup-title {
    margin-bottom: 0.5em;
    font-size: 1.05em;
}

.drone-popup-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.7em;
    font-size: 0.95em;
}

.drone-popup-status {
    padding: 0.15em 0.55em;
    border-radius: 999px;
    background: #f5f5f5;
    font-weight: 600;
}

.drone-popup-section-title {
    margin-bottom: 0.45em;
    color: #546e7a;
    font-size: 0.86em;
    font-weight: 600;
    text-transform: uppercase;
}

.drone-popup-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.45em;
}

.drone-popup-field {
    display: flex;
    flex-direction: column;
    padding: 0.35em 0.45em;
    border: 1px solid #eceff1;
    border-radius: 0.45em;
    background: #fafcfd;
}

.drone-popup-label {
    margin-bottom: 0.2em;
    color: #607d8b;
    font-size: 0.72em;
    font-weight: 600;
}
</style>
