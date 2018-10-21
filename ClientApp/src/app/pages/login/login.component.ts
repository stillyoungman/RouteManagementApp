import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  authForm:FormGroup;
  loading;

  constructor(private app: ApplicationService, 
    private authService: AuthService) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    }
    )
  }

  cancel(){
    this.app.back();
  }

  login(){
    this.loading = true;
    this.authService.authenticate({
      email:this.authForm.controls.email.value, 
      password: this.authForm.controls.password.value
    });
  }

  get errorMessage(){
    return this.authService.errorMessage || 
      (this.authForm.controls.email.touched &&
        this.authForm.controls.email.errors &&
        this.authForm.controls.email.errors.required && 
        "Email is required...") ||
      (this.authForm.controls.email.touched && 
        this.authForm.controls.email.errors &&
        this.authForm.controls.email.errors.email &&
        "Incorrect email...") || 
      (this.authForm.controls.password.touched && 
        this.authForm.controls.password.errors &&
        this.authForm.controls.password.errors.required && 
        "Password is required...")
  }

}
