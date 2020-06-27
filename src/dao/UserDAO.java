package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.User;

public class UserDAO {

	private final String path = "./files/users.json";
	private static Gson g = new Gson();

	public UserDAO() {
		
	}
	
	public List<User> GetAll() throws JsonSyntaxException, IOException{		
		return g.fromJson((Files.readAllLines(Paths.get(path),Charset.defaultCharset()).size() == 0) ? "" : Files.readAllLines(Paths.get(path),Charset.defaultCharset()).get(0), new TypeToken<List<User>>(){}.getType());
	}
	
	public User Create(User user) throws JsonSyntaxException, IOException {
		ArrayList<User> users = (ArrayList<User>) GetAll();
		if(users == null) {
			users = new ArrayList<User>();
		}
		users.add(user);
		SaveAll(users);
		return user;
	}
	
	public void SaveAll(Collection<User> users) throws JsonIOException, IOException{
	    Writer writer = new FileWriter(path);
		g.toJson(users, writer);
	    writer.close();
	}
	
	public User get(String username) throws JsonSyntaxException, IOException {
		ArrayList<User> users = (ArrayList<User>) GetAll();
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				return u;
			}
		}
		
		return null;
	}
	
	public User Login(String username,String password) throws JsonSyntaxException, IOException {
		for(User user : GetAll()) {
			if(user.getUsername().equals(username) && user.getPassword().equals(password)) {
				return user;
			}
		}
		return null;
	}

}
