<template>
    <LPopup>
        <v-col>
            <div class="drone-name">{{ drone.name }}</div>
            <div>
                Status: <span :class="colorClass">{{ drone.status }}</span>
            </div>
            <div>Position (lng, lat, height):</div>
            <div>{{ drone.position[0] }}</div>
            <div>{{ drone.position[1] }}</div>
            <div>{{ drone.position[2] }}</div>
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
        switch (this.statusColor) {
            case "green":
                return "drone-status--green";
            case "orange":
                return "drone-status--orange";
            case "red":
                return "drone-status--red";
            default:
                return "drone-status--black";
        }
    }
}
</script>

<style scoped>
.drone-name {
    font-weight: bold;
    padding-bottom: 1em;
}

.drone-status--green {
    color: green;
}

.drone-status--orange {
    color: orange;
}

.drone-status--red {
    color: red;
}

.drone-status--black {
    color: black;
}
</style>
