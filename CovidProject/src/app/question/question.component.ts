import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { QuestionService } from './question.service';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit,OnDestroy {

  constructor(private questionService: QuestionService,private router: Router) { }
  QuestionForm: FormGroup;
  Questions: string[] = [];
  weights: number[] = [];
  totalScore = 0;
  getQuestionsSubscription: Subscription;
  sendScoreSubscription: Subscription;

  ngOnInit(): void {
    this.QuestionForm = new FormGroup({
      'answers': new FormArray([])
    });

    this.getQuestionsSubscription = this.questionService.getQuestions().subscribe(data => {
     for(let q of data.questions){
      this.Questions.push(q.question);
      this.weights.push(q.weight);
      this.totalScore = this.totalScore + +q.weight;
      (<FormArray>this.QuestionForm.get('answers')).push(new FormControl(null));
     }
    },error => {
      console.log(error);
    });
  }
  ngOnDestroy(){
    if(this.sendScoreSubscription){
      this.sendScoreSubscription.unsubscribe();
    }
    if(this.getQuestionsSubscription){
      this.getQuestionsSubscription.unsubscribe();
    }
  }

  onSubmit(){
    const control = (<FormArray>this.QuestionForm.get('answers')).controls;
    length = control.length;
    let score = 0;
    let i = 0;
    for(let c of control){
      if(c.value === 'yes'){
        score = score + +this.weights[i];
      }
      i++;
    }
    this.questionService.sendUserScore(score, this.totalScore);
    this.router.navigateByUrl('/result');
  }
}
