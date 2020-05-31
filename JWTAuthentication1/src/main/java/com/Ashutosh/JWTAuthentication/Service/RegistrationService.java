package com.Ashutosh.JWTAuthentication.Service;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Ashutosh.JWTAuthentication.Repository.UserRepository;
import com.Ashutosh.JWTAuthentication.model.Person;
import com.Ashutosh.JWTAuthrntication.Exception.NationalIdExistException;
import com.Ashutosh.JWTAuthrntication.Exception.UserExistException;

@Service
public class RegistrationService {
	
	@Autowired
	private UserRepository ur;
	
	public void registerUser(Person user) throws UserExistException, NationalIdExistException {
		if(ur.findByUsername(user.getUsername())!=null) {
			throw new UserExistException();
		}
		else if(ur.findByNationalId(user.getNationalId())!=null) {
			throw new NationalIdExistException();
		}
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10, new SecureRandom());
		String encodedpassword = encoder.encode(user.getPassword());
		user.setPassword(encodedpassword);
		ur.save(user);
	}

}
