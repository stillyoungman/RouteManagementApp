import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'route-management-app';

  constructor(private auth: AuthService){
  }
  
  ngDoCheck(){
    this.auth.isAuthenticated = !!localStorage.getItem('t');
  }
}