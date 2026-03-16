<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
         Dronisos's frontend boilerplate
        </h1>

        <p class="subheading font-weight-regular">
        This simple boilerplate is supposed to get you started on the test.<br>
        However everything included in this project is free to be changed !<br>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Map libraries
        </h2>
        <p class="mb-4">
    Here is some ideas of map libraries to help you complete your task.<br>
    Your choice is completely free, even if your choice is not included here<br>
        </p>
        <v-row justify="center">
          <a
            v-for="(library, i) in mapLibraries"
            :key="i"
            :href="library.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ library.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Installed CLI plugins
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in plugins"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Ecosystem
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vue-router',
        href: 'https://router.vuejs.org',
      },
      {
        text: 'vue-devtools',
        href: 'https://vuex.vuejs.org',
      },
      {
        text: 'awesome-vue',
        href: 'https://github.com/vuejs/awesome-vue',
      },
      {
        text: 'vue-loader',
        href: 'https://vue-loader.vuejs.org',
      },
      {
        text: 'vuetify',
        href: 'https://vuetifyjs.com/en/',
      },
    ],
    plugins: [
      {
        text: 'babel',
        href: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel',
      },
      {
        text: 'typescript',
        href: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript',
      },
      {
        text: 'pwa',
        href: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa',
      },
      {
        text: 'vuex',
        href: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex',
      },
      {
        text: 'eslint',
        href: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint',
      },
    ],
    mapLibraries: [
      {
        text: 'Vue2 Leaflet',
        href: 'https://vue2-leaflet.netlify.app/',
      },
      {
        text: 'Vue layers',
        href: 'https://vuelayers.github.io/#/',
      },
      {
        text: 'Vue Mapbox',
        href: 'https://soal.github.io/vue-mapbox/',
      },
    ],
  }),
});
</script>
