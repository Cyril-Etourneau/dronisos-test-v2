import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import { Position } from "vue-router/types/router";

Vue.use(VueRouter);

/**
 * Route definitions for the application.
 *
 * Prototype: `RouteConfig[]`
 */
const routes: RouteConfig[] = [
    {
        name: "drones",
        path: "/",
        component: () => import("@/components/DroneInfo.vue"),
    },
];

/**
 * Computes the next scroll position on navigation.
 *
 * Prototype:
 * `scrollBehavior(to: Route, from: Route, savedPosition: void | Position): Position`
 *
 * @param to Target route being navigated to.
 * @param from Current route being navigated from.
 * @param savedPosition Browser-provided scroll position for popstate navigation.
 * @returns Saved position when available, otherwise top-left `{ x: 0, y: 0 }`.
 */
function scrollBehavior(
    to: Route,
    from: Route,
    savedPosition: void | Position,
): Position {
    void to;
    void from;
    return savedPosition ?? { x: 0, y: 0 };
}

/**
 * Main Vue Router instance.
 *
 * Prototype: `VueRouter`
 */
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior,
});

export default router;
