// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { mapMutations } from 'vuex';

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './assets/css/muse-ui-theme.less';
import './assets/css/base.scss';

import App from './App';
import store from './store';
import router from './router';

Vue.use(MuseUI);

Vue.config.productionTip = false;

/*
	jxl todo
	设置全局变量 640 ratio

	改用postcss

*/

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	methods: {
		goBack() {
			history.go(-1);
		},
		...mapMutations([
			'setTitle'
		])
	},
	render: h => h(App)
});
