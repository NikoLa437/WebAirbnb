Vue.component("home-page", {
	data: function () {
	    return {
	        apartments: null,
	        width:'30%'
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
	<div v-bind:style="{ width: computedWidth }" style="background-color: PapayaWhip; border-style: solid;" v-for="(apartment, index) in apartments">
          <table>
          		<tr v-bind:style="{ width: computedWidth }">
          			<td colspan="2">
          				<img src="slika1.jpg" alt="Detalji" height="200">
          			</td>
          		</tr>
          		<tr>
          			<td><label>Tip:</label></td>
          			<td><label>{{apartment.type}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Broj gostiju:</label></td>
          			<td><label>{{apartment.numberOfGuest}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Grad:</label></td>
          			<td><label>{{apartment.location.adress.city}}</label></td>
          		</tr>
          		<tr>
          			<td><label>Cena:</label></td>
          			<td><label>{{apartment.priceForNight}}</label></td>
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