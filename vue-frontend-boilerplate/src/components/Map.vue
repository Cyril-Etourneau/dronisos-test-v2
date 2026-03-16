<template>
    <div class="map-wrapper">
        <LMap :zoom="6" :center="[4, 9]" class="leaflet-map">
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <DroneMarker
                v-for="drone in drones"
                :key="drone.name"
                :drone="drone"
                @open-history="openHistory"
            />
        </LMap>

        <div v-if="selectedDroneName" class="drone-history">
            <div class="drone-history-title">
                History of
                <span class="drone-name">{{ selectedDroneName }}</span>
                <span class="drone-history-subtitle">(Last 10 entries)</span>
            </div>
            <HistoryLine
                v-for="(droneVersion, index) in droneVersions"
                :key="index"
                :timestamp="droneVersion.timestamp"
                :drone="droneVersion.drone"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LMap, LTileLayer } from "vue2-leaflet";
import DroneMarker from "@/components/DroneMarker.vue";
import HistoryLine from "@/components/HistoryLine.vue";
import { Drone } from "@/drones/schema";
import store from "@/store";

@Component({
    components: {
        DroneMarker,
        LMap,
        LTileLayer,
        HistoryLine,
    },
})
export default class Map extends Vue {
    @Prop({ required: true })
    private drones!: Drone[];

    private selectedDroneName: string | null = null;

    private get droneVersions() {
        if (!this.selectedDroneName) {
            return [];
        }
        const history = store.state.history;
        const droneVersions: { timestamp: string; drone: Drone }[] = [];

        for (const droneFetch of history) {
            const timestamp = droneFetch.timestamp;
            const drone = droneFetch.drones.find(
                (d) => d.name === this.selectedDroneName,
            );

            if (drone) {
                droneVersions.push({ timestamp, drone });
            }
        }

        return droneVersions;
    }

    private openHistory(droneName: string): void {
        this.selectedDroneName = droneName;
    }
}
</script>

<style scoped>
.map-wrapper {
    display: flex;
    flex-direction: column;
}

.leaflet-map {
    height: 80vh;
    width: 100%;
}

.drone-history {
    margin-top: 1em;
}

.drone-history-title {
    margin-bottom: 1em;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
}

.drone-history-subtitle {
    margin-left: 0.5em;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-muted);
}
</style>
