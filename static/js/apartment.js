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
		        url: {},
		        dateFrom: '',
		        dateFromError: '',
		        dateTo: '',
		        dateToError: '',
		        city: '',
		        cityError: '',
		        postNumber:'',
		        postNumberError:'',
		        street:'',
		        streetError:'',
		        streetNumber:'',
		        streetNumberError:'',
		        images: []
		    }
	},
	template: ` 
<div>

<form v-on:submit.prevent="checkFormValid" method="post">
	<table class="table">
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
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartmentStatus" value="active"> Aktivan<br></div>
  				<div class="pol"><input type="radio" name="apartmentStatus" v-model="apartmentStatus" value="inactive" checked> Neaktivan<br></div>
			</td>
		</tr>
		<tr>
			<td>Datum od:</td>
			<td><input class="input" placeholder="Unesite pocetni datum" type="date" v-model="dateFrom" name="dateFrom"></td>
			<td ><p style="color: red" >{{dateFromError}}</p></td>	
		</tr>
		<tr>
			<td>Datum do:</td>
			<td><input class="input" placeholder="Unestice krajnji datum" type="date" v-model="dateTo" name="dateTo"></td>
			<td ><p style="color: red" >{{dateToError}}</p></td>	
		</tr>
		<tr>
			<td colspan="3" align="center"><input type="submit"  value="Unesi apartman"/></td>
		</tr>
	</table>
	    
	   <input type="file" @change="onFileChange" />

	
	<h1>Sadrzaj apartmana:</h1>
	
	<table class="tableAmenities">
		<tr v-for="(amenity, index) in amenities">
			<input type="checkbox" v-bind:value="amenity" v-model="selectedAmenities" :value="amenity"/>
          {{amenity.name}}
          </br>
        </tr>
	</table>
	
	</br>
     <p>User's selected roels</p>
		{{selectedAmenities}}	
	</br>
	</br>
	
	<h1>Lokacija</h1>
	
	<table class="tableLocation">
		<tr>
			<td>Grad:</td>
			<td><input class="input" placeholder="Unesite grad" type="text" v-model="city" name="city"/></td>
			<td ><p style="color: red" >{{cityError}}</p></td>	
		</tr>
		<tr>
			<td>Postanski broj: </td>
			<td><input class="input" placeholder="Unesite postanski broj" type="number" min="0" v-model="postNumber" name="postNumber"/></td>
			<td ><p style="color: red" >{{postNumberError}}</p></td>	
		</tr>
		<tr>
			<td>Ulica:</td>
			<td><input class="input" placeholder="Unesite grad" type="text" v-model="street" name="street"/></td>
			<td ><p style="color: red" >{{streetError}}</p></td>	
		</tr>
		<tr>
			<td>Ulica:</td>
			<td><input class="input" placeholder="Unesite broj" type="number" v-model="streetNumber" name="streetNumber"/></td>
			<td ><p style="color: red" >{{streetNumberError}}</p></td>	
		</tr>
		
		<div id="pac-container">
        <input id="pac-input" type="text"
            placeholder="Enter a location">
      </div>
	
	</table>
</form>	

  </div>
</div>
`
	,
	mounted(){
		axios
        .get('/amenities')
        .then(response => (this.amenities = response.data))
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
			else
				{
					//let period= { dateFrom:dateFrom, dateTo:dateTo }
					let adressLocation = { city:this.city,postNumber:this.postNumber, street:this.street, streetNumber:this.streetNumber }
					
					var json = JSON.stringify(this.dateFrom);
					var dateStr = JSON.parse(json);  
					let period = [ { dateFrom: dateStr , dateTo: null }];

					
					let latitude;
					let longitude;
					
					/*
					var geocoder = new google.maps.Geocoder();
					var address = document.getElementById("city").value;
					geocoder.geocode( { 'address': address}, function(results, status) {
					  if (status == google.maps.GeocoderStatus.OK)
					  {
					      // do something with the geocoded result
					      //
					      latitude=  results[0].geometry.location.latitude
					      longitude=  results[0].geometry.location.longitude
					  }
					});*/
					
					let location = { adress:adressLocation , latitude:0,longitude:0}

					//period,
					//checkin 
					//checkout
				 	let apartment = {id: 0,type:this.apartmentType, numberOfRoom: this.numberOfRooms,numberOfGuest: this.numberOfGuests,location:location,dateForRenting:null,freeDateForRenting:null
							,host:null,comments:null,pictures:this.images,priceForNight:this.price,checkInTime:null,checkOutTime:null,amenities:this.selectedAmenities,status:this.apartmentStatus,reservations:[]};
				 	
	        		axios
			        .post('http://localhost:8080/apartment/add', JSON.stringify(apartment))
			        .then(response => {
			        	  toast('Sadrzaj ' + this.amenitiename + ' uspesno dodat!');
			        	  
			        	  if(!this.amenities)
			        		  this.amenities = [response.data];
			        	  
			          });
				
				}
		}
	},
	uploadImage(event) {

	    images.append(event.target.files[0]); 
	  },
    
});


