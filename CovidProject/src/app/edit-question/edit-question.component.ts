import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../question/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  deleteQuestionform: FormGroup;
  addQuestionform: FormGroup;
  deleteSubscription: Subscription;
  addSubscription: Subscription;

  isDeleteMode = true;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.deleteQuestionform = new FormGroup({
      'question': new FormControl('', Validators.required)
    });
    this.addQuestionform = new FormGroup({
      'question': new FormControl('',Validators.required),
      'weight': new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(){
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe;
    }
    if(this.addSubscription){
      this.addSubscription.unsubscribe;
    }
  }

  onDelete(){
    const question = this.deleteQuestionform.get('question').value;
    this.deleteSubscription = this.questionService.deleteQuestion(question).subscribe(data => {
      console.log(data);
  },error => {
      console.log(error);
  });
  }
  onAdd(){
    const question = this.addQuestionform.get('question').value;
    const weight = this.addQuestionform.get('weight').value;
    this.addSubscription = this.questionService.addQuestion(question,weight).subscribe(data => {
      console.log(data);
  }, error => {
      console.log(error);
  });
  }

  onChangeMode(){
    if(this.isDeleteMode){
      this.isDeleteMode = false;
    }else{
      this.isDeleteMode = true;
    }
    console.log(this.isDeleteMode);
  }

}
