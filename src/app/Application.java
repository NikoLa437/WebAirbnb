package app;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import controllers.AmenityController;
import controllers.UserController;
import services.AmenityService;
import services.UserService;

public class Application {
	
	public static void main(String[] args) throws IOException {
		port(8080);
		
		/*
		 * User a = new Administrator("admin", "admin", "Dusan", "Petrovic",
		 * Gender.male);
		 * 
		 * UserDAO dao = new UserDAO(); dao.Create(a);
		 */
		//User a = new Administrator("admin", "admin", "Dusan", "Petrovic", Gender.male);
				  
		//UserDAO dao = new UserDAO(); dao.Create(a); 
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		new UserController(new UserService());
		new AmenityController(new AmenityService());

	}

}
