package com.Ashutosh.JWTAuthentication.model;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public class AuthenticationResponse {

	private final String jwt;
	private final String role;
	
	public AuthenticationResponse(String jwt, String role) {
		this.jwt=jwt;
		this.role=role;
	}
	
	public String getJwt() {
		return this.jwt;
	}
	public String getRole() {
		return this.role;
	}
	
}
