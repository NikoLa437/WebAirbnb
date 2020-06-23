package beans;

import java.util.ArrayList;
import java.util.List;

public class Host extends User{

	private List<Apartment> appartments;

	public Host() {
		super();
		appartments = new ArrayList<Apartment>();
		// TODO Auto-generated constructor stub
	}

	public Host(String username, String password, String name, String surname, Gender gender) {
		super(username, password, name, surname, gender);
		appartments = new ArrayList<Apartment>();
		// TODO Auto-generated constructor stub
	}

	public List<Apartment> getAppartments() {
		return appartments;
	}

	public void setAppartments(List<Apartment> appartments) {
		this.appartments = appartments;
	}
	
	
}
