package com.Ashutosh.JWTAuthentication.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.Ashutosh.JWTAuthentication.Service.QuestionService;
import com.Ashutosh.JWTAuthentication.model.Question;
import com.Ashutosh.JWTAuthentication.model.Questions;

@RestController
public class QuestionController {
	
	@Autowired
	private QuestionService qs;
	
	@GetMapping(value="/getquestions")
	public ResponseEntity<?> getAllQuestions() {
		Questions quns = new Questions();
		quns.questions.addAll(this.qs.getAllQuestions());
		quns.length = quns.questions.size();
		return ResponseEntity.ok(quns);
	}
	
	@PostMapping(value="/addquestion")
	public ResponseEntity<?> addQuestion(@RequestBody Question question) {
		if(question == null){
			return (ResponseEntity<?>) ResponseEntity.noContent();
		}
		this.qs.addQuestion(question);
		return ResponseEntity.ok("Added");
	}
	
	@DeleteMapping(value="/deletequestion")
	public ResponseEntity<?> deleteQuestion(@RequestHeader("question") String questionName) {
		this.qs.deleteQuestion(questionName);
		return ResponseEntity.ok("Deleted");
	}

}