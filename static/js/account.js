function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


Vue.component("account", {
	data: function () {
		    return {
		    	username: '',
			    name: '',
			    surname: '',
			    gender: '',
			    password:'',
			    againpassword:'',
			    usernameError:'',
			    nameError:'',
			    surnameError:'',
			    genderError:'',
			    againpasswordError:'',
			    passwordError:'',
			    uniqueError:''
		    }
	},
	template: ` 
<div>

<form v-on:submit.prevent="checkFormValid" method="post">
	<table class="table">
		<tr>
			<td>Ime:</td>
			<td><input class="input" placeholder="Unesite ime" type="text" v-model="name" name="name"/></td>
			<td ><p style="color: red" >{{nameError}}</p></td>	
		</tr>
		<tr>
			<td>Prezime:</td>
			<td><input class="input" placeholder="Unesite prezime" type="text" v-model="surname" name="surname"/></td>
			<td ><p style="color: red" >{{surnameError}}</p></td>	
		</tr>
		<tr>
			<td>Pol:</td>
			<td>
  				<div class="pol"><input type="radio" name="gender" v-model="gender" value="male"> Muski<br></div>
  				<div class="pol"><input type="radio" name="gender" v-model="gender" value="female"> Zenski<br></div>
			</td>
			<td ><p style="color: red" >{{genderError}}</p></td>	
		</tr>
		<tr>
			<td>Lozinka:</td>
			<td><input class="input" placeholder="Unesite lozinku" v-model="password" type="password" name="password"/></td>
			<td ><p style="color: red" >{{passwordError}}</p></td>		
		</tr>
		<tr>
			<td>Ponovo unesite lozinku:</td>
			<td><input class="input" placeholder="Ponovo unesite lozinku" v-model="againpassword" type="password" name="aggainpassword"/></td>	
			<td ><p style="color: red" >{{againpasswordError}}</p></td>		
		</tr>
		<tr>	
			<td colspan="3" align="center"><p style="color: red" >{{uniqueError}}</p></td>		
		</tr>
		<tr>
			<td colspan="3" align="center"><input type="submit"  value="Izmeni"/></td>
		</tr>
	</table>
</form>
</div>
`
	, 
	methods : {
		checkFormValid : function() {
			this.usernameError = '';
			this.nameError='';
			this.surnameError='';
			this.genderError='';
			this.againpasswordError='';
			this.passwordError='';
			this.uniqueError='';
			
			if(this.username == "")
				this.usernameError = 'Username je obavezno polje!';
			else if(this.name == ""){
				this.nameError = "Ime je obavezno polje!"
			}
			else if(!initialIsCapital(this.name))
				this.nameError = 'Ime mora poceti velikim slovom!';
			else if(this.surname == "")
				this.surnameError = 'Prezime je obavezno polje!';
			else if(!initialIsCapital(this.surname))
				this.surnameError = 'Prezime mora poceti velikim slovom!';
			else if(this.gender == "")
				this.genderError =  'Pol je obavezno polje!';
			else if(this.password == "")
				this.passwordError = 'Sifra je obavezno polje!';
			else if(this.againpassword == "")
				this.againpasswordError = 'Sifra se mora ponovo uneti!';
			else if(this.againpassword != this.password)
				this.passwordError =  'Sifre se moraju poklapati!';
			else
				{
				 axios
		          .get('http://localhost:8080/users/' + this.username)
		          .then(response => {
		        	  
		        	  if(response.data != null){
		        		  this.uniqueError = "Uneto korisnicko ime vec postoji!";
		        	  }else{
		        	  
		        		  let user = {username: this.username, name : this.name, surname : this.surname, gender : this.gender, password : this.password};
		        		  /*axios
				          .post('http://localhost:8080/users/add', JSON.stringify(user))
				          .then(response => toast('Korisnik ' + this.username + ' uspesno dodat!'));*/
						 
		        		  window.location.href = "http://localhost:8080/";
						}
		          
		          });
				
				
				}
		}
	}
});

