Vue.component("users", {
	data: function () {
		    return {
		        users: null
		    }
	},
	template: ` 
<div id="korisnici">

<table class="users">
		<tr>
			<th>Korisnicko ime</th>
			<th>Ime</th>
			<th>Prezime</th>
			<th>Pol</th>
		</tr>
		<tr v-for="u in users">
			<td>{{u.username }}</td>
			<td>{{u.name }}</td>
			<td>{{u.surname }}</td>
			<td>{{(u.gender == 'male') ? 'muski' : 'zenski' }}</td>
		</tr>
	</table>
</div>
`
	, 
	mounted () {
        axios
          .get('/users')
          .then(response => (this.users = response.data))
    },
	methods : {

		}
	
});

