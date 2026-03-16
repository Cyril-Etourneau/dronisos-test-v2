import Vue from "vue";
import Vuetify from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.min.css";
import "leaflet/dist/leaflet.css";
import "../src/leaflet";

Vue.use(Vuetify);

const vuetify = new Vuetify({});

export const decorators = [
  () => ({
    vuetify,
    template: "<v-app><v-main><div class='pa-4'><story /></div></v-main></v-app>",
  }),
];

export const parameters = {
  controls: {
    expanded: true,
  },
};
