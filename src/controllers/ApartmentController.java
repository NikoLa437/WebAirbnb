package controllers;

import static spark.Spark.post;
import static spark.Spark.get;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Host;
import beans.Period;
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
			p.add(new Period(new Date(120, 7, 5), new Date(120, 8, 5)));
			List<Date> dddd = new ArrayList<Date>();
			dddd.add(new Date(120, 7, 6));
			dddd.add(new Date(120, 7, 12));
			dddd.add(new Date(120, 7, 8));
			dddd.add(new Date(120, 7, 11));
			dddd.add(new Date(120, 7, 7));

			a.setDateForRenting(p);
			a.setFreeDateForRenting(dddd);
			a.setHost(user);
			return apartmentService.Create(a);
			
		});
		
		get("/apartment/:id", (req,res) -> apartmentService.getApartment(req.params("id")));

		get("/apartment/occupied/:id", (req,res) ->  apartmentService.getOccupiedDates(req.params("id")));

	}
}
