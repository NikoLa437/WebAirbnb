Vue.component("home-page", {
	data: function () {
	    return {
	        apartments: null,
	        width:'50%',
	        location:'',
	        dateFrom:'',
	        dateTo:'',
	        numberOfGuest:'',
	        minRoom:'',
	        maxRoom:'',
	        minPrice:'',
	        maxPrice:'',
	        searchedApartments: null,
	        showSearched:false,
	        sortValue:'',
	        prikaz: "DEFAULT",
	        amenities: null,
	        type: ''
	    }
},
template: ` 
<div>
	<table class="searchtable">
		<tr v-bind:hidden="prikaz!='DEFAULT'">
			<td><button class="button" v-on:click="openSearch">Otvori pretragu</button></td>	
		</tr>
		<tr v-bind:hidden="prikaz=='DEFAULT'" >
			<td><input class="searchInput" placeholder="Lokacija" type="text"  v-model="location" name="location"/></td>
			<td><input class="searchInput" placeholder="Datum od" type="date"/></td>
			<td><input class="searchInput" placeholder="Datum do" type="date"/></td>
			<td><input class="searchInput" placeholder="Broj gostiju" min=0 type="number"/></td>
		</tr>
		<tr v-bind:hidden="prikaz=='DEFAULT'">
			<td><input class="searchInput" placeholder="Minimalno soba" min=0 type="number"/></td>
			<td><input class="searchInput" placeholder="Maksimalno soba" min=0 type="number"/></td>
			<td><input class="searchInput" placeholder="Minimalna cena" min=0 type="number"/></td>
			<td><input class="searchInput" placeholder="Maksimalna cena" min=0 type="number"/></td
		</tr>
		<tr v-bind:hidden="prikaz=='DEFAULT'" v-for="(amenity, index) in amenities">
			<input type="checkbox" v-bind:value="amenity" v-model="selectedAmenities" :value="amenity"/>
          {{amenity.name}}
          </br>
        </tr>
		<tr v-bind:hidden="prikaz=='DEFAULT'">
			<td>
				<select class="select" name="apartmentType" v-model="type">
				   <option class="option" value="soba">Soba</option>
				   <option class="option" value="apartman">Apartman</option>
				</select></td>
			</td>
			<td>
				<select class="select" @change="onChange($event)" name="sort" v-model="sortValue">
				   <option class="option" value="rastuca">Cena rastuca</option>
				   <option class="option" value="opadajuca">Cena opadajuca</option>
				</select></td>
			<td><button class="button" v-on:click="ponistipretragu">Ponisti pretragu</button></td>		
			<td><button class="button" v-on:click="search">Pretrazi</button></td>		
		</tr>
</table>
	<div v-bind:style="{ width: computedWidth }" v-on:click="selectApartment(apartment.id)" style="background-color: lightBlue; display: block;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;" v-for="(apartment, index) in apartments">
          <table v-bind:hidden="showSearched">
          		<tr>
          			<td colspan="2">
          				<img src="slika1.jpg" alt="Detalji" height="250" width= 745>
          			</td>
          		</tr>
          		
          		
          		<tr>
          			<td><label v-if="apartment.type === 'room'">Soba</label>
          			<label v-else>Ceo apartman</label></td>
          			<td>
          			<label style="margin-left:50px;">{{apartment.location.adress.city}} - {{apartment.location.adress.street}} {{apartment.location.adress.streetNumber}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Broj gostiju: </label>
          			<label style="margin-left:50px;">{{apartment.numberOfGuest}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Cena:</label>
          			<label style="margin-left:50px;">{{apartment.priceForNight}} din po nocenju</label></td>
          		</tr>
          
          </table>
	</div>
	
	<div v-bind:hidden="!showSearched" v-bind:style="{ width: computedWidth }" style="background-color: lightBlue; display: block;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;" v-for="(apartment, index) in searchedApartments">
          <table>
          		<tr>
          			<td colspan="2">
          				<img src="slika1.jpg" alt="Detalji" height="250" width= 745>
          			</td>
          		</tr>
          		
          		<tr>
          			<td><label v-if="apartment.type === 'room'">Soba</label>
          			<label v-else>Ceo apartman</label></td>
          			<td>
          			<label style="margin-left:50px;">{{apartment.location.adress.city}} - {{apartment.location.adress.street}} {{apartment.location.adress.streetNumber}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Broj gostiju: </label>
          			<label style="margin-left:50px;">{{apartment.numberOfGuest}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Cena:</label>
          			<label style="margin-left:50px;">{{apartment.priceForNight}} din po nocenju</label></td>
          		</tr>
          
          </table>
	</div>
</div>		  
`, 
	mounted () {
	    axios
	      .get('/apartments')
	      .then(response => (this.apartments = response.data))
	      
	   axios
	     .get('/amenities')
	     .then(response => (this.amenities = response.data))
	},
	computed: {
	    computedWidth: function () {
	      return this.width;
	    }
	  },
	  methods : {
		  openSearch : function(){
			  this.prikaz="PRETRAGA";
		  },
			search : function(){
				if(this.location != '' || this.dateFrom != '' || this.dateTo != '' || this.numberOfGuest != '' || this.minRoom != '' || this.maxRoom != '' || this.minPrice != '' || this.maxPrice != ''|| this.sortValue != ''){
					axios
					.get('/apartments/search/parameters', {
					    params: {
					        location: this.location,
					        dateFrom : this.dateFrom,
					        dateTo : this.dateTo,
					        numberOfGuest : this.numberOfGuest,
					        minRoom: this.minRoom,
					        maxRoom : this.maxRoom,
					        minPrice : this.minPrice,
					        maxPrice : this.maxPrice,
					        sortValue: this.sortValue
					      }
					    })
					.then(response => {
						this.searchedApartments = response.data;
						this.showSearched = true;
						this.prikaz="DEFAULT";
					});
				}else{
					this.showSearched = false;
					this.prikaz="DEFATULT";
				}
			},
			ponistipretragu: function(){
				this.searchedApartments = null;
				this.showSearched = false;
				this.prikaz="DEFATULT";
				
			},
			onChange(event) {
				if(this.location != '' || this.dateFrom != '' || this.dateTo != '' || this.numberOfGuest != '' || this.minRoom != '' || this.maxRoom != '' || this.minPrice != '' || this.maxPrice != '' || this.sortValue != ''){
					axios
					.get('/apartments/search/parameters', {
					    params: {
					        location: this.location,
					        dateFrom : this.dateFrom,
					        dateTo : this.dateTo,
					        numberOfGuest : this.numberOfGuest,
					        minRoom: this.minRoom,
					        maxRoom : this.maxRoom,
					        minPrice : this.minPrice,
					        maxPrice : this.maxPrice,
					        sortValue: this.sortValue
					      }
					    })
					.then(response => {
						this.searchedApartments = response.data;
						this.showSearched = true;
					});
				}else{
					this.showSearched = false;
				}
	        },
	        selectApartment : function(id) {
	        	window.location.href = "http://localhost:8080/#/apartmentDetails?id=" + id;
	    	}
	 
			
		}
});