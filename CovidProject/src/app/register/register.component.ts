import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { User } from '../shared/User.model';
import { RegistrationService } from '../shared/Registration.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  error = null;
  signupform: FormGroup;
  genders: string[] = ['Male','Female'];

  registrationSubscription: Subscription;
  constructor(private rs: RegistrationService,private router: Router) { }

  ngOnInit(): void {
    this.error = null;
    this.signupform = new FormGroup({});
    this.signupform.addControl('firstname',new FormControl(null,Validators.required));
    this.signupform.addControl('lastname',new FormControl(null,Validators.required));
    this.signupform.addControl('username', new FormControl(null,Validators.required));
    this.signupform.addControl('password', new FormControl('',[Validators.required,Validators.minLength(8)]));
    this.signupform.addControl('emailId', new FormControl(null,[Validators.required,Validators.email]));
    this.signupform.addControl('gender', new FormControl(null,Validators.required));
    this.signupform.addControl('nationalId', new FormControl(null,Validators.required));
    this.signupform.addControl('address', new FormControl(null,Validators.required));
    this.signupform.addControl('repassword', new FormControl('',
    [Validators.compose(
      [Validators.required, this.validateAreEqual.bind(this)]
  )]));
      this.signupform.addControl('age', new FormControl(null,[Validators.required,Validators.max(150)]));
  }

  ngOnDestroy(){
    if(this.registrationSubscription){
      this.registrationSubscription.unsubscribe();
    }
  }

  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.signupform.get('password').value ? null : {
        NotEqual: true
    };
  }
  onRegister(){
    const user = new User(this.signupform.get('firstname').value+' '+this.signupform.get('lastname').value,
    this.signupform.get('password').value,
    this.signupform.get('username').value,
    this.signupform.get('emailId').value,
    this.signupform.get('nationalId').value,
    this.signupform.get('gender').value,
    this.signupform.get('age').value,
    this.signupform.get('address').value,
    0, 'ROLE_USER');

    this.registrationSubscription = this.rs.register(user).subscribe(data => {
      console.log(data);
    },error => {
      if(error.status !== 200){
        let errormessage = 'Some error occuerred!';
        console.log(error);
        if(!error.error || !error.error.message){
        this.error = errormessage;
      }
      else{
        this.error = error.error.message;
      }
      }
    });
    this.signupform.reset();
    this.router.navigateByUrl('/login');
  }


}
