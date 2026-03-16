import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import DronePopup from "@/components/DronePopup.vue";
import { DroneStatus } from "@/drones/status";

export default {
    title: "Components/DronePopup",
    component: DronePopup,
    tags: ["autodocs"],
    argTypes: {
        statusColor: {
            control: { type: "select" },
            options: ["black", "green", "orange", "red"],
        },
    },
};

const Template = (args, { argTypes }) => ({
    components: {
        DronePopup,
        LMap,
        LTileLayer,
        LMarker,
    },
    props: Object.keys(argTypes),
    data() {
        return {
            zoom: 8,
            center: [48.8566, 2.3522],
            markerPosition: [48.8566, 2.3522],
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$refs.marker && this.$refs.marker.mapObject) {
                this.$refs.marker.mapObject.openPopup();
            }
        });
    },
    render(h) {
        return h(
            "div",
            {
                style: {
                    height: "320px",
                    width: "100%",
                },
            },
            [
                h(
                    LMap,
                    {
                        props: {
                            zoom: this.zoom,
                            center: this.center,
                        },
                        style: {
                            height: "100%",
                            width: "100%",
                        },
                    },
                    [
                        h(LTileLayer, {
                            props: {
                                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                                attribution: "© OpenStreetMap contributors",
                            },
                        }),
                        h(
                            LMarker,
                            {
                                ref: "marker",
                                props: {
                                    latLng: this.markerPosition,
                                },
                            },
                            [
                                h(DronePopup, {
                                    props: {
                                        drone: this.drone,
                                        statusColor: this.statusColor,
                                    },
                                }),
                            ],
                        ),
                    ],
                ),
            ],
        );
    },
});

export const Default = Template.bind({});
Default.args = {
    statusColor: "green",
    drone: {
        name: "Drone Popup",
        position: [2.3522, 48.8566, 120],
        status: DroneStatus.Ok,
    },
};

export const Warning = Template.bind({});
Warning.args = {
    statusColor: "orange",
    drone: {
        name: "Drone Warning",
        position: [2.3, 48.9, 40],
        status: DroneStatus.LowBattery,
    },
};

export const LongCoordinates = Template.bind({});
LongCoordinates.args = {
    statusColor: "red",
    drone: {
        name: "Drone Precision",
        position: [2.35223456789, 48.85661234567, 120.987654321],
        status: DroneStatus.MotorKo,
    },
};

export const DefaultBlackStatus = Template.bind({});
DefaultBlackStatus.args = {
    drone: {
        name: "Drone Default",
        position: [1.23456789, 45.67891234, 30],
        status: DroneStatus.Ok,
    },
};
