Vue.component("amenities", {
	data: function () {
		    return {
		        amenities: null,
		        nameError:'',
		        mode: "BROWSE",
		        amenitiename:'',
		        selectedAmenity: {},
		        width:'60%'
		    }
	},
	template: ` 
<div id="sadrzaj">
<h2>Dostupni sadrzaji za apartmane</h2>
<table class="glavna">
<tr>
	<td>
		<table class="sadrzaji" v-bind:style="{ width: computedWidth }">
			<tr>
				<th>ID</th>
				<th>Naziv sadrzaja</th>
			</tr>
			<tr v-for="a in amenities"  v-on:click="selectAmenity(a)"  v-bind:class="{selected : selectedAmenity.id===a.id}">
					<td>{{a.id }}</td>
					<td>{{a.name }}</td>
			</tr>
		</table>
	</td>
	<td>
			<table  v-bind:hidden="mode=='BROWSE'">
				<tr>
					<td class="amenitytd">Naziv sadrzaja:</td>
				</tr>
				<tr>
					<td><input class="input" placeholder="Unesite naziv sadrzaja" type="text"  v-model="selectedAmenity.name" v-bind:disabled="mode=='BROWSE'" name="amenitiename"/></td>
				</tr>
				<tr>
					<td align="center"><input type="submit" id="submit" v-on:click="updateAmenity(selectedAmenity)" value="Sacuvaj"/>	<button v-on:click="cancelEditing" id="buttonOdustanak" v-bind:disabled="mode=='BROWSE'">Odustanak</button> <br /></td>
				</tr>
			</table>
	</td>
</tr>

</table>
<button v-on:click="editAmenity" v-bind:disabled="selectedAmenity==null" class="buttonChange">Izmeni</button><br />

<form v-on:submit.prevent="checkFormValid" method="post">
	<table>
		<tr>
			<td class="amenitytd">Naziv sadrzaja:</td>
			<td class="amenitytd"><input class="input" placeholder="Unesite naziv sadrzaja" type="text" v-model="amenitiename" name="amenitiename"/></td>
			<td class="amenitytd"><p style="color: red" >{{nameError}}</p></td>	
		</tr>
		<tr>
			<td colspan="3" align="center"><input type="submit" id="submit" value="Dodaj"/></td>
		</tr>
	</table>
</form>
</div>
`
	, 
	mounted () {
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
			checkFormValid : function() {
				this.nameError = '';
				
				if(this.amenitiename == "")
					this.nameError = 'Naziv sadrzaja je obavezno polje!';
				else{
					
					let amenity = {name: this.amenitiename, id : 0};
	        		  axios
			          .post('http://localhost:8080/amenities/add', JSON.stringify(amenity))
			          .then(response => {
			        	  toast('Sadrzaj ' + this.amenitiename + ' uspesno dodat!');
			        	  
			        	  if(!this.amenities)
			        		  this.amenities = [response.data];
			        	  else{
			        		  this.amenities.push(response.data);
			        	  }
			          });
				}
			},
			updateAmenity: function(amenity){
				axios
	    		.post("/amenities", amenity)
	    		.then(response => toast('Sadrzaj ' + amenity.name + " uspešno snimljen."));
	    		this.mode = 'BROWSE';
	    		this.width = '60%';
			},
			editAmenity : function() {
	    		if (this.selectedAmenity.id == undefined)
	    			return;
	    		this.backup = [this.selectedAmenity.id, this.selectedAmenity.name];
	    		this.mode = 'EDIT';
	    		
	    		this.width = '100%';
	    	},
	    	selectAmenity : function(amenity) {
	    		if (this.mode == 'BROWSE') {
	    			this.selectedAmenity = amenity;
	    		}
	    	},
	    	cancelEditing : function() {
	    		this.selectedAmenity.id = this.backup[0];
	    		this.selectedAmenity.name = this.backup[1];
	    		this.mode = 'BROWSE';
	    		this.width = '60%';
	    	}
	}
	
});
