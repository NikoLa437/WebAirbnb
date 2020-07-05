Vue.component("apartment-details", {
	data: function () {
	    return {
	        apartment:{},
	        picture:'',
	        comment:'',
	        userType:'',
	        grade:'',
	        user:null,
	        commentError:'',
	        selectedComment:{},
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
					<td colspan="2"><button class="buttonBris" v-on:click="rezervisiClick">Rezervisi</button><br/></td>
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

<table class="komentari" v-bind:hidden="apartment.comments.length == 0">
		<h3>Komentari: </h3>
		<tr>
		<td v-bind:hidden="userType != 'HOST'">
				<button class="buttonBris" v-on:click="disableComment()">Skini komentar</button>
				<button class="buttonBris" v-on:click="enableComment()">Prikazi komentar</button>
		</td>
		</tr>
		<tr v-for="c in apartment.comments" v-if="c.visibleForGuest || (userType == 'HOST' || userType == 'ADMIN')" v-on:click="selectComment(c)" v-bind:class="{selected : selectedComment.id===c.id}">
			<td style="border: solid 1px rgb(152, 0, 0);border-top-left-radius: 10px;border-top-right-radius: 10px;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
				<table>
					<tr><td style="color:rgb(152, 0, 0)">{{"Ocena: " + c.grade}}</td><td v-bind:hidden="userType != 'HOST'">{{(c.visibleForGuest) ? 'Vidljiv' : 'Nevidljiv'}}</td</tr>
					<tr><td style="color:rgb(152, 0, 0)">{{"Ocenio: " + c.guest.name + ' ' + c.guest.surname}}</td></tr>
					<tr><td >{{c.text}}</td></tr>
				</table>
			</td>	
		</tr>
</table>

<table class="komentari" v-bind:hidden="!canUserComment">
		<tr>
			<td>Ocena:
				<select class="select" name="grade" style="width:100px" v-model="grade">
						<option class="option" value=""></option>
						<option class="option" value="I">1</option>
						<option class="option" value="II">2</option>
						<option class="option" value="III">3</option>
						<option class="option" value="IV">4</option>
						<option class="option" value="V">5</option>
				</select>
			</td>
		</tr>
		<tr>
			<td colspan="2"><textarea class="inputComment"  name="comment" placeholder="Unesite komentar" cols="70" rows="10" v-model="comment"></textarea></td>
		</tr>
		<tr>
			<td><button class="buttonBris" v-on:click="commentClick">Dodaj komentar</button><br/></td>
		</tr>
		<tr>
			<td colspan="2"><p style="color: red" >{{commentError}}</p></td>		
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
        	if(response.data == null){
        		this.canReserve=false;
        		this.userType = 'USER';
        	}
        	else{
        		this.user = response.data;
        		if(response.data.userType == "Guest"){
        			this.canReserve=true;
            		this.userType = 'USER';
        		}
        		else if(response.data.userType == "Host"){
        			this.canReserve=false;
            		this.userType = 'HOST';
        		}else{
        			this.canReserve = false;
            		this.userType = 'ADMIN';
        		}
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
		},
		selectComment : function(c){
			this.selectedComment = c;
		},
		commentClick : function(){
			this.commentError = '';
			if(this.grade == '')
				this.commentError = 'Ocena se mora uneti!';
			else if(this.comment == '')
				this.commentError = 'Komentar se mora uneti!';
			else{
				let komentar = { id:0 , guest : this.user, forApartment : this.apartment, text: this.comment, grade : this.grade, visibleForGuest : false};
				
				axios
				.post('/apartment/comment', komentar)
				.then(response =>{
					toast('Uspesno dodat komentar! Bice prikazan kada ga domacin odobri!');
					this.grade = '';
					this.comment = '';
				});
			}

		},
		disableComment : function(){
			if(this.selectedComment){
				if(this.selectedComment.visibleForGuest || this.selectedComment.visibleForGuest === undefined){
					axios
					.put('/apartment/comment/toggle/' + this.selectedComment.id)
					.then(response => {
						this.selectedComment.visibleForGuest = false;
					});
				}
			}
		},
		enableComment : function(){
			if(this.selectedComment){
				if(!this.selectedComment.visibleForGuest || this.selectedComment.visibleForGuest === undefined){
					axios
					.put('/apartment/comment/toggle/' + this.selectedComment.id)
					.then(response => {
						this.selectedComment.visibleForGuest = true;
					});
				}
			}
		}
	}
});