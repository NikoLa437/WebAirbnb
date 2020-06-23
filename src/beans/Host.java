package beans;

import java.util.ArrayList;
import java.util.List;

public class Host extends User{

	private List<String> appartments;

	public Host() {
		super();
		appartments = new ArrayList<String>();
		// TODO Auto-generated constructor stub
	}

	public Host(String username, String password, String name, String surname, Gender gender) {
		super(username, password, name, surname, gender);
		appartments = new ArrayList<String>();
		// TODO Auto-generated constructor stub
	}

	public List<String> getAppartments() {
		return appartments;
	}

	public void setAppartments(List<String> appartments) {
		this.appartments = appartments;
	}
	
	
}
