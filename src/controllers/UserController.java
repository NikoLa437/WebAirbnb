package controllers;

import static spark.Spark.post;
import static spark.Spark.get;

import com.google.gson.Gson;

import UtilData.LoginData;
import beans.User;
import services.UserService;

public class UserController {
	private static Gson g = new Gson();

	public UserController(final UserService userService) {
		
		post("/users/add", (req, res) -> 
		userService.Register(g.fromJson(req.body(), User.class)));

		get("/users/:username", (req,res) -> userService.getUser(req.params("username")));
	
		get("/users", (req,res) -> userService.GetAll());
		
		post("/users/login", (req, res) -> 
				userService.Login(g.fromJson(req.body(), LoginData.class)));
	}
}
