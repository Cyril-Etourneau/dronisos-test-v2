import HistoryLine from "@/components/HistoryLine.vue";
import { DroneStatus } from "@/drones/status";

export default {
    title: "Components/HistoryLine",
    component: HistoryLine,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Displays one history snapshot row with timestamp, status, and drone coordinates.",
            },
        },
    },
};

const Template = (args, { argTypes }) => ({
    components: { HistoryLine },
    props: Object.keys(argTypes),
    render(h) {
        return h("div", { style: { maxWidth: "720px" } }, [
            h(HistoryLine, {
                props: this.$props,
            }),
        ]);
    },
});

export const OkStatus = Template.bind({});
OkStatus.args = {
    timestamp: "2026-03-16T10:00:00.000Z",
    drone: {
        name: "Drone Alpha",
        position: [2.3522, 48.8566, 120],
        status: DroneStatus.Ok,
    },
};

export const LowBattery = Template.bind({});
LowBattery.args = {
    timestamp: "2026-03-16T10:01:00.000Z",
    drone: {
        name: "Drone Beta",
        position: [3.0573, 50.6292, 90],
        status: DroneStatus.LowBattery,
    },
};

export const CriticalStatus = Template.bind({});
CriticalStatus.args = {
    timestamp: "2026-03-16T10:02:00.000Z",
    drone: {
        name: "Drone Gamma",
        position: [5.3698, 43.2965, 60],
        status: DroneStatus.MotorKo,
    },
};
