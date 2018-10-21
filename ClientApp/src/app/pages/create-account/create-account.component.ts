import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  name;
  email;
  password;
  message;
  registerForm:FormGroup;
  passConfirm = {
    pass:'',
    conf:'',
    isValid: function(){
      return this.pass === this.conf;
    }
  }
  loading;

  constructor(private app:ApplicationService, 
    public authService: AuthService) {

     }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      pass: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  cancel(){
    this.app.back();
  }

  submit(){
    // this.errorMessage = undefined;
    this.loading = true;
    if(this.isValid){
      this.authService.register({
        name: this.registerForm.controls.name.value, 
        email: this.registerForm.controls.email.value, 
        password: this.registerForm.controls.pass.value})
    }
    
  }

  get errorMessage(){
    return this.authService.errorMessage || 
      (this.registerForm.controls.name.touched && 
        this.registerForm.controls.name.invalid && 
        "Name is required...") || 
      (this.registerForm.controls.email.touched &&
        this.registerForm.controls.email.errors &&
        this.registerForm.controls.email.errors.required && 
        "Email is required...") || 
      (this.registerForm.controls.email.touched &&
        this.registerForm.controls.email.errors && 
        this.registerForm.controls.email.errors.email && 
        "Incorrect email...") || 
      (this.registerForm.controls.pass.touched &&
        this.registerForm.controls.pass.errors &&
        this.registerForm.controls.pass.errors.required &&
        "Password is required...") ||
      (this.registerForm.controls.pass.touched &&
        this.registerForm.controls.pass.errors &&
        this.registerForm.controls.pass.errors.minlength && 
        (this.registerForm.controls.pass.errors.minlength.actualLength < this.registerForm.controls.pass.errors.minlength.requiredLength) &&
        `This password is too short. It must contain at least ${this.registerForm.controls.pass.errors.minlength.requiredLength} characters.`) || 
      (this.registerForm.controls.pass.touched && 
        !this.passConfirm.isValid() && 
        "Password doesn't match...")
  }

  confirmPassword(p,c){
    if (p){
      this.passConfirm.pass = p;
    }
    else {
      this.passConfirm.conf = c;
    }
    
  }

  get isValid(){
    return this.registerForm.valid && this.passConfirm.isValid();
  }

}
