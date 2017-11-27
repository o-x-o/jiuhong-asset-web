import Vue from 'vue';
import Router from 'vue-router';
import Declaration from '_P/Declaration';
import About from '_P/About';
import Contact from '_P/Contact';
import Category from '_P/Category';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: '报单信息',
			component: Declaration
		},
		{
			path: '/about',
			name: '关于我们',
			component: About
		},
		{
			path: '/contact',
			name: '联系我们',
			component: Contact
		},
		{
			path: '/category',
			name: '产品分类',
			component: Category
		}

	]
});
