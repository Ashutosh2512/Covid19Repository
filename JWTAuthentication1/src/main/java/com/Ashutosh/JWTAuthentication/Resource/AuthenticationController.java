package com.Ashutosh.JWTAuthentication.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Ashutosh.JWTAuthentication.Service.MyUserDetailsService;
import com.Ashutosh.JWTAuthentication.model.AuthenticationRequest;
import com.Ashutosh.JWTAuthentication.model.AuthenticationResponse;
import com.Ashutosh.JWTAuthentication.util.Jwt;

@RestController
public class AuthenticationController {
	
	@Autowired
	private Jwt JwtTokenUtil;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MyUserDetailsService userDetailsService;

	@CrossOrigin(origins="*")
	@PostMapping(value="/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest){
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),authenticationRequest.getPassword()));

		}
		catch(BadCredentialsException e) {
			return new ResponseEntity(new Exception("Bad credentials"),HttpStatus.BAD_REQUEST);
		}
		
		final UserDetails userDetails=userDetailsService.loadUserByUsername(authenticationRequest.getUserName());;
		
		String jwt=JwtTokenUtil.generateToken(userDetails);
		String role=userDetailsService.loadRole(authenticationRequest.getUserName());
		return ResponseEntity.ok(new AuthenticationResponse(jwt,role));
	}
}
