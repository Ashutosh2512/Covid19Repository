import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question/question.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {
  resultSubscription: Subscription;
  result = false;
  totalcases = 0;
  positivecases = 0;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.resultSubscription = this.questionService.covidresult.subscribe(data => {
      if(data){
        this.result = data.ispositive;
        this.totalcases = data.totalcases;
        this.positivecases = data.positivecases;
      }
    });
  }

  ngOnDestroy(){
    this.resultSubscription.unsubscribe();
  }

}
