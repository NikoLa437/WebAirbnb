package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Apartment;
import services.ApartmentService;

public class ApartmentController {
	private static Gson g = new Gson();

	public ApartmentController(final ApartmentService apartmentService) {
		
		post("/apartment/add", (req, res) -> 
			apartmentService.Create(g.fromJson(req.body(), Apartment.class)));

	}
}
