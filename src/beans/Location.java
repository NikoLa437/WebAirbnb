package beans;

public class Location {
	
	    private String adress;
	    private double longitude;
	    private double latitude;
	    
	    public Location() {}
	    
		public Location(String adress, double longitude, double latitude) {
			super();
			this.adress = adress;
			this.longitude = longitude;
			this.latitude = latitude;
		}
		public String getAdress() {
			return adress;
		}
		public void setAdress(String adress) {
			this.adress = adress;
		}
		public double getLongitude() {
			return longitude;
		}
		public void setLongitude(double longitude) {
			this.longitude = longitude;
		}
		public double getLatitude() {
			return latitude;
		}
		public void setLatitude(double latitude) {
			this.latitude = latitude;
		}
	    
	    
}
