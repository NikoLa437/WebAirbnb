package beans;

import java.util.ArrayList;
import java.util.List;

public class Guest extends User{

	private List<Apartment> rentedAppartments;
	private List<Reservation> reservations;
	
	public Guest() {
		super();
		rentedAppartments = new ArrayList<Apartment>();
		reservations = new ArrayList<Reservation>();
		// TODO Auto-generated constructor stub
	}
	public List<Apartment> getRentedAppartments() {
		return rentedAppartments;
	}
	public void setRentedAppartments(List<Apartment> rentedAppartments) {
		this.rentedAppartments = rentedAppartments;
	}
	public List<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
	public Guest(String username, String password, String name, String surname, Gender gender) {
		super(username, password, name, surname, gender);
		rentedAppartments = new ArrayList<Apartment>();
		reservations = new ArrayList<Reservation>();

		// TODO Auto-generated constructor stub
	}

}
