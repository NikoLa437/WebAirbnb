package controllers;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.put;

import com.google.gson.Gson;

import UtilData.LoginData;
import beans.User;
import services.UserService;
import spark.Session;

public class UserController {
	private static Gson g = new Gson();

	public UserController(final UserService userService) {
		
		post("/users/add", (req, res) -> 
		userService.Register(g.fromJson(req.body(), User.class)));

		get("/users/:username", (req,res) -> userService.getUser(req.params("username")));
	
		get("/users", (req,res) -> userService.GetAll());
		
		post("/users/login", (req, res) -> {
			res.type("application/json");
			User u = g.fromJson(userService.Login(g.fromJson(req.body(), LoginData.class)), User.class);
			Session ss = req.session(true);
			User user = ss.attribute("user");
			if (user == null) {
				user = u;
				ss.attribute("user", user);
			}
			return g.toJson(user);
		});
		
		get("/users/log/test", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			User user = ss.attribute("user");
			return g.toJson(user);
		});
		
		get("/users/log/logout", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if (user != null) {
				ss.invalidate();
			}
			return true;
		});
		
		put("/users/update", (req,res)-> userService.Update(g.fromJson(req.body(), User.class)));
	}
}
