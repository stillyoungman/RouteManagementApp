import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(private app: ApplicationService, private authService: AuthService) { }

  ngOnInit() {
  }

  cancel(){
    this.app.back();
  }

  login(){
    this.authService.authenticate({email:this.email, password: this.password});
  }

}
