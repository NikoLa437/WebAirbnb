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
