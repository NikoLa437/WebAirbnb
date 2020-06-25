function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


Vue.component("registration", {
	data: function () {
		    return {
		    	username: '',
			    name: '',
			    surname: '',
			    gender: '',
			    password:'',
			    againpassword:''
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
			<td>Ime:</td>
			<td><input class="input" placeholder="Unesite ime" type="text" v-model="name" name="name"/></td>	
		</tr>
		<tr>
			<td>Prezime:</td>
			<td><input class="input" placeholder="Unesite prezime" type="text" v-model="surname" name="surname"/></td>	
		</tr>
		<tr>
			<td>Pol:</td>
			<td>
  				<div class="pol"><input type="radio" name="gender" v-model="gender" value="male"> Muski<br></div>
  				<div class="pol"><input type="radio" name="gender" v-model="gender" value="female"> Zenski<br></div>
			</td>	
		</tr>
		<tr>
			<td>Lozinka:</td>
			<td><input class="input" placeholder="Unesite lozinku" v-model="password" type="password" name="password"/></td>	
		</tr>
		<tr>
			<td>Ponovo unesite lozinku:</td>
			<td><input class="input" placeholder="Ponovo unesite lozinku" v-model="againpassword" type="password" name="aggainpassword"/></td>	
		</tr>
		<tr>
			<td colspan="2" align="center"><input type="submit"  value="Registruj se"/></td>
		</tr>
	</table>
</form>
</div>
`
	, 
	methods : {
		checkFormValid : function() {

			if(this.username == "")
				toast('Username je obavezno polje!');
			else if(this.name == "")
				toast('Ime je obavezno polje!');
			else if(!initialIsCapital(this.name))
				toast('Ime mora poceti velikim slovom!');
			else if(this.surname == "")
				toast('Prezime je obavezno polje!');
			else if(!initialIsCapital(this.surname))
				toast('Prezime mora poceti velikim slovom!');
			else if(this.gender == "")
				toast('Pol je obavezno polje!');
			else if(this.password == "")
				toast('Sifra je obavezno polje!');
			else if(this.againpassword == "")
				toast('Sifra se mora ponovo uneti!');
			else if(this.againpassword != this.password)
				toast('Sifre se moraju poklapati!');
			else
				{
				let user = {username: this.username, name : this.name, surname : this.surname, gender : this.gender, password : this.password};
				 axios
		          .post('http://localhost:8080/users/add', JSON.stringify(user))
		          .then(response => toast('Korisnik ' + this.username + ' uspesno dodat!'));
				 
				 window.location.href = "http://localhost:8080/";
				}
		}
	}
});

