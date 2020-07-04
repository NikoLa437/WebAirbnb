package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import beans.Guest;
import beans.Host;
import beans.Period;
import beans.Reservation;
import beans.ReservationStatus;
import beans.User;
import beans.Amenity;
import services.ApartmentService;
import spark.Session;

public class ApartmentController {
	private static Gson g = new Gson();

	public ApartmentController(final ApartmentService apartmentService) {
		
		post("/apartment/add", (req, res) -> {
			Session ss = req.session(true);
			Host user = ss.attribute("user");
			Apartment a = g.fromJson(req.body(), Apartment.class);
			//user.setAppartments(null)
			a.setHost(user);
			return apartmentService.Create(a);
			
		});
		
		get("/apartment/:id", (req,res) -> apartmentService.getApartment(req.params("id")));

		get("/apartment/occupied/:id", (req,res) ->  apartmentService.getOccupiedDates(req.params("id")));
		
		get("/apartment/occupiedRanges/:id", (req,res) ->  apartmentService.getOccupiedRanges(req.params("id")));

		
		post("/apartment/reserve", (req,res) -> {
			Reservation r = g.fromJson(req.body(), Reservation.class);
			
			Session ss = req.session(true);
			Guest user = ss.attribute("user");
			
			user.setRentedAppartments(null);
			user.setReservations(null);
			
			r.setGuest(user);
			
			return apartmentService.reserve(r);
		});
		
		get("/apartment/get/reservations", (req,res) -> {
			Session ss = req.session(true);
			User user = ss.attribute("user");
			int whatToGet = -1;
			if(user instanceof Guest)
				whatToGet = 0;
			else if(user instanceof Host)
				whatToGet = 1;
			else 
				whatToGet = 2;
			
			return apartmentService.getAllReservations(whatToGet, user.getUsername());
		});
		
		get("/apartments", (req,res) -> {
			Session ss = req.session(true);
			User user = ss.attribute("user");
			int whatToGet = -1;
			if(user instanceof Guest || user==null)
				whatToGet = 0;
			else if(user instanceof Host)
				whatToGet = 1;
			else 
				whatToGet = 2;
			
			String username;
			if(user==null) 
				username="";
			else {
				username=user.getUsername();
			}
				
			
			return apartmentService.GetAll(whatToGet,username);
		});
		
		get("/apartments/search/parameters", (req,res) -> {
			Session ss = req.session(true);
			User user = ss.attribute("user");
			int whatToGet = -1;
			if(user instanceof Guest)
				whatToGet = 0;
			else if(user instanceof Host)
				whatToGet = 1;
			else 
				whatToGet = 2;
			
			String username;
			if(user==null) 
				username="";
			else {
				username=user.getUsername();
			}
			

			return apartmentService.searchApartments(req.queryParams("location"), req.queryParams("dateFrom"), req.queryParams("dateTo"), req.queryParams("numberOfGuest"), req.queryParams("minRoom"), req.queryParams("maxRoom"), req.queryParams("minPrice"), req.queryParams("maxPrice"), req.queryParams("sortValue"), req.queryParams("type"), req.queryParams("apartmentStatus"),g.fromJson(req.queryParams("amenities"), new TypeToken<List<Amenity>>(){}.getType()),whatToGet,username);
		});
		
		get("/reservation/search/parameters", (req,res) -> {
			Session ss = req.session(true);
			User user = ss.attribute("user");
			int whatToGet = -1;
			if(user instanceof Guest)
				whatToGet = 0;
			else if(user instanceof Host)
				whatToGet = 1;
			else 
				whatToGet = 2;
			
	
			
			return apartmentService.searchReservation(req.queryParams("guestUsername"), req.queryParams("sortValue"), req.queryParams("reservationStatus"),whatToGet, user.getUsername());
		
		});
		
		put("/apartment/accept/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.accepted)));
		
		put("/apartment/reject/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.rejected)));
		
		put("/apartment/withdraw/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.withdraw)));
		
		put("/apartment/finished/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.done)));

	}
}
