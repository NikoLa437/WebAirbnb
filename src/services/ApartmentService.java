package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Amenity;
import beans.Apartment;
import dao.AmenityDAO;
import dao.ApartmentDAO;

public class ApartmentService {
	private static Gson g = new Gson();
	private static ApartmentDAO apartmentDao;
	
	public ApartmentService() {
		this.apartmentDao = new ApartmentDAO();
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
	
	
}
