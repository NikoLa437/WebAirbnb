package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import UtilData.LoginData;
import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.User;
import dao.UserDAO;
import dao.adapter.RuntimeTypeAdapterFactory;

public class UserService {

	private static Gson g;
	private UserDAO userDao;
	
	public UserService(UserDAO userDao) {
		this.userDao = userDao;
		RuntimeTypeAdapterFactory<User> userAdapterFactory = RuntimeTypeAdapterFactory.of(User.class)
		        .registerSubtype(Guest.class)
		        .registerSubtype(Administrator.class)
		        .registerSubtype(Host.class);
		g = new GsonBuilder()
		     .registerTypeAdapterFactory(userAdapterFactory)
	         .create();
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
	
	public String Update(User user) {
		try {
			return g.toJson(userDao.Update(user));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return null;
	}
	
	public String getUser(String username) {
		try {
			return g.toJson(userDao.get(username));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return g.toJson(null);
	}
	
	public String GetAll(int whatToGet, String username) {
		try {
			return g.toJson(userDao.GetAllByUserType(whatToGet, username));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public boolean canUserComment(Guest user, String appartmentId) {
		return userDao.canUserComment(user, appartmentId);
	}
	
	public User Login(LoginData data) {		
		try {
			return userDao.Login(data.getUsername(),data.getPassword());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}
	
	public boolean toggleBlockUser(String username) {
		try {
			return userDao.toggleBlockUser(username);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	public String searchUsers(String username, String name, String surname, String userType, String pol,int whatToGet, String usernameF) {
		try {
			return g.toJson(userDao.searchUsers(username, name, surname, userType,pol, whatToGet, usernameF));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
