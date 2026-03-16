<template>
    <v-list dense class="history-line" rounded>
        <v-list-item>
            <v-list-item-content>
                <div class="history-row history-row--three">
                    <div class="history-field history-field--span-2">
                        <span class="history-label">Timestamp:</span>
                        <span>{{ timestamp }}</span>
                    </div>
                    <div class="history-field">
                        <span class="history-label">Status:</span>
                        <span :class="colorClass">{{ drone.status }}</span>
                    </div>
                </div>
            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-content>
                <div class="history-row history-row--three">
                    <div class="history-field">
                        <span class="history-label">Longitude:</span>
                        <span>{{ drone.position[0] }}</span>
                    </div>
                    <div class="history-field">
                        <span class="history-label">Latitude:</span>
                        <span>{{ drone.position[1] }}</span>
                    </div>
                    <div class="history-field">
                        <span class="history-label">Position Z:</span>
                        <span>{{ drone.position[2] }}</span>
                    </div>
                </div>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Drone } from "@/drones/schema";
import { getStatusColor } from "@/drones/status";

@Component
export default class HistoryLine extends Vue {
    @Prop({ required: true })
    private timestamp!: string;

    @Prop({ required: true })
    private drone!: Drone;


    protected get colorClass(): string {
        const status = getStatusColor(this.drone.status);

        return `drone-status--${status}`;
    }
}
</script>

<style scoped>
.history-line {
    margin-top: 0.5em;
    border: 1px solid #eceff1;
    border-radius: 0.5em;
}

.history-title {
    font-weight: 600;
}

.history-row {
    display: grid;
    gap: 0.75em;
    width: 100%;
}

.history-row--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.history-row--three {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.history-field--span-2 {
    grid-column: span 2;
}

.history-field {
    display: flex;
    gap: 0.375em;
    align-items: center;
}

.history-label {
    font-weight: 600;
}
</style>