package com.Ashutosh.JWTAuthentication.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.Ashutosh.JWTAuthentication.Service.CumulativeResultService;
import com.Ashutosh.JWTAuthentication.Service.MyUserDetailsService;
import com.Ashutosh.JWTAuthentication.model.CumulativeResult;
import com.Ashutosh.JWTAuthentication.model.Result;

@RestController
public class UserManagementController {
	
	@Autowired
	private MyUserDetailsService userDetailsService;
	
	@Autowired
	private CumulativeResultService crs;
	
	@CrossOrigin(origins = "*")
	@PostMapping(value="/remove")
	public ResponseEntity<?> removeUser(@RequestHeader("username") String username){
		try {
			userDetailsService.removeUser(username);
		}catch(UsernameNotFoundException e) {
			return new ResponseEntity(new Exception("User doesn't exist"),HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok("Deleted");
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping(value="/setScore",produces = "application/json")
	public CumulativeResult setScore(@RequestBody Result result){
		userDetailsService.setScore(result.getUsername(), result.getScore());
		if(result.getIspositive()) {
			crs.increasepositivechecks();
		}
		crs.increasetotalchecks();
		CumulativeResult cr =crs.getCumulativeResult();
		return cr;
	}
}
