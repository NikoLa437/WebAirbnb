package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Amenity;
import beans.Apartment;
import beans.Reservation;
import beans.ReservationStatus;
import dao.ApartmentDAO;

public class ApartmentService {
	private static Gson g = new Gson();
	private static ApartmentDAO apartmentDao;
	
	public ApartmentService(ApartmentDAO apartmentDao) {
		this.apartmentDao = apartmentDao;
	}
	
	public String Create(Apartment apartment) throws JsonSyntaxException, IOException {
		try {
			//apartmentDao.Create(apartment);
			System.out.println(apartment.getId());
			System.out.println(apartment.getType().toString());
			System.out.println(apartment.getNumberOfRoom());
			System.out.println(apartment.getNumberOfGuest());
			System.out.println(apartment.getPriceForNight());
			System.out.println(apartment.getStatus().toString());
			for(Amenity item : apartment.getAmenities()) {
				System.out.println(item.getName());
			}
			System.out.println(apartment.getLocation().getAdress().getCity());
			System.out.println(apartment.getLocation().getAdress().getPostNumber());

			System.out.println(apartment.getLocation().getAdress().getStreet());
			System.out.println(apartment.getLocation().getAdress().getStreetNumber());
			System.out.println(apartment.getLocation().getLatitude());
			System.out.println(apartment.getLocation().getLongitude());
			
			for(String item : apartment.getPictures()) {
				System.out.println(item);
			}

			apartmentDao.Create(apartment);




		}  catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return g.toJson(apartment);		
	}
	
	public String Update(Apartment apartment) {
		try {
			//TODO
			//apartmentDao.Update(apartment);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return g.toJson(apartment);		
	}
	
	public String GetAll() {
		try {
			return g.toJson(apartmentDao.GetAll());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public boolean reserve(Reservation reservation) {
		try {
			return apartmentDao.reserve(reservation);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public String getOccupiedDates(String id) {
		try {
			return g.toJson(apartmentDao.getOccupiedDates(id));
		} catch(Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public String getOccupiedRanges(String id) {
		try {
			return g.toJson(apartmentDao.getOccupiedRanges(id));
		} catch(Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public String getApartment(String id) {
		try {
			return g.toJson(apartmentDao.get(id));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return g.toJson(null);
	}
	
	public String searchApartments(String location, String datFrom, String dateTo, String numberOfGuest,String minRoom, String maxRoom, String minPrice, String maxPrice, String sortValue, String type, String apartmentStatus) {
		try {
			return g.toJson(apartmentDao.searchApartments(location, datFrom, dateTo, numberOfGuest, minRoom, maxRoom, minPrice, maxPrice,sortValue,type,apartmentStatus));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String searchReservation(String questUsername, String sortValue, String reservationStatus, int whatToGet , String username) {
		try {
			return g.toJson(apartmentDao.searchReservation(questUsername, sortValue, reservationStatus,whatToGet,username));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public boolean changeReservationStatus(String id, ReservationStatus status) {
		try {
			return apartmentDao.changeReservationStatus(id, status);
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public String getAllReservations(int whatToGet, String username) {
		try {
			return g.toJson(apartmentDao.getAllReservations(whatToGet,username));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return g.toJson(null);
	}
	
	
}
