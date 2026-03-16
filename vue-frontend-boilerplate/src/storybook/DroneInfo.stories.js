import DroneInfo from "@/components/DroneInfo.vue";
import store from "@/store";
import { DroneStatus } from "@/drones/status";

export default {
    title: "Components/DroneInfo",
    component: DroneInfo,
    tags: ["autodocs"],
};

const sampleDrones = [
    {
        name: "Drone Alpha",
        position: [2.3522, 48.8566, 120],
        status: DroneStatus.Ok,
    },
    {
        name: "Drone Beta",
        position: [3.0573, 50.6292, 90],
        status: DroneStatus.LowBattery,
    },
    {
        name: "Drone Gamma",
        position: [5.3698, 43.2965, 60],
        status: DroneStatus.MotorKo,
    },
];

const Template = () => ({
    components: { DroneInfo },
    data() {
        return {
            originalDispatch: null,
        };
    },
    created() {
        this.originalDispatch = store.dispatch;
        store.commit("setDrones", sampleDrones);
        store.dispatch = () => Promise.resolve(sampleDrones);
    },
    beforeDestroy() {
        store.dispatch = this.originalDispatch;
    },
    render(h) {
        return h(DroneInfo);
    },
});

export const Default = Template.bind({});
