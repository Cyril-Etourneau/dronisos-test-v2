import router from "@/router";
import { Route } from "vue-router";

describe("router", () => {
  it("uses history mode", () => {
    expect(router.mode).toBe("history");
  });

  it("registers the root drones route", async () => {
    const routes = router.options.routes || [];
    const dronesRoute = routes.find((route) => route.name === "drones");
    const singleViewRoute = dronesRoute as
      | { component?: (() => Promise<{ default: unknown }>) | unknown; path?: string }
      | undefined;

    expect(dronesRoute).toBeTruthy();
    expect(singleViewRoute?.path).toBe("/");
    expect(typeof singleViewRoute?.component).toBe("function");

    const loaded = await (
      singleViewRoute?.component as () => Promise<{ default: unknown }>
    )();

    expect(loaded.default).toBeTruthy();
  });

  it("returns saved position when available", () => {
    const savedPosition = { x: 12, y: 34 };
    const scrollBehavior = router.options.scrollBehavior;
    const toRoute = { path: "/" } as Route;
    const fromRoute = { path: "/previous" } as Route;

    expect(scrollBehavior).toBeTruthy();
    expect(scrollBehavior?.(toRoute, fromRoute, savedPosition)).toEqual(savedPosition);
  });

  it("falls back to top-left when no saved position", () => {
    const scrollBehavior = router.options.scrollBehavior;
    const toRoute = { path: "/" } as Route;
    const fromRoute = { path: "/previous" } as Route;

    expect(scrollBehavior).toBeTruthy();
    expect(scrollBehavior?.(toRoute, fromRoute, undefined)).toEqual({ x: 0, y: 0 });
  });
});
