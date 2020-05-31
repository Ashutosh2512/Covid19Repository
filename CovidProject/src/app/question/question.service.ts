import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../shared/Login.service';
import { LoginComponent } from '../login/login.component';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { isBuffer } from 'util';
import { URLStore } from '../utility/UrlStore.model';


export class Questions{
    questions: {question: string, weight: number}[] = [];
    length: number = 0;
}


export class DisplayResult{
    'totalcases': number;
    'positivecases': number;
    'ispositive': boolean;
    constructor(totalcases: number,positivecases: number, ispositive: boolean){
        this.ispositive = ispositive;
        this.positivecases = positivecases;
        this.totalcases = totalcases;
    }


}
@Injectable({
    providedIn: 'root'
})
export class QuestionService implements OnDestroy{
    covidresult = new BehaviorSubject<DisplayResult>(null);
    deleteSubscription: Subscription;
    addSubscription: Subscription;
    getSubscription: Subscription;
    sendSubscription: Subscription;

    constructor(private http: HttpClient,private loginService: LoginService, private router: Router){

    }

    ngOnDestroy(){
        if(this.deleteSubscription){
            this.deleteSubscription.unsubscribe();
        }
        if(this.getSubscription){
            this.getSubscription.unsubscribe();
        }
        if(this.sendSubscription){
            this.sendSubscription.unsubscribe();
        }
        if(this.addSubscription){
            this.addSubscription.unsubscribe();
        }
    }

    sendUserScore(score: number,totalscore: number){
        const username: string = this.loginService.username; 
        let authToken = 'Bearer ';
        this.sendSubscription = this.loginService.authResponse.subscribe(data => {
            if(data){
                authToken = authToken + data._jwt;
            }
        });
        let result = 2*score > totalscore;
        const url = URLStore.url;
        return this.http.post<{totalChecks: number,positiveChecks: number,identity: number}>(url+'/setScore',{
            'username': username,
            'score': score,
            'ispositive': result
        },{
           headers: new HttpHeaders().append('Authorization',authToken)
        }).toPromise().then(data => {
            const displayresult: DisplayResult = new DisplayResult(data.totalChecks, data.positiveChecks, result);
            this.covidresult.next(displayresult);
        });
        
        
    }
    getQuestions(){
        let authToken = 'Bearer ';
        this.getSubscription = this.loginService.authResponse.subscribe(data => {
            if(data){
                authToken = authToken + data._jwt;
            }
        });
        const url = URLStore.url;
        return this.http.get<Questions>(url+'/getquestions',{
            headers: new HttpHeaders().append('Authorization',authToken)
        });
    }
    addQuestion(qus: string, wt: number){
        let authToken = 'Bearer ';
        this.addSubscription = this.loginService.authResponse.subscribe(data => {
            if(data){
                authToken = authToken + data._jwt;
            }
        });
        const url = URLStore.url;
        return this.http.post(url+'/addquestion',{
            question: qus,
            weight: wt
        },{
            headers: new HttpHeaders().append('Authorization',authToken)
        });
    }
    deleteQuestion(qus: string){
        let authToken = 'Bearer ';
        this.deleteSubscription = this.loginService.authResponse.subscribe(data => {
            if(data){
                authToken = authToken + data._jwt;
            }
        });
        const url = URLStore.url;
        return this.http.delete(url+'/deletequestion',{
            headers: new HttpHeaders().append('Authorization',authToken)
            .append('question',qus)
        });
    }
}