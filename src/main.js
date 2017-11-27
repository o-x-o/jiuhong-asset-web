// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { mapMutations } from 'vuex';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import { path } from '@/config/vars';
import '_A/css/muse-ui-theme.less';
import '_A/css/base.scss';

import App from '@/App';
import store from '@/store';
import router from '@/router';

Vue.use(MuseUI);

Vue.config.productionTip = false;

/* 全局变量 global是node里的全局变量 不是window */
Object.defineProperty(global, '$path', { value: path });

Vue.directive('focus', {
	inserted(el, binding) {
		if (binding.arg !== undefined) {
			el.querySelector(binding.arg).focus();
		} else {
			el.focus();
		}
	}
});

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
