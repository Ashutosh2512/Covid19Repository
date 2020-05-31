package com.Ashutosh.JWTAuthrntication.Exception;

public class NationalIdExistException extends Exception{
	private String message = "National Id Already exists";

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
