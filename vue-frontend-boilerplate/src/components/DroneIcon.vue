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
        return `drone-status--${this.color}`;
    }
}
</script>

<style scoped>
.drone-icon {
    font-size: 16px;
    line-height: 16px;
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
