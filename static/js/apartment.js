function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


Vue.component("apartment", {
	data: function () {
		    return {
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
		    	apartmentStatus: '',
		        amenities: null,
		        checkedAmenities: {},
		        selectedAmenities: [],
		        url: {}
		    }
	},
	template: ` 
<div>

<form v-on:submit.prevent="checkFormValid" method="post">
	<table class="table">
		<tr>
			<td>Tip apartmana:</td>
			<td>
  				<div class="pol"><input type="radio" name="apartmentType" v-model="apartmentType" value="Apartman"> Apartman<br></div>
  				<div class="pol"><input type="radio" name="apartmentType" v-model="apartmentType" value="Soba"> Soba<br></div>
			</td>
			<td ><p style="color: red" >{{apartmentTypeError}}</p></td>	
		</tr>
		<tr>
			<td>Broj soba:</td>
			<td><input class="input" placeholder="Unesite broj soba" type="number" min="0" v-model="numberOfRooms" name="numberOfRooms"/></td>
			<td ><p style="color: red" >{{numberOfRoomsError}}</p></td>	
		</tr>
		<tr>
			<td>Broj gostiju:</td>
			<td><input class="input" placeholder="Unesite broj gostiju" type="number" min="0" v-model="numberOfGuests" name="numberOfGuests"/></td>
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
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartmentStatus" value="Aktivan"> Aktivan<br></div>
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartmentStatus" value="Neaktivan" checked> Neaktivan<br></div>
			</td>
		</tr>
		<tr>
			<td colspan="3" align="center"><input type="submit"  value="Unesi apartman"/></td>
		</tr>
	</table>
	
	<h1>Sadrzaj apartmana:</h1>
	
	<table class="tableAmenities">
		<tr v-for="(amenity, index) in amenities">
			<input type="checkbox" v-bind:value="amenity" value={{amenity}} v-model="selectedAmenities" :value="amenity"/>
          {{amenity.name}}
          </br>
        </tr>
	</table>
	
	<b>Sadrzaj</b>
	</br>
	
	<div class="channel">
        <label v-for="(amenity, index) in amenities">
          <input type="checkbox" v-bind:value="amenity" value={{amenity}} v-model="selectedAmenities" :value="amenity"/>
          {{amenity.name}}
          </br>
        </label>
      </div>
     <p>User's selected roels</p>
		{{selectedAmenities}}	

</div>
</form>
</div>
`
	,
	mounted(){
		axios
        .get('/amenities')
        .then(response => (this.amenities = response.data))
	}, 
	methods : {
		checkFormValid : function() {
			
			this.apartmentTypeError='';
			this.numberOfRoomsError='';
			this.numberOfGuestsError='';
			this.priceError='';
			this.checkInTimeError='';
			
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
			else
				{
				 	alert("uspesno");
				
				
				}
		},
	},
    
});


