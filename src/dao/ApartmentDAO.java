package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import beans.Period;
import beans.Reservation;


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
	
	public Apartment get(String id) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		if(apartments != null) {
			for(Apartment a : apartments) {
				if(a.getId() == Integer.parseInt(id)) {
					return a;
				}
			}
		}
		return null;
	}
	
	public List<Long> getOccupiedDates(String id) throws JsonSyntaxException, IOException{
		Apartment apartment = get(id);
		List<Long> retVal = new ArrayList<Long>();
		for(Period p : apartment.getDateForRenting()) {
			Date temp = new Date(p.getDateFrom());
			Date dateTo = new Date(p.getDateTo());
			Calendar c = Calendar.getInstance(); 
			while(temp.compareTo(dateTo) <= 0) {
				if(!apartment.getFreeDateForRenting().contains(temp.getTime())) {
					retVal.add(temp.getTime());
				}
				c.setTime(temp); 
				c.add(Calendar.DAY_OF_YEAR, 1);
				temp = c.getTime();
			}
		}
		return retVal;
	}
	
	public boolean reserve(Reservation reservation) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		boolean retVal = false;
		for(Apartment a : apartments) {
			if(a.getId() == reservation.getAppartment().getId()) {
				List<Reservation> temp = a.getReservations();
				if(temp == null)
					temp = new ArrayList<Reservation>();
				reservation.setAppartment(null);
				temp.add(reservation);
				a.setReservations(temp);
				a.setFreeDateForRenting(setFreeDaysForRenting(a.getFreeDateForRenting(),reservation));
				retVal = true;
				break;
			}
		}
		SaveAll(apartments);
		return retVal;
	}
	
	private List<Long> setFreeDaysForRenting(List<Long> freeDateForRenting, Reservation reservation) {
		
		List<Long> retVal = new ArrayList<Long>();
		List<Long> reservationDates = new ArrayList<Long>();
		Date temp = new Date(reservation.getStartDate());
		Date endDate = new Date(reservation.getStartDate() + reservation.getDaysForStay()*24*60*60*1000);
		
		Calendar c = Calendar.getInstance(); 
		endDate = c.getTime();

		while(temp.compareTo(endDate) <= 0) {
			reservationDates.add(temp.getTime());
			c.setTime(temp); 
			c.add(Calendar.DAY_OF_YEAR, 1);
			temp = c.getTime();

		}
		
		for(long date : freeDateForRenting) {
			if(!reservationDates.contains(date))
				retVal.add(date);
		}
		
		return retVal;
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
	
	public List<Apartment> searchApartments(String location, String datFrom, String dateTo, String numberOfGuest,String minRoom, String maxRoom, String minPrice, String maxPrice, String sortValue) throws JsonSyntaxException, IOException{
		
		ArrayList<Apartment> list = (ArrayList<Apartment>) GetAll();
		List<Apartment> retVal = new ArrayList<Apartment>();

		for(Apartment item : list) {
			if(!location.isEmpty() ? item.getLocation().getAdress().getCity().equals(location) : true)
				retVal.add(item);
		}		
		
		System.out.println(sortValue);
		
		if(sortValue.equals("rastuca")) {
			Collections.sort(retVal, new Comparator<Apartment>() {
				@Override
				public int compare(Apartment o1, Apartment o2) {
					// TODO Auto-generated method stub
					return (int)(o1.getPriceForNight() - o2.getPriceForNight());
				}
			});	
		}else if(sortValue.equals("opadajuca")) {
			Collections.sort(retVal, new Comparator<Apartment>() {
				@Override
				public int compare(Apartment o1, Apartment o2) {
					// TODO Auto-generated method stub
					return (int)(o2.getPriceForNight() - o1.getPriceForNight());
				}
			});	
		}
		
		return retVal;

	}

	
	


}
