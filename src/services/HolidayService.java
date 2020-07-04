package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Holiday;
import dao.HolidayDAO;

public class HolidayService {
	private static Gson g = new Gson();
	private static HolidayDAO holidayDao;
	
	public HolidayService(HolidayDAO holidayDao) {
		this.holidayDao = holidayDao;
	}
	
	public String Create(Holiday holiday) throws JsonSyntaxException, IOException {
		try {
			holidayDao.Create(holiday);
		}  catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return g.toJson(holiday);		
	}
	
	
	public String GetAll() {
		try {
			return g.toJson(holidayDao.GetAll());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String Delete(String id) {
		try {
			return g.toJson(holidayDao.Delete(id));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return null;
	}
}
