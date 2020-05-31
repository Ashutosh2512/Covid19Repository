import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationRequest } from '../shared/AuthenticationRequest.model';
import { LoginService } from '../shared/Login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  error = null;
  loginform: FormGroup;
  username = null;
  loginSubscription: Subscription;

  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(){
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }

  login(){
    const authrequest: AuthenticationRequest =  new AuthenticationRequest(this.loginform.get('username').value,
    this.loginform.get('password').value);
    this .loginSubscription = this.loginService.login(authrequest).subscribe(data => {
      this.username = this.loginform.get('username').value;
      this.router.navigateByUrl("/questions");
    }, error => {
      this.error = error;
    });
    this.loginform.reset();
  }

}
