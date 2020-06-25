package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Gender;
import beans.Guest;
import beans.User;
import dao.UserDAO;

public class UserService {

	private static Gson g = new Gson();
	private static UserDAO userDao;
	
	public UserService() {
		this.userDao = new UserDAO();
	}

	public static String Register(User user) throws JsonSyntaxException, IOException {
		try {
			userDao.Create(user);
		}  catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return g.toJson(user);		
	}

}
