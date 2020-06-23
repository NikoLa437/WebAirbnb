package beans;

public class Comment {
	private Guest guest;
	private Apartment forApartment;
	private String text;
	private Grade grade;
	
	public Comment() {
		
	}

	public Comment(Guest guest, Apartment forApartment, String text, Grade grade) {
		super();
		this.guest = guest;
		this.forApartment = forApartment;
		this.text = text;
		this.grade = grade;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public Apartment getForApartment() {
		return forApartment;
	}

	public void setForApartment(Apartment forApartment) {
		this.forApartment = forApartment;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Grade getGrade() {
		return grade;
	}

	public void setGrade(Grade grade) {
		this.grade = grade;
	}

}
