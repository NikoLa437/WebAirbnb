Vue.component("login", {
	data: function () {
		    return {
		    	logged : null,
		    	username: '',
			    password:''
		    }
	},
	template: ` 
<div id="logovanje">

<form v-on:submit.prevent="checkFormValid" method="post">
	<table class="table" v-bind:hidden="logged">
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
	<p v-bind:hidden="!logged">Kosirnik je vec ulogovan!</p>
	<button v-bind:hidden="!logged" id="buttonBrisanje">Odjava</button><br />
</form>
</div>
`
	, 
	mounted () {
       axios
        .get('/users/log/test')
        .then(response => {
        	if(response.data == null)
        		this.logged = false;
        	else
        		this.logged = true;
        })

    },
	methods : {
		checkFormValid : function() {
			if(this.username == "")
				toast('Korisnicko ime je obavezno polje!');
			else if(this.password == "")
				toast('Sifra je obavezno polje!');
			else
				{
				let loginData = {username: this.username, password : this.password};

				
				axios
		          .post('/users/login', JSON.stringify(loginData))
				  .then(function (response) {
					  if(response.data!=null){
						  //TODO 1: set cookie
						  window.location.href = "http://localhost:8080/";
					  }
					  else{
						  //TODO 2: napraviti neki lepsi nacin prikaza 
						  alert("Uneti su pogresni podaci");
					  }

					  
					})
      		  	
				
				}
		}
	}
});

