import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import "./leaflet";
import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
    store,
    vuetify,
}).$mount("#app");
