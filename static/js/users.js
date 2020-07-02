Vue.component("users", {
	data: function () {
		    return {
		        users: null,
		        searchedUsers:[],
		        showSearched:false,
		        user : null,
		        searchName:'',
		        searchSurname:'',
		        searchUsername:'',
		        userType:''
		    }
	},
	template: ` 
<div id="korisnici">
<table>
			<tr>
				<td><input class="input" placeholder="Unesite korisnicko ime" type="text" v-model="searchUsername" name="username"/></td>
				<td><input class="input" placeholder="Unesite ime" type="text" v-model="searchName" name="name"/></td>
				<td><input class="input" placeholder="Unesite prezime" type="text" v-model="searchSurname" name="surname"/></td>
				<td v-bind:hidden="user == 'HOST'">
					<select class="select" name="userType" v-model="userType">
						<option class="option" value=""></option>
						<option class="option" value="Guest">Gost</option>
						<option class="option" value="Host">Domacin</option>
						<option class="option" value="Administrator">Administrator</option>
					</select>
				</td>
				<td><button class="button" v-on:click="searchUser">Pretrazi</button></td>		
			</tr>
</table>
<table class="users">
		<tr>
			<th>Korisnicko ime</th>
			<th>Ime</th>
			<th>Prezime</th>
			<th>Pol</th>
			<th>Uloga</th>
		</tr>
		
		<tr v-bind:hidden="showSearched" v-for="u in users">
			<td>{{u.username }}</td>
			<td>{{u.name }}</td>
			<td>{{u.surname }}</td>
			<td>{{(u.gender == 'male') ? 'muski' : 'zenski' }}</td>
			<td v-if="u.userType == 'Guest'">Gost</td>
			<td v-else-if="u.userType == 'Administrator'">Administrator</td>
			<td v-else>Domacin</td>
		</tr>
		<tr v-bind:hidden="!showSearched" v-for="u in searchedUsers">
			<td>{{u.username }}</td>
			<td>{{u.name }}</td>
			<td>{{u.surname }}</td>
			<td>{{(u.gender == 'male') ? 'muski' : 'zenski' }}</td>
			<td v-if="u.userType == 'Guest'">Gost</td>
			<td v-else-if="u.userType == 'Administrator'">Administrator</td>
			<td v-else>Domacin</td>
		</tr>
	</table>
</div>
`
	, 
	mounted () {
        axios
          .get('/users')
          .then(response => (this.users = response.data));
        
        axios
        .get('/users/log/test')
        .then(response => {
        		if(response.data.userType == "Host")
        			this.user='HOST';
        		else 
        			this.user = 'ADMIN';
        	}
        );
    },
	methods : {
		searchUser : function(){
			if(this.searchName != '' || this.searchUsername != '' || this.userType != '' || this.searchSurname != ''){
				axios
				.get('/users/search/parameters', {
				    params: {
				        username: this.searchUsername,
				        name : this.searchName,
				        surname : this.searchSurname,
				        userType : this.userType
				      }
				    })
				.then(response => {
					this.searchedUsers = response.data;
					this.showSearched = true;
				});
			}else{
				this.showSearched = false;
			}
		}
	}
	
});

