Vue.component("home-page", {
	data: function () {
	    return {
	        apartments: null,
	        width:'50%'
	    }
},
template: ` 
<div>
	<table class="searchtable">
		<tr>
			<td><input class="searchInput" placeholder="Lokacija" type="text"/></td>
			<td><input class="searchInput" placeholder="Datum od" type="date"/></td>
			<td><input class="searchInput" placeholder="Datum do" type="date"/></td>
			<td><input class="searchInput" placeholder="Broj gostiju" min=0 type="number"/></td>
		</tr>
		<tr>
			<td><input class="searchInput" placeholder="Minimalno soba" min=0 type="number"/></td>
			<td><input class="searchInput" placeholder="Maksimalno soba" min=0 type="number"/></td>
			<td><input class="searchInput" placeholder="Minimalna cena" min=0 type="number"/></td>
			<td><input class="searchInput" placeholder="Maksimalna cena" min=0 type="number"/></td
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td><button class="button">Pretrazi</button></td>		
		</tr>
</table>
	<div   v-bind:style="{ width: computedWidth }" style="background-color: lightBlue; display: block;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;" v-for="(apartment, index) in apartments">
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
},
computed: {
    computedWidth: function () {
      return this.width;
    }
  }
});