package com.Ashutosh.JWTAuthentication.model;

public class Result {
	
	private String username;
	private int score;
	private boolean ispositive;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public boolean getIspositive() {
		return ispositive;
	}
	public void setIspositive(boolean ispositive) {
		this.ispositive = ispositive;
	}
	
}
