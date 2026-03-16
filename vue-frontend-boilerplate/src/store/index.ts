import Vue from "vue";
import Vuex from "vuex";
import { Drone } from "@/drones/schema";
import { fetchDrones } from "@/utils/server";

Vue.use(Vuex);

/** Root Vuex state shape. */
type StoreState = {
    drones: Drone[];
};

/**
 * Central store for drone state and synchronization actions.
 *
 * Prototype: `Store<StoreState>`
 */
const store = new Vuex.Store<StoreState>({
    state: {
        drones: [],
    },
    getters: {
        /** Returns all drones from state. */
        getDrones(state): Drone[] {
            return state.drones;
        },
    },
    mutations: {
        /** Replaces the drones list in state. */
        setDrones(state, drones: Drone[]) {
            state.drones = drones;
        },
    },
    actions: {
        /** Fetches drones from backend and commits them into state. */
        async syncDrones({ commit }) {
            const drones = await fetchDrones();
            commit("setDrones", drones);
        },
    },
    modules: {},
});

export { StoreState };
export default store;
