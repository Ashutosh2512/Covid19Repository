import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/Login.service';
import { AuthenticationResponse } from '../shared/AuthenticationResponse.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isAuthenticated = false;
  responseSubscription: Subscription;

  constructor(private loginService: LoginService,private router: Router){

  }

  ngOnInit(): void {
    this.responseSubscription = this.loginService.authResponse.subscribe(data => {
      this.isAuthenticated = !!data;
      if(data === null){
        this.isAdmin = false;
      }
      else{
        this.isAdmin = (data._role === 'ROLE_ADMIN') ? true : false;
        console.log(this.isAdmin);
      }
    });
  }

  ngOnDestroy(){
    this.responseSubscription.unsubscribe();
  }

  onLogout(){
    this.loginService.logout();
    this.router.navigateByUrl("/home");
  }

}
