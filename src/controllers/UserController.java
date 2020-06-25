package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.User;
import services.UserService;

public class UserController {
	private static Gson g = new Gson();

	public UserController(final UserService userService) {
		
		post("/users/add", (req, res) -> 
			UserService.Register(g.fromJson(req.body(), User.class)));

	}
}
