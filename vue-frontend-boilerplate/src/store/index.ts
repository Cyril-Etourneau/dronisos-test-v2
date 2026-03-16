import Vue from "vue";
import Vuex from "vuex";
import { Drone } from "@/drones/schema";
import { fetchDrones } from "@/utils/server";

Vue.use(Vuex);

type StoreState = {
    drones: Drone[];
};

const store = new Vuex.Store<StoreState>({
    state: {
        drones: [],
    },
    getters: {
        getDrones(state): Drone[] {
            return state.drones;
        },
    },
    mutations: {
        setDrones(state, drones: Drone[]) {
            state.drones = drones;
        },
    },
    actions: {
        async syncDrones({ commit }) {
            const drones = await fetchDrones();
            commit("setDrones", drones);
        },
    },
    modules: {},
});

export default store;
