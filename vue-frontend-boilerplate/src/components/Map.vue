<template>
    <LMap :zoom="6" :center="[4, 9]" class="leaflet-map">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <DroneMarker v-for="drone in drones" :key="drone.name" :drone="drone" />
    </LMap>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LMap, LTileLayer } from "vue2-leaflet";
import DroneMarker from "./DroneMarker.vue";
import { Drone } from "@/drones/schema";

@Component({
    components: {
        DroneMarker,
        LMap,
        LTileLayer,
    },
})
export default class Map extends Vue {
    @Prop({ required: true })
    private drones!: Drone[];
}
</script>

<style scoped>
.leaflet-map {
    height: 80vh;
    width: 100%;
}
</style>
