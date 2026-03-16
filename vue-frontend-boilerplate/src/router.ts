import DroneInfo from "@/components/DroneInfo.vue";
import Vue from "vue";
import VueRouter, {RouteConfig, Route} from "vue-router";
import { Position } from "vue-router/types/router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        name: "drones",
        path: "/",
        component: DroneInfo,
    },
];

function scrollBehavior(
  to: Route,
  from: Route,
  savedPosition: void | Position
): Position {
  return savedPosition ?? { x: 0, y: 0 };
}

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior,
});

export default router;
