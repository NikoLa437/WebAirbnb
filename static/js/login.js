function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


Vue.component("login", {
	data: function () {
		    return {
		    	username: '',
			    password:''
		    }
	},
	template: ` 
<div>

<form v-on:submit.prevent="checkFormValid" method="post">
	<table class="table">
		<tr>
			<td>Korisnicko ime:</td>
			<td><input class="input" placeholder="Unesite korisnicko ime" type="text" v-model="username" name="username"/></td>	
		</tr>
		<tr>
			<td>Lozinka:</td>
			<td><input class="input" placeholder="Unesite lozinku" v-model="password" type="password" name="password"/></td>	
		</tr>
		<tr>
			<td colspan="2" align="center"><input type="submit"  value="Uloguj se"/></td>
		</tr>
	</table>
</form>
</div>
`
	, 
	methods : {
		checkFormValid : function() {

			if(this.username == "")
				toast('Korisnicko ime je obavezno polje!');
			else if(this.password == "")
				toast('Sifra je obavezno polje!');
			else
				{
				 axios
				 .post('http://localhost:8000/users/login', {
					    Username: this.username,
					    Password: this.password
					  })
					  .then(function (response) {
					    console.log("TEST");
					  })
				 
				 
				 window.location.href = "http://localhost:8000/";
				}
		}
	}
});
