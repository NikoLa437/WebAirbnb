package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Holiday;
import services.HolidayService;

public class HolidayController {
	private static Gson g = new Gson();

	public HolidayController(final HolidayService holidayService) {
	
			get("/holidays", (req,res) -> holidayService.GetAll());
			
			post("/holidays/add", (req, res) -> 
				holidayService.Create(g.fromJson(req.body(), Holiday.class)));
	}
}
