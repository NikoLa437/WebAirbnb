package beans;

public class Holiday {
	private int id;
	private String name;
	private long date;
	private boolean isDeleted;
	
	public Holiday() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Holiday(int id,String name, long date) {
		super();
		this.id=id;
		this.name = name;
		this.date = date;
		this.isDeleted=false;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
	
	
}
