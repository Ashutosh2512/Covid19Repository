package com.Ashutosh.JWTAuthentication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ashutosh.JWTAuthentication.Repository.CumulativeResultRepository;
import com.Ashutosh.JWTAuthentication.model.CumulativeResult;

@Service
public class CumulativeResultService {
	@Autowired
	private CumulativeResultRepository crr;
	
	public void increasetotalchecks() {
		if(this.crr.findByIdentity(1)==null) {
			CumulativeResult cumulativeresult=new CumulativeResult();
			cumulativeresult.setId(1);
			cumulativeresult.setPositiveChecks(0);
			cumulativeresult.setTotalChecks(1);
			crr.save(cumulativeresult);
		}else {
			CumulativeResult cumulativeresult=this.crr.findByIdentity(1);
			cumulativeresult.setTotalChecks(cumulativeresult.getTotalChecks()+1);
			crr.save(cumulativeresult);
		}
	}
	public void increasepositivechecks() {
		CumulativeResult cumulativeresult=this.crr.findByIdentity(1);
		cumulativeresult.setPositiveChecks(cumulativeresult.getPositiveChecks()+1);
		crr.save(cumulativeresult);
	}
	public CumulativeResult getCumulativeResult() {
		return this.crr.findByIdentity(1);
	}

}
