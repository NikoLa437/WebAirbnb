package beans;

import java.util.Date;

public class Period {

	private Date dateFrom;
	private Date dateTo;
	
	public Period() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Period(Date dateFrom, Date dateTo) {
		super();
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
	}

	public Date getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(Date dateFrom) {
		this.dateFrom = dateFrom;
	}

	public Date getDateTo() {
		return dateTo;
	}

	public void setDateTo(Date dateTo) {
		this.dateTo = dateTo;
	}
}
