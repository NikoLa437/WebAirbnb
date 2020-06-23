package app;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

public class Application {

	public static void main(String[] args) throws Exception {
		port(80);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("/rest/demo/book/:isbn", (req, res) -> {
			String isbn = req.params("isbn");
			return "/rest/demo/book received PathParam 'isbn': " + isbn;
		});
		// TODO Auto-generated method stub
		System.out.println("asdad");
	}

}
