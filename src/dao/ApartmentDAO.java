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

import beans.Amenity;
import beans.Apartment;
import beans.ApartmentStatus;
import beans.ApartmentType;
import beans.Guest;
import beans.Period;
import beans.Reservation;
import beans.ReservationStatus;


public class ApartmentDAO {
	private final String path = "./files/apartment.json";
	private static Gson g = new Gson();
	private UserDAO userDao;
	
	public ApartmentDAO(UserDAO userDao) {
		this.userDao = userDao;
	}
	
	public List<Apartment> GetAll() throws JsonSyntaxException, IOException{		
		return g.fromJson((Files.readAllLines(Paths.get(path),Charset.defaultCharset()).size() == 0) ? "" : Files.readAllLines(Paths.get(path),Charset.defaultCharset()).get(0), new TypeToken<List<Apartment>>(){}.getType());
	}
	
	public List<Apartment> GetAllApartmentForUser(int whatToGet, String username) throws JsonSyntaxException, IOException{		
		List<Apartment> retVal = new ArrayList<Apartment>();
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		
		
		for(Apartment a : apartments) {
				if(whatToGet == 0) {
					if(a.getStatus()==ApartmentStatus.active) {
						retVal.add(a);
					}
				}else if(whatToGet == 1) {
					if(a.getHost().getUsername().equals(username)) {
						retVal.add(a);
					}
				}
				else {
					retVal.add(a);
				}
			}
		return retVal;
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
	
	
	private List<Period> sortApartmentPeriods(List<Period> forSort){
		List<Period> retVal = new ArrayList<Period>();
		Date t = new Date();
	    @SuppressWarnings("deprecation")
		Date today = new Date(t.getYear(),t.getMonth(), t.getDate());
		for(Period p : forSort) {
			if(p.getDateFrom() >= today.getTime()) {
				int i = 0;
				boolean added = false;
				for(Period po : retVal) {
					if(po.getDateFrom() < p.getDateFrom()) {
						retVal.add(i, p);
						added = true;
						break;
					}
					
					i++;
				}		
				if(!added)
					retVal.add(p);
			}
		}	
		return retVal;
	}
	
	public List<Period> getOccupiedRanges(String id) throws JsonSyntaxException, IOException{
		Apartment apartment = get(id);
		List<Period> retVal = new ArrayList<Period>();

		List<Period> sortedPeriods = sortApartmentPeriods(apartment.getDateForRenting());
		
		Date t = new Date();
	    @SuppressWarnings("deprecation")
		Long today = (new Date(t.getYear(),t.getMonth(), t.getDate())).getTime();
		
		for(Period p : sortedPeriods) {
			retVal.add(new Period(today, p.getDateFrom() - 24*60*60*1000));
			
			today = p.getDateTo() + 24*60*60*1000;
		}
		
		
		retVal.add(new Period(today, 0));
		
		return retVal;
	}
	
	private int GetMaxIDForReservation() throws JsonSyntaxException, IOException  {
		int maxId = 0;
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		for(Apartment a : apartments) {
			for(Reservation r : a.getReservations()) {
				if(r.getId() > maxId)
					maxId = r.getId();
			}
		}
		return ++maxId;
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
	
	public List<Reservation> getAllReservations(int whatToGet, String username) throws JsonSyntaxException, IOException{
		List<Reservation> retVal = new ArrayList<Reservation>();
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		
		for(Apartment a : apartments) {
			for(Reservation r : a.getReservations()) {
				if(whatToGet == 0) {
					if(r.getGuest().getUsername().equals(username)) {
						r.setAppartment(new Apartment(a.getId(),a.getType(),a.getNumberOfRoom(),a.getNumberOfGuest(),a.getLocation(), null, null, null, null, null,0, 0, 0, null, null, null));
						retVal.add(r);
					}
				}else if(whatToGet == 1) {
					if(a.getHost().getUsername().equals(username)) {
						r.setAppartment(new Apartment(a.getId(),a.getType(),a.getNumberOfRoom(),a.getNumberOfGuest(),a.getLocation(), null, null, null, null, null,0, 0, 0, null, null, null));
						retVal.add(r);
					}
				}
				else {
					r.setAppartment(new Apartment(a.getId(),a.getType(),a.getNumberOfRoom(),a.getNumberOfGuest(),a.getLocation(), null, null, null, null, null,0, 0, 0, null, null, null));
					retVal.add(r);
				}
			}
		}
			
		return retVal;
	}
	
	public boolean reserve(Reservation reservation) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		boolean retVal = false;
		Guest g = (Guest) userDao.get(reservation.getGuest().getUsername());
		
		
		List<Reservation> guestReservations = g.getReservations();
		Apartment ap = null;
		for(Apartment a : apartments) {
			if(a.getId() == reservation.getAppartment().getId()) {
				List<Reservation> temp = a.getReservations();
				
				ap = a;
				if(temp == null)
					temp = new ArrayList<Reservation>();
				
				reservation.setId(GetMaxIDForReservation());				
				reservation.setAppartment(null);
				temp.add(reservation);
				a.setReservations(temp);
				a.setFreeDateForRenting(setFreeDaysForRenting(a.getFreeDateForRenting(),reservation));
				retVal = true;
				break;
			}
		}
		SaveAll(apartments);
		
		ap.setReservations(null);
		
		reservation.setAppartment(ap);
		reservation.setGuest(null);
		guestReservations.add(reservation);
		
		userDao.Update(g);
		
		return retVal;
	}
	
	
	
	private List<Long> setFreeDaysForRenting(List<Long> freeDateForRenting, Reservation reservation) {
		
		List<Long> retVal = new ArrayList<Long>();
		List<Long> reservationDates = new ArrayList<Long>();
		long temp = reservation.getStartDate();
		long endDate = reservation.getStartDate() + reservation.getDaysForStay()*24*60*60*1000;

		while(temp <= endDate) {
			reservationDates.add(temp);
			temp += 24*60*60*1000;
		}
				
		for(long date : freeDateForRenting) {
			if(!reservationDates.contains(date)) {
				retVal.add(date);
			}
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
	
	public List<Apartment> searchApartments(String location, String dateFrom, String dateTo, String numberOfGuest,String minRoom, String maxRoom, String minPrice, String maxPrice, String sortValue, String type, String apartmentStatus,List<Amenity> amenities,int whatToGet , String username) throws JsonSyntaxException, IOException{
			
		
		
			ArrayList<Apartment> list = (ArrayList<Apartment>) GetAllApartmentForUser(whatToGet, username);
			List<Apartment> retVal = new ArrayList<Apartment>();
						
			ApartmentType tip;
			if(type.equals("soba"))
				tip = ApartmentType.room;
			else
				tip = ApartmentType.apartment;
			
			ApartmentStatus status;
			if(apartmentStatus.equals("aktivan"))
				status = ApartmentStatus.active;
			else
				status = ApartmentStatus.inactive;
	
			//datefrom//dateto
			for(Apartment item : list) {
				if((!location.isEmpty() ? item.getLocation().getAdress().getCity().equals(location) : true) 
						&& (!numberOfGuest.isEmpty()? item.getNumberOfGuest()==Integer.parseInt(numberOfGuest):true)
						&& ((!minRoom.isEmpty())? (item.getNumberOfRoom()>=Integer.parseInt(minRoom)) :true)
						&&((!maxRoom.isEmpty())? (item.getNumberOfRoom()<=Integer.parseInt(maxRoom)): true)
						&& ((!minPrice.isEmpty())? (item.getPriceForNight()>=Integer.parseInt(minPrice)) :true)
						&&((!maxPrice.isEmpty())? (item.getPriceForNight()<=Integer.parseInt(maxPrice)): true)
						&&((!apartmentStatus.isEmpty())? (item.getStatus()==status): true)
						&&((!type.isEmpty())? (item.getType()==tip): true)) {
					
					if(amenities.size()!=0) {
						if(whatToGet==1) {
							if(item.getStatus()==ApartmentStatus.active)
								if(uporediListe(item.getAmenities(), amenities))
									retVal.add(item);
						}
						else {
							if(uporediListe(item.getAmenities(), amenities))
								retVal.add(item);
						}
					}else {
						if(whatToGet==1) {
							if(item.getStatus()==ApartmentStatus.active)
									retVal.add(item);
						}else {
							retVal.add(item);
						}
					}
					
					
				}
						

			}	
			
			

						
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
	
	private boolean uporediListe(List<Amenity> listaApartmana,List<Amenity> listaPretrage){
		
		
		for(Amenity itemPretrage : listaPretrage) {
			boolean postoji=false;
			for(Amenity itemApartmana : listaApartmana) {
				if(itemApartmana.getId()==itemPretrage.getId()) {
					postoji=true;
				}
			}
			if(!postoji) {
				return false;
			}
			
		}
		
		return true;
	}
	
	public List<Reservation> searchReservation(String questUsername, String sortValue, String reservationStatus, int whatToGet , String username) throws JsonSyntaxException, IOException{
		
		ArrayList<Reservation> list = (ArrayList<Reservation>) getAllReservations(whatToGet,username);
		List<Reservation> retVal = new ArrayList<Reservation>();
		
		ReservationStatus status;
		if(reservationStatus.equals("kreirano"))
			status = ReservationStatus.created;
		else if(reservationStatus.equals("odbijeno"))
			status = ReservationStatus.rejected;
		else if(reservationStatus.equals("otkazano"))
			status = ReservationStatus.withdraw;
		else if(reservationStatus.equals("prihvaceno"))
			status = ReservationStatus.accepted;
		else 
			status = ReservationStatus.done;

		for(Reservation item : list) {
			if((!reservationStatus.isEmpty()? item.getStatus()==status : true)
					&& (!questUsername.isEmpty()? item.getGuest().getUsername().equals(questUsername) : true))
				retVal.add(item);
		}	
		
		if(sortValue.equals("rastuca")) {
			Collections.sort(retVal, new Comparator<Reservation>() {
				@Override
				public int compare(Reservation o1, Reservation o2) {
					// TODO Auto-generated method stub
					return (int)(o1.getPrice() - o2.getPrice());
				}
			});	
		}else if(sortValue.equals("opadajuca")) {
			Collections.sort(retVal, new Comparator<Reservation>() {
				@Override
				public int compare(Reservation o1, Reservation o2) {
					// TODO Auto-generated method stub
					return (int)(o2.getPrice() - o1.getPrice());
				}
			});	
		}
		
		
		
		return retVal;

	}


	
	public boolean changeReservationStatus(String id, ReservationStatus status) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		boolean changed = false;
		for(Apartment a : apartments) {
			for(Reservation r : a.getReservations()) {
				if(r.getId() == Integer.parseInt(id)) {
					r.setStatus(status);
					if(status == ReservationStatus.rejected || status == ReservationStatus.withdraw)
						a.setFreeDateForRenting(AddDaysForRenting(a.getFreeDateForRenting(), r));
					changed = true;
					break;
				}
			}
			if(changed)
				break;
		}
		SaveAll(apartments);
		userDao.changeReservationStatus(id, status);
		return changed;
	}
	
	public void deleteAllAmenities(int id) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		for(Apartment a : apartments) {
			for(Amenity am : a.getAmenities()) {
				if(am.getId() == id) {
					List<Amenity> amenities = a.getAmenities();
					amenities.remove(am);
					a.setAmenities(amenities);
					break;
				}
			}
		}
		SaveAll(apartments);
	}
	
	public void updateAllAmenities(Amenity amenity) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) GetAll();
		for(Apartment a : apartments) {
			for(Amenity am : a.getAmenities()) {
				if(am.getId() == amenity.getId()) {
					List<Amenity> amenities = a.getAmenities();
					amenities.remove(am);
					amenities.add(amenity);
					a.setAmenities(amenities);
					break;
				}
			}
		}
		SaveAll(apartments);
	}
	

	private List<Long> AddDaysForRenting(List<Long> dateForRenting, Reservation reservation) {
		long temp = reservation.getStartDate();
		long endDate = reservation.getStartDate() + reservation.getDaysForStay()*24*60*60*1000;

		while(temp <= endDate) {
			dateForRenting.add(temp);
			temp += 24*60*60*1000;
		}
		return dateForRenting;
	}


}
