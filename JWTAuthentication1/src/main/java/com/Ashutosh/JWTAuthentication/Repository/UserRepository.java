package com.Ashutosh.JWTAuthentication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ashutosh.JWTAuthentication.model.Person;

public interface UserRepository extends JpaRepository<Person, String> {

	Person findByNationalId(String id);
	Person findByUsername(String username);
	void deleteByUsername(String username);
}
