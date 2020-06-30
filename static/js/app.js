const registration = { template: '<registration></registration>' }
const HomePage = { template: '<home-page></home-page>' }
const account = { template: '<account></account>' }
const users = { template: '<users></users>' }
const amenities = { template: '<amenities></amenities>' }
const login = { template: '<login></login>' }
const apartment = { template: '<apartment></apartment>' }



const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/register', component: registration },
	    { path: '/account', component: account },
	    { path: '/users', component: users },	    
	    { path: '/amenities', component: amenities },
	    { path: '/login', component: login },
	    { path: '/apartment', component: apartment }

	  ]
});

var a = new Vue({
	el: '#header',
	data: {
        mod: "PROBA"
	},
	mounted (){
		axios
        .get('/users/log/test')
        .then(response => {
        	if(response.data == null)
        		this.mod='PROBA';
        	else
        		this.mod='BLAB';
        })
	}
});

var app = new Vue({
	router,
	el: '#initialSearch'
});

