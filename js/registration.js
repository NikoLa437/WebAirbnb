var app = new Vue ({
	el: '#example-2',
	  data: {
	    name: 'Vue.js'
	  },
	methods: {
		checkFormValid : function() {
			let username = this.$refs.username.value;
			let name = this.$refs.name.value;
			let surname = $('input[name=surname]').val();
			let password = $('input[name=password]').val();
			let aggainpassword = $('input[name=aggainpassword]').val();

			if(username =="")
				toast('Username je obavezno polje!');
			else if(name == "")
				toast('Ime je obavezno polje!');
			else if(surname == "")
				toast('Ime je obavezno polje!');
			else if(password == "")
				toast('Sifra je obavezno polje!');
			else if(aggainpassword == "")
				toast('Sifra se mora ponovo uneti!');
			else if(aggainpassword != password)
				toast('Sifre se moraju poklapati!');
		}
	}
});