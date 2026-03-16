import Map from "@/components/Map.vue";
import { DroneStatus } from "@/drones/status";

export default {
  title: "Components/Map",
  component: Map,
  tags: ["autodocs"],
};

const Template = (args, { argTypes }) => ({
  components: { Map },
  props: Object.keys(argTypes),
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
