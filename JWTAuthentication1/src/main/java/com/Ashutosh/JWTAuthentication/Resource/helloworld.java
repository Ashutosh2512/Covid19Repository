package com.Ashutosh.JWTAuthentication.Resource;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloworld {
	
	@GetMapping(value="/hello")
	public String hello() {
		return "hello to the world";
	}

	@GetMapping(value="/adminOnly")
	public String getAdminRequest() {
		return "Accessible by admin only.";
	}	
	
}
