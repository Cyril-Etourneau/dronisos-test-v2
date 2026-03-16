<template>
    <LIcon
        :iconSize="iconSize"
        :iconAnchor="iconAnchor"
        :popupAnchor="popupAnchor"
    >
        <v-icon
            class="v-icon notranslate mdi mdi-circle theme--light drone-icon"
            :class="colorClass"
        />
    </LIcon>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LIcon } from "vue2-leaflet";

@Component({
    components: {
        LIcon,
    },
})
export default class DroneIcon extends Vue {
    @Prop({ required: false, default: "black" })
    private color!: string;

    private readonly size = 16;

    protected get iconSize(): [number, number] {
        return [this.size, this.size];
    }

    protected get iconAnchor(): [number, number] {
        return [this.size / 2, this.size / 2];
    }

    protected get popupAnchor(): [number, number] {
        return [0, 0];
    }

    protected get colorClass(): string {
        switch (this.color) {
            case "green":
                return "drone-icon--green";
            case "orange":
                return "drone-icon--orange";
            case "red":
                return "drone-icon--red";
            default:
                return "drone-icon--black";
        }
    }
}
</script>

<style scoped>
.drone-icon {
    font-size: 16px;
    line-height: 16px;
}

.drone-icon--green {
    color: green;
}

.drone-icon--orange {
    color: orange;
}

.drone-icon--red {
    color: red;
}

.drone-icon--black {
    color: black;
}
</style>
