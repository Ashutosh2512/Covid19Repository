package com.Ashutosh.JWTAuthentication.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Ashutosh.JWTAuthentication.Service.RegistrationService;
import com.Ashutosh.JWTAuthentication.model.Person;
import com.Ashutosh.JWTAuthrntication.Exception.NationalIdExistException;
import com.Ashutosh.JWTAuthrntication.Exception.UserExistException;

@RestController
public class RegistrationController {
	
	@Autowired
	private RegistrationService rs;

	@CrossOrigin(origins = "*")
	@PostMapping(value="/register")
	public ResponseEntity<?> registerUser(@RequestBody Person user){
		try {
			rs.registerUser(user);
		}catch(UserExistException e) {
			return (ResponseEntity<?>) ResponseEntity.status(409).body(e);
		}
		catch(NationalIdExistException e) {
			return (ResponseEntity<?>) ResponseEntity.status(409).body(e);
		}
		return ResponseEntity.ok("Registered");
		
	}
}
