function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


function transliterate(string) {
    var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
    var latin = 'A_B_V_G_D_Dj_E_Ë_Z_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_C_U_F_H_C_C_Dz_S_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_dj_e_ë_z_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_c_u_f_h_c_c_dz_s_s_ʺ_y_ʹ_è_û_â'.split('_')

    return string.split('').map(function(char) {
      var index = cyrillic.indexOf(char)
      if (!~index)
        return char
      return latin[index]
    }).join('')
  }


Vue.component("editApartment", {
	data: function () {
		    return {
		    	placesAutocomplete:null,
		    	apartment:{},
		    	apartmentTypeError: '',
		    	numberOfRoomsError: '',
		    	numberOfGuestsError: '',
		    	priceError: '',
		    	checkInTimeError: '',
		    	checkOutTimeError: '',
		        city: '',
		        postNumber:'',
		        street:'',
		        streetError:'',
		        streetNumber:'',
		        streetNumberError:'',
		        longitude:'',
		        latitude:'',
                imagesForBackend: [],
                imageSize: '40%',
                imageCount: 0,
                width:window.screen.availWidth/5.5
			    }
	},
	template: ` 
<div>

<form v-on:submit.prevent="checkFormValid" method="post">
<table  style="width:100%">
<tr>
<td style="width:50%">
	<table class="table"  style="width:60%">
		<tr>
			<td>Tip apartmana:</td>
			<td>
  				<div class="pol"><input type="radio" name="apartmentType" v-model="apartment.type" value="room"> Soba<br></div>
  				<div class="pol"><input type="radio" name="apartmentType" v-model="apartment.type" value="apartment"> Apartman<br></div>
			</td>
			<td ><p style="color: red" >{{apartmentTypeError}}</p></td>	
		</tr>
		<tr>
			<td>Broj soba:</td>
			<td><input class="input" placeholder="Unesite broj soba" type="number" min="1" v-model="apartment.numberOfRoom" name="numberOfRooms"/></td>
			<td ><p style="color: red" >{{numberOfRoomsError}}</p></td>	
		</tr>
		<tr>
			<td>Broj gostiju:</td>
			<td><input class="input" placeholder="Unesite broj gostiju" type="number" min="1" v-model="apartment.numberOfGuest" name="numberOfGuests"/></td>
			<td ><p style="color: red" >{{numberOfGuestsError}}</p></td>	
		</tr>
		<tr>
			<td>Cena po noci:</td>
			<td><input class="input" placeholder="Unestice cenu" type="number" min="0" v-model="apartment.priceForNight" name="price"></td>
			<td>din</td>
			<td ><p style="color: red" >{{priceError}}</p></td>	
		</tr>
		<tr>
			<td>Vreme za prijavu:</td>
			<td><input class="input" placeholder="Unestice cenu" type="time" v-model="apartment.checkInTime" name="checkInTime"></td>
			<td ><p style="color: red" >{{checkInTimeError}}</p></td>	
		</tr>
		<tr>
			<td>Vreme za odjavu:</td>
			<td><input class="input" placeholder="Unestice cenu" type="time" v-model="apartment.checkOutTime" name="checkOutTime"></td>
			<td ><p style="color: red" >{{checkOutTimeError}}</p></td>	
		</tr>
		<tr>
			<td>Status:</td>
			<td>
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartment.status" value="active"> Aktivan<br></div>
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartment.status" value="inactive"> Neaktivan<br></div>
			</td>
		</tr>
		<tr>
			<td colspan="2"><h3>Unesite lokaciju:</h3></td>
		</tr>
		<tr>
			<td colspan="2">
			<div class="form-group">
	    		<label for="form-address">Adresa</label>
	    		<input type="search"  class="form-control" id="form-address" placeholder="Unesite adresu" />
			</div>
			<br/>
			<div >
	    		<label >Broj:</label>
	    		<input type="number" min="1" v-model="streetNumber" name="streetNumber" class="form-control"  placeholder="Unesite broj" />
 			 <p style="color: red" >{{streetNumberError}}</p>	

			</div>
			<br/>
			<div class="form-group">
		    	<label for="form-city">Ulica:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-street">
			</div>
			<br/>

			<div class="form-group">
		    	<label for="form-city">Grad:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-city">
			</div>
			<br/>
			<div class="form-group">
		    	<label for="form-zip">Postanski broj:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-zip">
			</div>
			<br/>
			<div class="form-group">
		    	<label for="form-longitude">Geografska duzina:</label>
		    	<input type="text" class="form-control" disabled="true" id="form-longitude">
			</div>
			<br/>
			<div class="form-group">
				<label for="form-latitude">Geografska sirina</label>
		    	<input type="text" class="form-control" disabled="true" id="form-latitude">
			</div>
			<div>
				<p style="color: red" >{{streetError}}</p>
			</div>
			</td>
		</tr>
	</table>
</td>
<td style="vertical-align:top">
	<div style="float:left">
	<h1>Sadrzaj apartmana:</h1>
	
	<table class="tableAmenities">
		<tr v-for="(amenity, index) in amenities">
			<input type="checkbox" v-bind:value="amenity" v-model="apartment.amenities" :value="amenity"/>
          {{amenity.name}}
          </br>
        </tr>
	</table>
	</div>
</td>
</tr>
</table>	    
  
<input v-if="imageCount < 5" type="file" @change="onFileChange" />
        <input v-else type="file" @change="onFileChange" disabled="true"/>
    <table>
        <tr>
            <td v-for="(url, index) in apartment.pictures"  >
                <img :src="url" :width="width" v-on:click="deleteImage(index)" />
            </td>
        </tr>
    </table>
    
<input type="submit"  value="Izmeni apartman"/>     
</form>	

<button class="buttonBris" v-on:click="odustaniClick">Odustani</button><br/>


  </div>
</div>
`,components : { 
	vuejsDatepicker
}
	,  
    computed: {
        computedWidth: function () {
          return this.imageSize;
        }
      },
	mounted(){
    	  
    	axios
  		.get("/users/log/test")
  		.then(response => {
  			if(response.data == null){
  	      		  window.location.href = "#/login";
  			}
  		});
    	  
		axios
        .get('/amenities')
        .then(response => (this.amenities = response.data));
		
		axios
		.get('/apartment/' + this.$route.query.id)
		.then(response => {this.apartment = response.data; 
			this.imageCount=this.apartment.pictures.length;
		
			this.streetNumber=this.apartment.location.adress.streetNumber;
			document.querySelector('#form-street').value = this.apartment.location.adress.street || '';
		    document.querySelector('#form-city').value = this.apartment.location.adress.city || '';
		    document.querySelector('#form-zip').value = this.apartment.location.adress.postNumber || '';
		    document.querySelector('#form-longitude').value = this.apartment.location.longitude || '';
			document.querySelector('#form-latitude').value =this.apartment.location.latitude || '';
		
			for(let string of this.apartment.pictures){
					this.imagesForBackend.push(string);
			}
		});
		
		this.placesAutocomplete = places({
		    appId: 'plQ4P1ZY8JUZ',
		    apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
		    container: document.querySelector('#form-address'),
		    templates: {
		      value: function(suggestion) {
		        return suggestion.name;
		      }
		    }
		  }).configure({
		    type: 'address'
		  });
		this.placesAutocomplete.on('change', function resultSelected(e) {
		    document.querySelector('#form-street').value = e.suggestion.value || '';
		    document.querySelector('#form-city').value = e.suggestion.city || '';
		    document.querySelector('#form-zip').value = e.suggestion.postcode || '';
		    document.querySelector('#form-longitude').value = e.suggestion.latlng.lng || '';
			document.querySelector('#form-latitude').value = e.suggestion.latlng.lat || '';
		  });
	}, 
	methods : {	
		onFileChange(e) {
            const file = e.target.files[0];
            this.createBase64Image(file);
            this.imageCount++;
            this.apartment.pictures.push(URL.createObjectURL(file));
        },
        createBase64Image(file){
            const reader= new FileReader();
           
            reader.onload = (e) =>{
                this.imagesForBackend.push(e.target.result);
            }
            reader.readAsDataURL(file);
        },
 
        deleteImage(index){
            this.imageCount--;
            this.apartment.pictures.splice(index,1);
            this.imagesForBackend.splice(index,1);
        },
        odustaniClick : function(){
        	window.location.href = "#/apartmentDetails?id=" + this.apartment.id;
		},
		checkFormValid : function() {
			
			this.apartmentTypeError='';
			this.numberOfRoomsError='';
			this.numberOfGuestsError='';
			this.priceError='';
			this.checkInTimeError='';
			this.checkOutTimeError='';
			this.streetError = '';
			this.streetNumberError = '';
			
		    if(this.apartment.type == "")
				this.apartmentTypeError =  'Tip apartmana je obavezno polje!';
			else if(this.apartment.numberOfRoom == "")
				this.numberOfRoomsError =  'Broj soba je obavezno polje!';
			else if(this.apartment.numberOfGuest == "")
				this.numberOfGuestsError =  'Broj gostiju je obavezno polje!';
			else if(this.apartment.priceForNight == "")
				this.priceError =  'Cena je obavezno polje!';
			else if(this.apartment.checkInTime == "")
				this.checkInTimeError =  'Vreme za prijavu gostiju je obavezno polje!';
			else if(this.apartment.checkOutTime == "")
				this.checkOutTimeError =  'Vreme za odjavu gostiju je obavezno polje!';
			else if(document.querySelector('#form-street').value == "")
				this.streetError = 'Uneta nevalidna adresa!';
			else if(this.streetNumber == ""){
				this.streetNumberError="Broj ulice je obavezno polje"
			}
			else
				{
					let adressLocation = { city:transliterate(document.querySelector('#form-city').value),postNumber:parseInt(document.querySelector('#form-zip').value),
						street:transliterate(document.querySelector('#form-street').value), streetNumber:parseInt(this.streetNumber)};
					let location = { adress:adressLocation , latitude:parseFloat(document.querySelector('#form-latitude').value),longitude:parseFloat(document.querySelector('#form-longitude').value)};
									
					this.apartment.pictures= this.imagesForBackend;
					this.apartment.location=location;
				 	
				 	axios
		    		.post("/apartment/edit", this.apartment)
		    		.then(response => (window.location.href = "#/apartmentDetails?id=" + this.apartment.id));
				 	
		        	
				}
		}
	},
});


