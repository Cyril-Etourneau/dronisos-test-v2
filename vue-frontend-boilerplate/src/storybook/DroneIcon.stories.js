import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import DroneIcon from "@/components/DroneIcon.vue";

export default {
  title: "Components/DroneIcon",
  component: DroneIcon,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["black", "green", "orange", "red"],
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: {
    DroneIcon,
    LMap,
    LTileLayer,
    LMarker,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      zoom: 6,
      center: [48.8566, 2.3522],
      markerPosition: [48.8566, 2.3522],
    };
  },
  template: `
    <div style="height: 320px; width: 100%;">
      <LMap :zoom="zoom" :center="center" style="height: 100%; width: 100%;">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LMarker :lat-lng="markerPosition">
          <DroneIcon :color="color" />
        </LMarker>
      </LMap>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  color: "black",
};

export const Green = Template.bind({});
Green.args = {
  color: "green",
};

export const Orange = Template.bind({});
Orange.args = {
  color: "orange",
};

export const Red = Template.bind({});
Red.args = {
  color: "red",
};
