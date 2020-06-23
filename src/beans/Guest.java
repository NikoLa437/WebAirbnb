package beans;

import java.util.ArrayList;
import java.util.List;

public class Guest extends User{

	private List<String> rentedAppartments;
	private List<String> reservations;
	
	public Guest() {
		super();
		rentedAppartments = new ArrayList<String>();
		reservations = new ArrayList<String>();
		// TODO Auto-generated constructor stub
	}
	public List<String> getRentedAppartments() {
		return rentedAppartments;
	}
	public void setRentedAppartments(List<String> rentedAppartments) {
		this.rentedAppartments = rentedAppartments;
	}
	public List<String> getReservations() {
		return reservations;
	}
	public void setReservations(List<String> reservations) {
		this.reservations = reservations;
	}
	public Guest(String username, String password, String name, String surname, Gender gender) {
		super(username, password, name, surname, gender);
		rentedAppartments = new ArrayList<String>();
		reservations = new ArrayList<String>();

		// TODO Auto-generated constructor stub
	}

}
