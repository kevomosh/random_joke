<template>
  <v-app>
    <v-main class="mx-4 mb-4 grey lighten-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

});
</script>
