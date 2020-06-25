const registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/register', component: registration }
	  ]
});

var app = new Vue({
	router,
	el: '#initialSearch'
});

