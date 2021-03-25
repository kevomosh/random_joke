<template>
  <div>
    <Navbar />
    <v-card max-width="900" class="mx-auto mt-2">
      <v-card-subtitle v-if="allJokes.length === 0">Click on either button</v-card-subtitle>
      <v-list three-line>
        <template v-for="(item, index) in allJokes" >
          <v-divider :key="item.id"></v-divider>
          <v-list-item :key="item.punchline" @dblclick="deleteJoke(item.id)" >
            <v-list-item-avatar color="teal">
              <span class="white--text headline">{{index + 1}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.setup"></v-list-item-title>
              <v-list-item-subtitle v-html="item.punchline"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-card-actions>
          <v-btn outlined @click="getJoke">Add Joke</v-btn>
          <v-btn outlined @click="getTenJokes">Add 10 Jokes</v-btn>
          <v-btn v-if="allJokes.length > 0" outlined @click="clearJokes">Clear</v-btn>
      </v-card-actions>
    </v-card>

  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from "@/components/Navbar.vue";
import {mapGetters, mapActions} from "vuex";
import {JokeAction} from "@/store/ActionTypes";


export default Vue.extend({
  name: 'Home',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({allJokes: "getPickedJokes"})
  },
  methods: {
    ...mapActions({
      getJoke: JokeAction.GET_SINGLE_JOKE,
      getTenJokes: JokeAction.GET_TEN_JOKES,
      deleteJoke: JokeAction.DELETE_JOKE,
      clearJokes: JokeAction.CLEAR_ALL
    }),

  }
});
</script>
