import Map from "@/components/Map.vue";
import { DroneStatus } from "@/drones/status";
import store from "@/store";

export default {
  title: "Components/Map",
  component: Map,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Interactive map with drone markers. Clicking a marker opens the selected drone history panel built from store history snapshots.",
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Map },
  props: Object.keys(argTypes),
  created() {
    store.state.history = [
      {
        timestamp: "2026-03-16T10:00:00.000Z",
        drones: [
          {
            name: "Drone Alpha",
            position: [2.34, 48.85, 118],
            status: DroneStatus.Ok,
          },
        ],
      },
      {
        timestamp: "2026-03-16T10:01:00.000Z",
        drones: [
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
        ],
      },
    ];
  },
  render(h) {
    return h(Map, {
      props: this.$props,
    });
  },
});

export const Default = Template.bind({});
Default.args = {
  drones: [
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
  ],
};
