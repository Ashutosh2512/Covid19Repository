import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRemovalService } from './user-removal.service';

@Component({
  selector: 'app-user-removal-component',
  templateUrl: './user-removal-component.component.html',
  styleUrls: ['./user-removal-component.component.css']
})
export class UserRemovalComponentComponent implements OnInit {

  clientremovalform: FormGroup;

  constructor(private userremovalService: UserRemovalService) { }

  ngOnInit(): void {
    this.clientremovalform = new FormGroup({
      'username': new FormControl(null, Validators.required)
    });
  }
  onRemove(){
    this.userremovalService.removeUser(this.clientremovalform.get('username').value);
    console.log(this.clientremovalform.get('username').value);
  }

}
