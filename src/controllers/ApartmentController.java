package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Apartment;
import services.ApartmentService;

public class ApartmentController {
	private static Gson g = new Gson();

	public ApartmentController(final ApartmentService apartmentService) {
		
		post("/apartment/add", (req, res) -> 
			apartmentService.Create(g.fromJson(req.body(), Apartment.class)));
		
		get("/apartments", (req,res) -> apartmentService.GetAll());

		get("/apartments/search/parameters", (req,res) -> apartmentService.searchApartments(req.queryParams("location"), req.queryParams("dateFrom"), req.queryParams("dateTo"), req.queryParams("numberOfGuest"), req.queryParams("minRoom"), req.queryParams("maxRoom"), req.queryParams("minPrice"), req.queryParams("maxPrice")));

	}
}
