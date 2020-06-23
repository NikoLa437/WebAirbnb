package beans;

import java.util.Date;
import java.util.List;

public class Apartment {
	
	private ApartmentType type;
	private int numberOfRoom;
	private int numberOfGuest;
	private Location location;
	private List<Date> dateForRenting;
	private List<Date> freeDateForRenting;
	//domacin
	//komentar
	private List<String> pictures;
	private double priceForNight;
	private long checkInTime = Date.UTC(0, 0, 0, 14, 0, 0);
	private long checkOutTime = Date.UTC(0, 0, 0, 14, 0, 0);
	private ApartmentStatus status;
	//lista sadrzaja
	//lista rezervacija
	
	
	public Apartment() {
	
	}
}
