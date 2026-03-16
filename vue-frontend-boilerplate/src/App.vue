<template>
    <v-app>
        <v-app-bar app color="amber darken-1" dark>
            <div class="d-flex align-center drone-info">
                <v-img
                    src="@/assets/logo.png"
                    alt="Logo"
                    contain
                    max-width="32"
                    class="mr-3 logo-rounded"
                />
                <v-toolbar-title>Dronisos's drone tracking</v-toolbar-title>
            </div>
        </v-app-bar>

        <v-main>
            <v-container class="px-4 px-sm-6">
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style>
:root {
    --color-border-soft: #eceff1;
    --color-text-muted: #607d8b;
}

.drone-info {
    cursor: pointer;
}

.logo-rounded {
    overflow: hidden;
    border-radius: 0.5em;
}

.v-app-bar {
    z-index: 2000 !important;
}

.drone-name {
    font-weight: bold;
    padding-bottom: 1em;
}

.drone-status--green {
    color: green;
}

.drone-status--orange {
    color: orange;
}

.drone-status--red {
    color: red;
}

.drone-status--black {
    color: black;
}
</style>
