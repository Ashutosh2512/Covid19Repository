package com.Ashutosh.JWTAuthentication.Service;

import java.util.ArrayList;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Ashutosh.JWTAuthentication.Repository.UserRepository;
import com.Ashutosh.JWTAuthentication.model.Person;

@Service
public class MyUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository ur;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Person person = ur.findByUsername(username);
		if(person == null) {
			throw new UsernameNotFoundException(username+" is not registered");
		}
		User user=new User(person.getUsername(),person.getPassword(),
				Collections.singleton(new SimpleGrantedAuthority(person.getRole()))); 
		return user;
	}
	public String loadRole(String username) {
		return ur.findByUsername(username).getRole();
	}
	public void setScore(String username,int score) {
		Person person= ur.findByUsername(username);
		if(person==null) {
			throw new UsernameNotFoundException(username+" is not registered");
		}
		person.setScore(score);
		ur.save(person);
	}
	@Transactional
	public void removeUser(String username) {
		if(ur.findByUsername(username) == null) {
			throw new UsernameNotFoundException(username+" does not exist in database");
		}
		ur.deleteByUsername(username);
	}

}
