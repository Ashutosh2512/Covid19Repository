import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User.model';
import { catchError } from 'rxjs/operators';
import { URLStore } from '../utility/UrlStore.model';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService{
    constructor(private http: HttpClient){

    }

    register(user: User){
        const url = URLStore.url;
        return this.http.post(url+'/register',user);
        
    }

}