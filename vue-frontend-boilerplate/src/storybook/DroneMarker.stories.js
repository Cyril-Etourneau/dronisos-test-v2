import { LMap, LTileLayer } from "vue2-leaflet";
import DroneMarker from "@/components/DroneMarker.vue";
import { DroneStatus } from "@/drones/status";

export default {
  title: "Components/DroneMarker",
  component: DroneMarker,
  tags: ["autodocs"],
  argTypes: {
    onOpenHistory: { action: "open-history" },
  },
};

const Template = (args, { argTypes }) => ({
  components: {
    DroneMarker,
    LMap,
    LTileLayer,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      zoom: 8,
      center: [48.8566, 2.3522],
    };
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
            h(DroneMarker, {
              props: {
                drone: this.drone,
              },
              on: {
                "open-history": this.onOpenHistory,
              },
            }),
          ],
        ),
      ],
    );
  },
});

export const Default = Template.bind({});
Default.args = {
  drone: {
    name: "Drone Marker",
    position: [2.3522, 48.8566, 120],
    status: DroneStatus.Ok,
  },
};

export const AlertStatus = Template.bind({});
AlertStatus.args = {
  drone: {
    name: "Drone Alert",
    position: [2.35, 48.86, 80],
    status: DroneStatus.MotorKo,
  },
};

export const LowBattery = Template.bind({});
LowBattery.args = {
  drone: {
    name: "Drone Low Battery",
    position: [2.33, 48.84, 95],
    status: DroneStatus.LowBattery,
  },
};
