import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApplicationService } from '../services/application.service';

@Injectable()
export class ToIndex implements CanActivate {
    
    constructor(private app: ApplicationService){

    }
    
    canActivate(){
        this.app.redirectTo("/");
        return true;
    }
}
