package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Guest;
import beans.Host;
import beans.Period;
import beans.Reservation;
import beans.ReservationStatus;
import beans.User;
import services.ApartmentService;
import spark.Session;

public class ApartmentController {
	private static Gson g = new Gson();

	public ApartmentController(final ApartmentService apartmentService) {
		
		post("/apartment/add", (req, res) -> {
			Session ss = req.session(true);
			Host user = ss.attribute("user");
			Apartment a = g.fromJson(req.body(), Apartment.class);
			user.setAppartments(null);
			List<Period> p = new ArrayList<Period>();
			p.add(new Period(1596578400000l, 1599256800000l));
			List<Long> dddd = new ArrayList<Long>();
			dddd.add(1596405600000l);
			dddd.add(1597183200000l);
			dddd.add(1596837600000l);
			dddd.add(1597096800000l);
			dddd.add(1596751200000l);

			a.setDateForRenting(p);
			a.setFreeDateForRenting(dddd);
			a.setHost(user);
			return apartmentService.Create(a);
			
		});
		
		get("/apartment/:id", (req,res) -> apartmentService.getApartment(req.params("id")));

		get("/apartment/occupied/:id", (req,res) ->  apartmentService.getOccupiedDates(req.params("id")));
		
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

		put("/apartment/accept/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.accepted)));
		
		put("/apartment/reject/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.rejected)));
		
		put("/apartment/withdraw/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.withdraw)));
		
		put("/apartment/finished/:id", (req,res) -> (apartmentService.changeReservationStatus(req.params("id"),ReservationStatus.done)));



	}
}
