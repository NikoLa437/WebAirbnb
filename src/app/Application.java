package app;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

import controllers.UserController;
import services.UserService;

public class Application {

	public static void main(String[] args) throws IOException {
		port(8000);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		new UserController(new UserService());
	}

}
