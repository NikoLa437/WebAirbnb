package beans;

import java.util.Date;

public class Reservation {

	//private Appartment appartment;
	private Date startDate;
	private int daysForStay = 1;
	private double price;
	private String message;
	private Guest guest;
	private ReservationStatus status;
	
	public Reservation() {}
	
	public Reservation(Date startDate, int daysForStay, double price, String message, Guest guest,
			ReservationStatus status) {
		super();
		this.startDate = startDate;
		this.daysForStay = daysForStay;
		this.price = price;
		this.message = message;
		this.guest = guest;
		this.status = status;
	}


	public Date getStartDate() {
		return startDate;
	}


	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}


	public int getDaysForStay() {
		return daysForStay;
	}


	public void setDaysForStay(int daysForStay) {
		this.daysForStay = daysForStay;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public Guest getGuest() {
		return guest;
	}


	public void setGuest(Guest guest) {
		this.guest = guest;
	}


	public ReservationStatus getStatus() {
		return status;
	}


	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
	
	
}
