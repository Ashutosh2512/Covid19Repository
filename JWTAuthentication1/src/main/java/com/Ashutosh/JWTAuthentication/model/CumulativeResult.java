package com.Ashutosh.JWTAuthentication.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CumulativeResult {
	
	@Id
	private Integer identity;
	
	private Integer totalChecks;
	
	private Integer positiveChecks;
	
	
	public Integer getIdentity() {
		return identity;
	}
	public void setId(Integer identity) {
		this.identity = identity;
	}
	public Integer getTotalChecks() {
		return totalChecks;
	}
	public void setTotalChecks(Integer totalChecks) {
		this.totalChecks = totalChecks;
	}
	public Integer getPositiveChecks() {
		return positiveChecks;
	}
	public void setPositiveChecks(Integer positiveChecks) {
		this.positiveChecks = positiveChecks;
	}
	
	
	

}
