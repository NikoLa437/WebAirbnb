function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


function transliterate(string) {
    var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
    var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')

    return string.split('').map(function(char) {
      var index = cyrillic.indexOf(char)
      if (!~index)
        return char
      return latin[index]
    }).join('')
  }


Vue.component("apartment", {
	data: function () {
		    return {
		    	placesAutocomplete:null,
		    	apartmentType: '',
		    	apartmentTypeError: '',
		    	numberOfRooms: '',
		    	numberOfRoomsError: '',
		    	numberOfGuests: '',
		    	numberOfGuestsError: '',
		    	price: '',
		    	priceError: '',
		    	checkInTime: '',
		    	checkInTimeError: '',
		    	checkOutTime: '',
		    	checkOutTimeError: '',
		    	apartmentStatus: 'active',
		        amenities: null,
		        checkedAmenities: {},
		        selectedAmenities: [],
		        dateFrom: new Date(Date.now() + 24*60*60*1000),
		        dateFromError: '',
		        dateTo: '',
		        dateToError: '',
		        city: '',
		        postNumber:'',
		        street:'',
		        streetError:'',
		        streetNumber:'',
		        longitude:'',
		        latitude:'',
		        url: null,
		        images: []
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
  				<div class="pol"><input type="radio" name="apartmentType" v-model="apartmentType" value="room"> Apartman<br></div>
  				<div class="pol"><input type="radio" name="apartmentType" v-model="apartmentType" value="apartment"> Soba<br></div>
			</td>
			<td ><p style="color: red" >{{apartmentTypeError}}</p></td>	
		</tr>
		<tr>
			<td>Broj soba:</td>
			<td><input class="input" placeholder="Unesite broj soba" type="number" min="1" v-model="numberOfRooms" name="numberOfRooms"/></td>
			<td ><p style="color: red" >{{numberOfRoomsError}}</p></td>	
		</tr>
		<tr>
			<td>Broj gostiju:</td>
			<td><input class="input" placeholder="Unesite broj gostiju" type="number" min="1" v-model="numberOfGuests" name="numberOfGuests"/></td>
			<td ><p style="color: red" >{{numberOfGuestsError}}</p></td>	
		</tr>
		<tr>
			<td>Cena po noci:</td>
			<td><input class="input" placeholder="Unestice cenu" type="number" min="0" v-model="price" name="price"></td>
			<td>din</td>
			<td ><p style="color: red" >{{priceError}}</p></td>	
		</tr>
		<tr>
			<td>Vreme za prijavu:</td>
			<td><input class="input" placeholder="Unestice cenu" type="time" v-model="checkInTime" name="checkInTime"></td>
			<td ><p style="color: red" >{{checkInTimeError}}</p></td>	
		</tr>
		<tr>
			<td>Vreme za odjavu:</td>
			<td><input class="input" placeholder="Unestice cenu" type="time" v-model="checkOutTime" name="checkOutTime"></td>
			<td ><p style="color: red" >{{checkOutTimeError}}</p></td>	
		</tr>
		<tr>
			<td>Status:</td>
			<td>
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartmentStatus" value="active"> Aktivan<br></div>
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartmentStatus" value="inactive"> Neaktivan<br></div>
			</td>
		</tr>
		<tr>
			<td>Datum od:</td>
			<td><vuejs-datepicker placeholder="Unesite pocetni datum" v-model="dateFrom" ></vuejs-datepicker></td>
			<td ><p style="color: red" >{{dateFromError}}</p></td>	
		</tr>
		<tr>
			<td>Datum do:</td>
			<td><vuejs-datepicker placeholder="Unesite krajnji datum" v-model="dateTo" ></vuejs-datepicker></td>
			<td ><p style="color: red" >{{dateToError}}</p></td>	
		</tr>
		<tr>
			<td colspan="2"><h3>Unesite lokaciju:</h3></td>
		</tr>
		<tr>
			<td colspan="2">
			<div class="form-group">
	    		<label for="form-address">Adresa</label>
	    		<input type="search" class="form-control" id="form-address" placeholder="Unesite adresu" />
			</div>
			<br/>
			<div >
	    		<label >Broj:</label>
	    		<input type="number" min="1" v-model="streetNumber" name="streetNumber" class="form-control"  placeholder="Unesite broj" />
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
		<tr>
			<td colspan="3" align="center"><input type="submit"  value="Unesi apartman"/></td>
		</tr>
	</table>
</td>
<td style="vertical-align:top">
	<div style="float:left">
	<h1>Sadrzaj apartmana:</h1>
	
	<table class="tableAmenities">
		<tr v-for="(amenity, index) in amenities">
			<input type="checkbox" v-bind:value="amenity" v-model="selectedAmenities" :value="amenity"/>
          {{amenity.name}}
          </br>
        </tr>
	</table>
	</div>
</td>
</tr>
</table>	    
  <input type="file" @change="onFileChange" />

  <div id="preview">
    <img v-if="url" :src="url" />
  </div>


</form>	

  </div>
</div>
`,components : { 
	vuejsDatepicker
}
	,
	mounted(){
		axios
        .get('/amenities')
        .then(response => (this.amenities = response.data));
		
		
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
			
			this.street = e.suggestion.value;
			this.city = e.suggestion.city;
			this.postNumber = e.suggestion.postcode;
			this.longitude =  e.suggestion.latlng.lng;
			this.latitude = e.suggestion.latlng.lat;
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
		      this.images.push(URL.createObjectURL(file));
		},
		checkFormValid : function() {
			
			this.apartmentTypeError='';
			this.numberOfRoomsError='';
			this.numberOfGuestsError='';
			this.priceError='';
			this.checkInTimeError='';
			this.streetError = '';
		    if(this.apartmentType == "")
				this.apartmentTypeError =  'Tip apartmana je obavezno polje!';
			else if(this.numberOfRooms == "")
				this.numberOfRoomsError =  'Broj soba je obavezno polje!';
			else if(this.numberOfGuests == "")
				this.numberOfGuestsError =  'Broj gostiju je obavezno polje!';
			else if(this.price == "")
				this.priceError =  'Broj gostiju je obavezno polje!';
			else if(this.checkInTime == "")
				this.checkInTimeError =  'Vreme za prijavu gostiju je obavezno polje!';
			else if(this.checkOutTime == "")
				this.checkOutTimeError =  'Vreme za prijavu gostiju je obavezno polje!';
			else if(this.dateFrom == "")
				this.dateFromError =  'Pocetno vreme za rezervaciju je obavezno polje';
			else if(this.dateTo == "")
				this.dateToError =  'Krajnje vreme za rezervaciju je obavezno polje!';
			else if(document.querySelector('#form-street').value == "")
				this.streetError = 'Uneta nevalidna adresa!';
			else
				{
				
					//let period= { dateFrom:dateFrom, dateTo:dateTo }
					let adressLocation = { city:transliterate(document.querySelector('#form-city').value),postNumber:parseInt(document.querySelector('#form-zip').value),
											street:transliterate(document.querySelector('#form-street').value), streetNumber:parseInt(this.streetNumber)};
					
					let dateFrom = (new Date(this.dateFrom.getFullYear(),this.dateFrom.getMonth() , this.dateFrom.getDate())).getTime(); 
					let dateTo = (new Date(this.dateTo.getFullYear(),this.dateTo.getMonth() , this.dateTo.getDate())).getTime(); 
					let period = [ { dateFrom: dateFrom , dateTo: dateTo }];

										
					let location = { adress:adressLocation , latitude:parseFloat(document.querySelector('#form-latitude').value),longitude:parseFloat(document.querySelector('#form-longitude').value)};


				 	let apartment = {id: 0,type:this.apartmentType, numberOfRoom: this.numberOfRooms,numberOfGuest: this.numberOfGuests,location:location,dateForRenting:period,freeDateForRenting:[]
							,host:null,comments:[],pictures:[],priceForNight:this.price,checkInTime:this.checkInTime,checkOutTime:this.checkOutTime,amenities:this.selectedAmenities,status:this.apartmentStatus,reservations:[]};
				 	
	        		
				 	axios
			        .post('http://localhost:8080/apartment/add', JSON.stringify(apartment))
			        .then(response => {
			        	  window.location.href = "#/";
			        	  
			          });
				
				}
		}
	},
	onFileChange(e) {
	      const file = e.target.files[0];
	      this.url = URL.createObjectURL(file);
	    },
    
});


