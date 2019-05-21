import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		timeline: {
			title: '',
			id: 0
		},
		popAddDialog: false
	},
	mutations: {
		setTimeline(state, title) {
			state.timeline = title;
		},
		setPopStatus(state, pop){
			state.popAddDialog = pop;
		}
	},
	actions: {

	},
	getters: {
		get_timeline: state => {
			return state.timeline;
		}
	}
})
