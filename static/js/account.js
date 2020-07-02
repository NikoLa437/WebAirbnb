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
			    savedPassword:'',
		    	oldpassword:'',
			    password:'',
			    againpassword:'',
			    usernameError:'',
			    nameError:'',
			    surnameError:'',
			    genderError:'',
			    againpasswordError:'',
			    passwordError:'',
			    uniqueError:'',
			    oldpasswordError:'',
			    backup:[],
			    mode:"BROWSE"
		    }
	},
	template: ` 
<div>
<table>
<tr>
<td>
	<table v-bind:disabled="mode=='PASSWORD'">
		<tr>
			<td>Korisnicko ime:</td>
			<td><input class="input" disabled="true" type="text" v-model="username" name="username"/></td>
		</tr>
		<tr>
			<td>Ime:</td>
			<td><input class="input" v-bind:disabled="mode=='BROWSE' || mode=='PASSWORD'" placeholder="Unesite ime" type="text" v-model="name" name="name"/></td>
			<td ><p style="color: red" >{{nameError}}</p></td>	
		</tr>
		<tr>
			<td>Prezime:</td>
			<td><input class="input" v-bind:disabled="mode=='BROWSE' || mode=='PASSWORD'" placeholder="Unesite prezime" type="text" v-model="surname" name="surname"/></td>
			<td ><p style="color: red" >{{surnameError}}</p></td>	
		</tr>
		<tr>
			<td>Pol:</td>
			<td>
  				<div class="pol"><input type="radio" v-bind:disabled="mode=='BROWSE' || mode=='PASSWORD'" name="gender" v-model="gender" value="male"> Muski<br></div>
  				<div class="pol"><input type="radio" v-bind:disabled="mode=='BROWSE' || mode=='PASSWORD'" name="gender" v-model="gender" value="female"> Zenski<br></div>
			</td>
			<td ><p style="color: red" >{{genderError}}</p></td>	
		</tr>
		<tr>
			<td><button v-on:click="paswordChange" id="buttonPassword">Izmena lozinke</button><br /></td>		
		</tr>
		<tr>
			<td align="right"><button v-on:click="checkFormValid" v-bind:hidden="mode!='EDIT'" class="buttonSave">Sacuvaj</button><button v-on:click="izmeniKlik" v-bind:disabled="mode=='PASSWORD'" class="buttonChangeUser">Izmeni</button></td>
			<td><button v-on:click="odustanakEvent" class="buttonOdustanak">Odustanak</button><br /></td>
		</tr>
	</table>
</td>
<td>
	<table v-bind:hidden="mode!='PASSWORD'">
		<tr>
			<td>Stara lozinka:</td>
			<td><input class="input" placeholder="Unesite lozinku" v-model="oldpassword" type="password" name="oldpassword"/></td>
			<td ><p style="color: red" >{{oldpasswordError}}</p></td>		
		</tr>
		<tr>
			<td>Nova lozinka:</td>
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
			<td  align="right"><button v-on:click="izmenaLozinke" class="buttonChangeUser">Izmeni lozinku</button></td><td><button v-on:click="odustanaPasswordkEvent" class="buttonOdustanak">Odustani</button><br /></td>
		</tr>
	</table>
</td>
</tr>
</table>

</div>
`
	, 
	mounted(){
		axios
		.get("/users/log/test")
		.then(response => {
			if(response.data != null){
				this.username= response.data.username;
				this.name= response.data.name;
				this.surname= response.data.surname;
				this.gender =response.data.gender;
				this.savedPassword = response.data.password;
				this.password = response.data.password;
				this.backup = [this.username, this.name, this.surname, this.gender];
			}else{
      		  window.location.href = "http://localhost:8080/#/login";
			}
		})
	},
	methods : {
		checkFormValid : function() {
			this.usernameError = '';
			this.nameError='';
			this.surnameError='';
			this.genderError='';
			
			
			if(this.name == ""){
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
			else
				{
		      			  this.mode = "BROWSE";
		        		  let user = {username: this.username, name : this.name, surname : this.surname, gender : this.gender, password : this.password};
		        		  axios
			  				.put("/users/update", JSON.stringify(user))
			  				.then(response => toast('Informacije su uspesno izmenjene'));
						 
		        		  //window.location.href = "http://localhost:8080/";
						}
		         
				
				
				
		},
		izmeniKlik : function(){
			this.mode = "EDIT";
		},
		odustanakEvent : function(){
			this.username= this.backup[0];
			this.name= this.backup[1];
			this.surname= this.backup[2];
			this.gender =this.backup[3];
			window.location.href = "http://localhost:8080/";
		},
		paswordChange : function(){
			this.mode = "PASSWORD";
		},
		izmenaLozinke : function(){
			this.againpasswordError='';
			this.passwordError='';
			this.uniqueError='';
			this.oldpasswordError = '';
			
			if(this.oldpassword == "")
				this.oldpasswordError = "Stara lozinka se mora uneti!";
			else if(this.password == "")
				this.passwordError = 'Sifra je obavezno polje!';
			else if(this.againpassword == "")
				this.againpasswordError = 'Sifra se mora ponovo uneti!';
			else if(this.againpassword != this.password)
				this.passwordError =  'Sifre se moraju poklapati!';
			else if(this.savedPassword != this.oldpassword){
				this.oldpasswordError =  'Stara lozinka nije validna!';
			}else
				{	
				this.mode = "BROWSE";
				
				let user = {username: this.username, name : this.name, surname : this.surname, gender : this.gender, password : this.password};

				axios
				.put("/users/update", JSON.stringify(user))
				.then(response => toast('Lozinka je uspesno izmenjena!'));
				
			    this.savedPassword= this.password;
			    this.oldpassword = this.password;
			    this.againpassword= this.password;
			}
		},
		odustanaPasswordkEvent: function(){
			this.mode = "BROWSE";
		}
	}
});

