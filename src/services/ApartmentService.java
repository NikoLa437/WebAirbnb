package services;

import com.google.gson.Gson;

import dao.AmenityDAO;
import dao.ApartmentDAO;

public class ApartmentService {
	private static Gson g = new Gson();
	private static ApartmentDAO apartmentDao;
	
	public ApartmentService() {
		this.apartmentDao = new ApartmentDAO();
	}
	
	
}
