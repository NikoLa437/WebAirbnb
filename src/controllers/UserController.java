package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import UtilData.LoginData;
import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.User;
import dao.adapter.RuntimeTypeAdapterFactory;
import services.UserService;
import spark.Session;

public class UserController {
	private static Gson g;
	private static Gson gs = new Gson();

	public UserController(final UserService userService) {
		
		RuntimeTypeAdapterFactory<User> userAdapterFactory = RuntimeTypeAdapterFactory.of(User.class)
		        .registerSubtype(Guest.class)
		        .registerSubtype(Administrator.class)
		        .registerSubtype(Host.class);
		g = new GsonBuilder()
		     .registerTypeAdapterFactory(userAdapterFactory)
	         .create();
		
		post("/users/addGuest", (req, res) ->{ 
			
			User u = g.fromJson(req.body(), Guest.class);
			
			return userService.Register(u);		
		});
		
		post("/users/addHost", (req, res) ->{ 		
			User u = g.fromJson(req.body(), Host.class);		
			return userService.Register(u);		
		});

		get("/users/:username", (req,res) -> userService.getUser(req.params("username")));
		
		get("/users/search/parameters", (req,res) -> userService.searchUsers(req.queryParams("username"), req.queryParams("name"), req.queryParams("surname"), req.queryParams("userType")));
	
		get("/users", (req,res) -> {
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			int whatToGet = -1;
			if(user instanceof Guest)
				whatToGet = 0;
			else if(user instanceof Host)
				whatToGet = 1;
			else 
				whatToGet = 2;
			return userService.GetAll(whatToGet, user.getUsername());
		});
		
		post("/users/login", (req, res) -> {
			res.type("application/json");
			User u = userService.Login(gs.fromJson(req.body(), LoginData.class));
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
		
		get("/users/apartment/cancoment/:appartmentId", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			User user = ss.attribute("user");
			if(user == null || !(user instanceof Guest))
				return false;
			return userService.canUserComment((Guest)user, req.params("appartmentId"));
		});
		
		put("/users/update", (req,res)-> userService.Update(g.fromJson(req.body(), User.class)));
	}
}
