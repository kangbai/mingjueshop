import Vue from 'vue';
import Vuex from 'vuex';
import { initialState, actions, mutations } from './store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations
})