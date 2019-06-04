import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		timeline: {
			title: '',
			id: 0
		},
		popAddDialog: false,
		accessToken: '',
		isLogin: false,
		user: {}
	},
	mutations: {
		setTimeline(state, title) {
			state.timeline = title;
		},
		setPopStatus(state, pop) {
			state.popAddDialog = pop;
		},
		setAuthToken(state, opt) {
			state.accessToken = opt.token;
			if (opt.token)
				state.isLogin = true;
			if (opt.rememberMe)
				window.localStorage.setItem('token', opt.token);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + opt.token;
		},
		clearAuthToken(state) {
			state.isLogin = false;
			state.accessToken = '';
			axios.defaults.headers.common['Authorization'] = '';
			window.localStorage.clear();
		},
		setUserInfo(state, user) {
			state.user = user;
			window.localStorage.setItem('username', user.userName);
			window.localStorage.setItem('uid', user.userId);
		}
	},
	actions: {

	},
	getters: {
		get_timeline: state => {
			return state.timeline;
		},
		isLogin: state => {
			if (!state.isLogin) {
				var token = window.localStorage.getItem('token');
				if (token) {
					state.isLogin = true;
					axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
					state.user = {
						userName: window.localStorage.getItem('username'),
						uid: window.localStorage.getItem('uid')
					}
				}
			}
			return state.isLogin;
		},
		authInfo: state => state.user
	}
})
