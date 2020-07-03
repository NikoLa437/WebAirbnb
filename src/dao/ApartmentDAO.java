package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import beans.User;
import beans.UserType;


public class ApartmentDAO {
	private final String path = "./files/apartment.json";
	private static Gson g = new Gson();

	public ApartmentDAO() {
		
	}
	
	public List<Apartment> GetAll() throws JsonSyntaxException, IOException{		
		return g.fromJson((Files.readAllLines(Paths.get(path),Charset.defaultCharset()).size() == 0) ? "" : Files.readAllLines(Paths.get(path),Charset.defaultCharset()).get(0), new TypeToken<List<Apartment>>(){}.getType());
	}
	
	public Apartment Create(Apartment apartment) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		apartment.setId(GetMaxID());
		if(apartments == null) {
			apartments = new ArrayList<Apartment>();
		}
		apartments.add(apartment);
		SaveAll(apartments);
		return apartment;
	}
	
	private int GetMaxID() throws JsonSyntaxException, IOException {
		int maxId = 0;
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		if(apartments != null) {
			for(Apartment a : apartments) {
				if(a.getId() > maxId)
					maxId = a.getId();
			}
		}
		return ++maxId;
	}
	
	public void SaveAll(Collection<Apartment> apartments) throws JsonIOException, IOException{
	    Writer writer = new FileWriter(path);
		g.toJson(apartments, writer);
	    writer.close();
	}
	
	public List<Apartment> searchApartments(String location, String datFrom, String dateTo, String numberOfGuest,String minRoom, String maxRoom, String minPrice, String maxPrice) throws JsonSyntaxException, IOException{
		
		ArrayList<Apartment> list = (ArrayList<Apartment>) GetAll();
		List<Apartment> retVal = new ArrayList<Apartment>();

		for(Apartment item : list) {
			if(!location.isEmpty() ? item.getLocation().getAdress().getCity().equals(location) : true)
				retVal.add(item);
		}		
		return retVal;

	}
	
	


}
