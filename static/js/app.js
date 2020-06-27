const registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const account = { template: '<account></account>' }
const users = { template: '<users></users>' }
const amenities = { template: '<amenities></amenities>' }


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/register', component: registration },
	    { path: '/account', component: account },
	    { path: '/users', component: users },	    
	    { path: '/amenities', component: amenities }

	  ]
});

var app = new Vue({
	router,
	el: '#initialSearch'
});