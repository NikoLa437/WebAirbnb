Vue.component("home-page", {
	template: ` 
<div>
		<table class="searchtable">
		<tr>
			<td><input class="searchInput" placeholder="Unesite lokaciju" type="text"/></td>
			<td><input class="searchInput" type="date"/></td>
			<td><input class="searchInput" placeholder="Unesite broj gostiju"  type="number"/></td>
			<td><button class="button">Pretrazi</button></td>		
		</tr>
</table>
	
</div>		  
`
});