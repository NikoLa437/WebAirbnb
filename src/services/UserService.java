package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;


import beans.User;
import dao.UserDAO;

public class UserService {

	private static Gson g = new Gson();
	private static UserDAO userDao;
	
	public UserService() {
		this.userDao = new UserDAO();
	}

	public String Register(User user) throws JsonSyntaxException, IOException {
		try {
			userDao.Create(user);
		}  catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return g.toJson(user);		
	}
	
	public String getUser(String username) {
		try {
			return g.toJson(userDao.get(username));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return g.toJson(null);
	}
	
	public String GetAll() {
		try {
			return g.toJson(userDao.GetAll());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static User Login(String username,String password) {
		return null;
	}
	
}
