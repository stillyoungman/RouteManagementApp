import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  name;
  email;
  password;

  constructor(private app:ApplicationService, private authService: AuthService) { }

  ngOnInit() {
  }

  cancel(){
    this.app.back();
  }

  submit(){
    this.authService.register({name: this.name, email: this.email, password: this.password})
  }

}
