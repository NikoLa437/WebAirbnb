const registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const login = { template: '<login></login>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/register', component: registration },
	    { path: '/login', component: login }
	  ]
});

var app = new Vue({
	router,
	el: '#initialSearch'
});

