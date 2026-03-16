import Vue from "vue";
import Vuex from "vuex";
import { Drone } from "@/drones/schema";
import { fetchDrones } from "@/utils/server";

Vue.use(Vuex);

type DroneFetch = {
    timestamp: string;
    drones: Drone[];
}

/** Root Vuex state shape. */
type StoreState = {
    drones: Drone[];
    history: DroneFetch[];
};

/**
 * Central store for drone state and synchronization actions.
 *
 * Prototype: `Store<StoreState>`
 */
const store = new Vuex.Store<StoreState>({
    state: {
        drones: [],
        history: [],
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
        /** Adds a drone fetch entry to history. */
        updateHistory(state, { timestamp, drones }: DroneFetch) {
            state.history.unshift({ timestamp, drones });
            if (state.history.length > 10) {
                state.history.pop();
            }
        },
    },
    actions: {
        /** Fetches drones from backend and commits them into state. */
        async syncDrones({ commit }) {
            const drones = await fetchDrones();
            commit("setDrones", drones);
            const timestamp = new Date().toISOString();
            commit("updateHistory", { timestamp, drones });
        },
    },
    modules: {},
});

export { StoreState };
export default store;
