package com.Ashutosh.JWTAuthentication.Service;

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ashutosh.JWTAuthentication.Repository.QuestionRepository;
import com.Ashutosh.JWTAuthentication.model.Question;

@Service
public class QuestionService {
	@Autowired
	private QuestionRepository qr;
	
	public void addQuestion(Question q) {
		if(qr.findByQuestion(q.getQuestion())!=null) {
			return;
		}
		qr.save(q);
	}
	public List<Question> getAllQuestions(){
		return qr.findAll();
	}
	public void deleteQuestion(String question) {
		if(qr.findByQuestion(question)==null) {
			return;
		}
		qr.deleteById(question);
	}

}
