import Vue from 'vue';
import Router from 'vue-router';
import Declaration from '@/pages/Declaration';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: '报单信息',
			component: Declaration
		}
	]
});
