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
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Holiday;

public class HolidayDAO {
	private final String path = "./files/holidays.json";
	private static Gson g = new Gson();

	
	public HolidayDAO() {
	}
	
	public List<Holiday> GetAll() throws JsonSyntaxException, IOException{
		List<Holiday> retVal = new ArrayList<Holiday>();
		List<Holiday> fromFile = g.fromJson((Files.readAllLines(Paths.get(path),Charset.defaultCharset()).size() == 0) ? "" : Files.readAllLines(Paths.get(path),Charset.defaultCharset()).get(0), new TypeToken<List<Holiday>>(){}.getType());
		
		if(fromFile==null) {
			return null;
		}
		
		for(Holiday item : fromFile)
			if(!item.isDeleted())
				retVal.add(item);
		return retVal;
	}
	
	public Holiday Create(Holiday holiday) throws JsonSyntaxException, IOException {
		ArrayList<Holiday> holidays = (ArrayList<Holiday>) GetAll();
		holiday.setId(GetMaxID());
		if(holidays == null) {
			holidays = new ArrayList<Holiday>();
		}
		holidays.add(holiday);
		SaveAll(holidays);
		return holiday;
	}
	
	public Holiday Delete(String id) throws JsonSyntaxException, IOException {
		ArrayList<Holiday> holidays = (ArrayList<Holiday>) GetAll();
		Holiday retVal = null;
		for(Holiday item : holidays) {
			if(item.getId() == Integer.parseInt(id)) {
				item.setDeleted(true);
				retVal = item;
				break;
			}
		}
		SaveAll(holidays);
		return retVal;
	}
	
	public Holiday Update(Holiday holiday) throws JsonSyntaxException, IOException {
		ArrayList<Holiday> holidays = (ArrayList<Holiday>) GetAll();
		for(Holiday item : holidays) {
			if(item.getId() == holiday.getId()) {
				item.setName(holiday.getName());
				break;
			}
		}
		SaveAll(holidays);
		return holiday;
	}
	
	private int GetMaxID() throws JsonSyntaxException, IOException {
		int maxId = 0;
		ArrayList<Holiday> holidays = (ArrayList<Holiday>) GetAll();
		if(holidays != null) {
			for(Holiday item : holidays) {
				if(item.getId() > maxId)
					maxId = item.getId();
			}
		}
		return ++maxId;
	}
	
	public void SaveAll(Collection<Holiday> holidays) throws JsonIOException, IOException{
	    Writer writer = new FileWriter(path);
		g.toJson(holidays, writer);
	    writer.close();
	}
}
