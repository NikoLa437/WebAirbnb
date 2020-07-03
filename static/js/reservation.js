Vue.component("reservation", {
	props: ['id'],
	data: function () {
	    return {
	    	disabledDates : {
	    	},
	    	apartment:null,
	    	numberOfDays:0,
	    	available:'UNDEFINED',
	    	selectedDate: new Date(Date.now() + 24*60*60*1000)
	    }
	},
	template: ` 
<div>
<table>
		<tr>
			<td>Izaberite datum dolaska: </td>
		  	<td><vuejs-datepicker v-model="selectedDate" :disabled-dates="disabledDates"></vuejs-datepicker></td>
		</tr>
		<tr>
			<td>Unesite broj dana: </td>
		  	<td><input class="input" placeholder="Unesite broj dana" type="number" min="0" v-model="numberOfDays" name="numberOfDays"/></td>
		</tr>
		<tr>
			<td colspan="2"><button class="buttonSave" v-on:click="checkAvailability">Proverite raspolozivost</button><br/></td>
		</tr>
 </table>
 
 <div v-bind:hidden="available!='OCCUPIED'">
	<h4 style="color:red">U periodu od {{selectedDate | dateFormat('DD.MM.YYYY')}} do {{(selectedDate.getTime() + parseInt(this.numberOfDays)*24*60*60*1000) | dateFormat('DD.MM.YYYY')}} nema slobodnih termina!</h4>
 </div>
 <div v-bind:hidden="available!='AVAILABLE'">
	<h4>Slobodan termin pronadjen!</h4>
	<table>
		<tr>
			<td>Datum od:</td>
			<td>{{selectedDate | dateFormat('DD.MM.YYYY')}}</td>
		</tr>
		<tr>
			<td>Datum do:</td>
			<td>{{(selectedDate.getTime() + parseInt(this.numberOfDays)*24*60*60*1000) | dateFormat('DD.MM.YYYY')}}</td>
		</tr>
		<tr>
			<td>Cena:</td>
			<td>{{apartment.priceForNight * parseInt(this.numberOfDays)}}</td>
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
	mounted () {
		axios
		.get('/apartment/occupied/' + this.id)
		.then(response => {
			let datess = [];
			for(let d of response.data)
				datess.push(new Date(d));
			this.disabledDates["to"] = new Date(Date.now());
			this.disabledDates["dates"] = datess;
			
		});
		
		axios
		.get('/apartment/' + this.id)
		.then(response => (this.apartment = response.data));
	},
	methods : {
		checkAvailability : function(){
			let numb = parseInt(this.numberOfDays);
			let seldates = [(new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth() , this.selectedDate.getDate())).getTime()];
			console.log(seldates);
			for (i = 1; i <= numb; i++) {
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
			this.available = 'AVAILABLE';
		},
		reserve : function(){
			
		}
	},
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	}
});