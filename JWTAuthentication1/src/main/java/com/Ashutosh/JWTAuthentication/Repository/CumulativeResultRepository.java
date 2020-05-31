package com.Ashutosh.JWTAuthentication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ashutosh.JWTAuthentication.model.CumulativeResult;
import com.Ashutosh.JWTAuthentication.model.Question;

@Repository
public interface CumulativeResultRepository extends JpaRepository<CumulativeResult, Integer>{
	CumulativeResult findByIdentity(Integer id);
}
