import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		title: '玖红金服'
	},
	mutations: {
		setTitle(state, payload) {
			state.title = payload.title;
		}
	}
});

