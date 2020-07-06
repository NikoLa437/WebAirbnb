Vue.component("reservation", {
	data: function () {
	    return {
	    	disabledDates : {
	    	},
	    	apartment:{},
	    	numberOfDays:1,
	    	note:'',
	    	holidays:[],
	    	available:'UNDEFINED',
	    	selectedDate: ''
	    }
	},
	template: ` 
<div>
<table>
		<tr>
			<td>Izaberite datum dolaska: </td>
		  	<td><vuejs-datepicker  v-model="selectedDate" :disabled-dates="disabledDates"></vuejs-datepicker></td>
		</tr>
		<tr>
			<td>Unesite broj dana: </td>
		  	<td><input class="input" placeholder="Unesite broj dana" type="number" min="1" v-model="numberOfDays" name="numberOfDays"/></td>
		</tr>
		<tr>
			<td colspan="2"><button class="buttonSave" v-on:click="checkAvailability">Proverite raspolozivost</button><br/></td>
		</tr>
 </table>
 
 <div v-bind:hidden="available!='OCCUPIED'" v-if="selectedDate != ''">
	<h4 style="color:red">U periodu od {{selectedDate | dateFormat('DD.MM.YYYY')}} do {{(selectedDate.getTime() + (parseInt(this.numberOfDays)-1)*24*60*60*1000) | dateFormat('DD.MM.YYYY')}} nema slobodnih termina!</h4>
 </div>
 <div v-bind:hidden="available!='AVAILABLE'" v-if="selectedDate != ''">
	<h4>Slobodan termin pronadjen!</h4>
	<table style="width=50%">
		<tr>
			<td>Datum od:</td>
			<td>{{selectedDate | dateFormat('DD.MM.YYYY')}}</td>
		</tr>
		<tr>
			<td>Datum do:</td>
			<td>{{(selectedDate.getTime() + (parseInt(this.numberOfDays)-1)*24*60*60*1000) | dateFormat('DD.MM.YYYY')}}</td>
		</tr>
		<tr>
			<td>Cena:</td>
			<td>{{getPrice()}} dinara</td>
		</tr>
		<tr>
			<td>Vreme ulaska u apartman:</td>
			<td>{{apartment.checkInTime}}</td>
		</tr>
		<tr>
			<td>Vreme izlaska iz apartmana:</td>
			<td>{{apartment.checkOutTime}}</td>
		</tr>
		<tr>
			<td colspan="2"><textarea class="inputComment"  name="note" placeholder="Unesite poruku za domacina"  cols="70" rows="10" v-model="note"></textarea></td>
		</tr>
		<tr>
			<td colspan="2"><button class="buttonSave" v-on:click="reserve">Rezervisi</button><br/></td>
		</tr>
	</table>
 </div>
</div>		  
`, components : { 
		vuejsDatepicker
	},
	created (){
		axios
		.get('/apartment/occupied/' + this.$route.query.id)
		.then(response => {
			let datess = [];
			for(let d of response.data)
				datess.push(new Date(d));
			this.disabledDates["to"] = new Date(Date.now());
			this.disabledDates["dates"] = datess;
			
		});
		
		axios
		.get('/apartment/occupiedRanges/' + this.$route.query.id)
		.then(response => {
			let ranges = [];
			
			for(let d of response.data){
				if(d.dateTo != 0){
					ranges.push({from : new Date(d.dateFrom), to : new Date(d.dateTo)});
				}else{
					this.disabledDates["from"] = new Date(d.dateFrom);
				}
			}
			
			this.disabledDates["ranges"] = ranges;
		});
	},
	mounted () {
		axios
		.get('/apartment/' + this.$route.query.id)
		.then(response => (this.apartment = response.data));
		
		axios
		.get('/holidays')
		.then(response => (this.holidays = response.data));
		
		
	},
	methods : {
		checkAvailability : function(){
			let numb = parseInt(this.numberOfDays);
			let seldates = [(new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth() , this.selectedDate.getDate())).getTime()];
			for (i = 1; i < numb; i++) {
				seldates.push((new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth() , this.selectedDate.getDate())).getTime() + 24*60*60*1000*i);
			}
			for(let d of this.disabledDates.dates){
				for(let a of seldates){
					if(a === d.getTime()){
						this.available = 'OCCUPIED';
						return;
					}
				}
			}

			
			for(let d of this.disabledDates["ranges"]){
				for(let a of seldates){
					if(a > d.from.getTime() && a < d.to.getTime()){
						this.available = 'OCCUPIED';
						return;
					}else if(a >= this.disabledDates["from"].getTime() || a <= this.disabledDates["to"].getTime()){
						this.available = 'OCCUPIED';
						return;
					}
				}
			}
			
			this.available = 'AVAILABLE';
		},
		getPrice : function(){
			let price = 0;
			let numb = parseInt(this.numberOfDays);
			let seldates = [(new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth() , this.selectedDate.getDate())).getTime()];
			for (i = 1; i < numb; i++) {
				seldates.push((new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth() , this.selectedDate.getDate())).getTime() + 24*60*60*1000*i);
			}
			
			for(let d of seldates){
				let praznik = false;
				for(let p of this.holidays){
					if(d === p.date){
						price = price + 1.05 * this.apartment.priceForNight;
						praznik = true;
						break;
					}
				}
				if(praznik === false){
					let dan = new Date(d);
					if(dan.getDay() === 0 || dan.getDay() ===6)
					{
						price = price + 0.9*this.apartment.priceForNight;

					}else
					{
						price = price + this.apartment.priceForNight;
					}
				}
			}
			
			return Number((price).toFixed(1)); ;
		},
		reserve : function(){

			let seldates = (new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth() , this.selectedDate.getDate())).getTime();
			let reservation = { appartment : this.apartment, startDate : seldates, daysForStay : parseInt(this.numberOfDays) - 1, price : getPrice()
								, message : this.note, guest : null, status : 'created'};
			
			axios
			.post('/apartment/reserve', JSON.stringify(reservation))
			.then(response => (window.location.href="#/reservations"));
		}
	},
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	}
});