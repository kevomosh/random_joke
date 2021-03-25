import Vue from 'vue'
import Vuex from 'vuex'
import {JokeInfo} from "@/store/JokeInfo";
import {JokeMutation} from "@/store/MutationTypes";
import {JokeAction} from "@/store/ActionTypes";

Vue.use(Vuex)

interface JokeStateInfo {
  pickedJokes: JokeInfo[]
}

const jokeState: JokeStateInfo = {
  pickedJokes: []
}

const baseUrl = "https://official-joke-api.appspot.com/jokes"

export default new Vuex.Store({
  state: jokeState,
  mutations: {

    [JokeMutation.UPDATE_PICKED_JOKES](state, payload: JokeInfo[]): void {
      state.pickedJokes = payload
    }
  },
  actions: {
    async [JokeAction.GET_SINGLE_JOKE]({commit, state}): Promise<void>{
      const res = await fetch(`${baseUrl}/random`)
      const data = await res.json();
      const pickedList = [...state.pickedJokes, data];
      commit(JokeMutation.UPDATE_PICKED_JOKES, pickedList)
    },

    async [JokeAction.GET_TEN_JOKES]({commit, state}): Promise<void> {
      const res = await fetch(`${baseUrl}/ten`)
      const data = await res.json();
      const mergedJokes = [...state.pickedJokes, ...data];
      commit(JokeMutation.UPDATE_PICKED_JOKES, mergedJokes);
    },

    [JokeAction.DELETE_JOKE]({commit, state}, id: number): void {
      const newList = state.pickedJokes.filter(j => j.id !== id);
      commit(JokeMutation.UPDATE_PICKED_JOKES, newList);
    },

    [JokeAction.CLEAR_ALL]({commit}): void{
      commit(JokeMutation.UPDATE_PICKED_JOKES, [])
    }
  },

  getters: {
    getPickedJokes(state): JokeInfo[] {
      return state.pickedJokes;
    }
  },

  modules: {
  }
})
