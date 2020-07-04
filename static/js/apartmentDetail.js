Vue.component("apartment-details", {
	data: function () {
	    return {
	        apartment:null,
	        picture:'',
	        comment:'',
	        canReserve:null,
	        canUserComment:null
	    }
	},
	template: ` 
<div>
<table >
<tr>
		<td id="slike">
			<div class="rowS">
					<div v-for="p in apartment.pictures" class="columnS">
							<img :src="p" alt="Slika apartmana" style="width:100%" v-on:click="myFunction(p)"/>
					</div>
			</div>
			
			<div class="containerG" ref="container">
				<a target="_blank" :href="picture">
						<img ref="expandedImg" :src="picture" style="width:100%"/>
			  	</a>
			</div>
		</td>
		<td id="info">
			<table id="apartmanInfo">
				<tr>
					<td>Tip: </td>
					<td class="infotext">{{(apartment.type == 'apartment') ? "Apartman" : "Soba"}}</td>
				</tr>
				<tr>
					<td>Broj soba: </td>
					<td class="infotext">{{apartment.numberOfRoom}}</td>
				</tr>
				<tr>
					<td>Maksimalan broj gostiju: </td>
					<td class="infotext">{{apartment.numberOfGuest}}</td>
				</tr>
				<tr>
					<td>Adresa: </td>
					<td class="infotext">{{apartment.location.adress.street + ' ' + apartment.location.adress.streetNumber + ', ' + apartment.location.adress.postNumber + ' ' + apartment.location.adress.city}}</td>
				</tr>
				<tr>
					<td>Cena za jednu noc: </td>
					<td class="infotext">{{apartment.priceForNight + ' dinara'}}</td>
				</tr>
				<tr>
					<td colspan="2"><button id="buttonBrisanje" v-on:click="rezervisiClick">Rezervisi</button><br/></td>
				</tr>
			</table>
		</td>	
</tr>
</table>
<h3>Sadrzaji apartmana:</h3>
<table>
		<tr v-for="a in apartment.amenities">
			<td>{{a.name}}</td>
		</tr>
</table>

<h3>Komentari: </h3>
<table class="komentari">
		<tr v-for="c in apartment.comments">
			<td>
				<table>
					<tr><td>{{"Ocena: " + c.grade}}</td></tr>
					<tr><td>{{"Ocenio: " + c.guest.name + ' ' + c.guest.surname}}</td></tr>
					<tr><td>{{c.text}}</td></tr>
				</table>
			</td>
		</tr>
</table>

<table class="komentari" v-bind:hidden="!canUserComment">
		<tr>
			<td><textarea class="inputComment"  name="comment" placeholder="Unesite komentar" cols="70" rows="10" v-model="comment"></textarea></td>
		</tr>
		<tr>
			<td><button id="buttonBrisanje">Dodaj komentar</button><br/></td>
		</tr>
</table>

</div>		  
`,
	mounted () {
		axios
		.get('/apartment/' + this.$route.query.id)
		.then(response => {this.apartment = response.data; this.picture = this.apartment.pictures[0];});
		
		axios
		.get('/users/apartment/cancoment/' + this.$route.query.id)
		.then(response => {
			if(response.data === true)
				this.canUserComment = true;
			else
				this.canUserComment = false;
		});
		
		axios
        .get('/users/log/test')
        .then(response => {
        	if(response.data == null)
        		this.canReserve=false;
        	else{
        		if(response.data.userType == "Guest")
        			this.canReserve=true;
        		else 
        			this.canReserve=false;
        	}
        })
	},
	methods : {
		myFunction : function(imgs) {
				this.picture = imgs;
				this.$refs.expandedImg.style.display = "block";
		},
		clickSpan : function(){
			this.$refs.container.style.display='none';
		},
		rezervisiClick : function(){
			if(this.canReserve)
				window.location.href = "#/reservation?id=" + this.$route.query.id;
			else
				toast("Samo Gosti mogu rezervisati termine!");
		}
	}
});