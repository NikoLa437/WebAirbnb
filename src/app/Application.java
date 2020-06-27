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

		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		new UserController(new UserService());
		new AmenityController(new AmenityService());

	}

}
