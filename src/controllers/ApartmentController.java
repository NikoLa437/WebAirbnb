package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Guest;
import beans.Host;
import beans.Period;
import beans.Reservation;
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
		
		get("/apartments", (req,res) -> apartmentService.GetAll());
		
		get("/apartments/search/parameters", (req,res) -> apartmentService.searchApartments(req.queryParams("location"), req.queryParams("dateFrom"), req.queryParams("dateTo"), req.queryParams("numberOfGuest"), req.queryParams("minRoom"), req.queryParams("maxRoom"), req.queryParams("minPrice"), req.queryParams("maxPrice"), req.queryParams("sortValue")));

	}
}
