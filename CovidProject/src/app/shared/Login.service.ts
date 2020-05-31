import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from './AuthenticationRequest.model';
import { AuthenticationResponse } from './AuthenticationResponse.model';
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { URLStore } from '../utility/UrlStore.model';

interface AuthResponseData{
    jwt: string,
    role: string
}

@Injectable({providedIn: 'root'})
export class LoginService{
    username = null;

    authResponse = new BehaviorSubject<AuthenticationResponse>(null);

    constructor(private http: HttpClient){

    }

    login(authrequest: AuthenticationRequest){
        const url = URLStore.url;
        return this.http.post<AuthResponseData>(url+'/authenticate',authrequest).pipe(
            catchError(error => {
                let errormessage = 'some error occurred!';
                if(!error.error || !error.error.message){
                    return errormessage;
                }
                errormessage = error.error.message;
                return throwError(errormessage);
            }),tap<AuthResponseData>(responsedata => {
                this.username = authrequest.userName;
                const expirationdate = new Date(+new Date().getTime + 1000*60*60*10);
                const authenticationresponse = new AuthenticationResponse(responsedata.jwt , responsedata.role, expirationdate);
                this.authResponse.next(authenticationresponse);
            }));
    }
    logout(){
        this.authResponse.next(null);
    }
}