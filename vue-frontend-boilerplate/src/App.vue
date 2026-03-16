<template>
    <v-app>
        <v-app-bar app color="amber darken-1" dark />
        <v-main>
            <HelloWorld />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
    name: "App",
    components: {
        HelloWorld,
    },
});
</script>
