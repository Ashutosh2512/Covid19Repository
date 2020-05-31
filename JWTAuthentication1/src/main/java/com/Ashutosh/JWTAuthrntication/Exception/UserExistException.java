package com.Ashutosh.JWTAuthrntication.Exception;

public class UserExistException extends Exception{
	
	private String message = "User Already Exists";

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	

}
