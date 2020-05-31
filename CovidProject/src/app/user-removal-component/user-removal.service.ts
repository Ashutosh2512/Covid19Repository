import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../shared/Login.service';
import { Subscription } from 'rxjs';
import { URLStore } from '../utility/UrlStore.model';

@Injectable({
    providedIn: 'root'
})
export class UserRemovalService implements OnDestroy{
    removeSubscription: Subscription;
    constructor(private http: HttpClient, private loginService :LoginService){

    }

    ngOnDestroy(){
        this.removeSubscription.unsubscribe();
    }

    removeUser(username: string){
        let jwt: string;
        this.loginService.authResponse.subscribe(data => {
            if(data){
                jwt = data._jwt ;
            }
        });
        const url = URLStore.url;
        this.removeSubscription = this.http.post(url+'/remove',{},{
            headers: new HttpHeaders()
            .append('username',username)
            .append('Authorization','Bearer '+jwt)
        }).subscribe(data => {
            console.log(data);
        },error => {
            console.log(error);
        });
    }
}