function initialIsCapital( word ){
  return word.charAt(0) !== word.charAt(0).toLowerCase();
}


Vue.component("apartment", {
	data: function () {
		    return {
		    	apartmentType: '',
		    	apartmentTypeError: '',
		    	numberOfRooms: '',
		    	numberOfRoomsError: ''
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
			<td><input class="input" placeholder="Unesite broj soba" type="number" min="0" v-model="numberOfRoom" name="numberOfRoom"/></td>
			<td ><p style="color: red" >{{numberOfRoomsError}}</p></td>	
		</tr>
		<tr>
			<td colspan="3" align="center"><input type="submit"  value="Unesi apartman"/></td>
		</tr>
	</table>
</form>
</div>
`
	, 
	methods : {
		checkFormValid : function() {
			
		    if(this.apartmentType == "")
				this.apartmentTypeError =  'Tip apartmana je obavezno polje!';
			else if(this.numberOfRooms == "")
				this.numberOfRoomsError =  'Broj soba je obavezno polje!';
			else
				{
				this.apartmentTypeError='';
				 alert("uspesno");
				
				
				}
		}
	}
});

