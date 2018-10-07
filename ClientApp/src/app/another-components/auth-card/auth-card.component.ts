import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent implements OnInit {

  name;

  constructor(private auth: AuthService, private app: ApplicationService) {
    
  }

  ngOnInit() {
    
  }

  ngDoCheck(){
    if (this.auth.isAuthenticated) {
      this.name = this.auth.claims.name;
    }
  }

  login() {
    this.app.redirectTo("/login");
  }

  logout() {
    this.auth.logout();
  }

  create() {
    this.app.redirectTo("/create-account")
  }


}
