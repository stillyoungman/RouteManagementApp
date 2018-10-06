import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApplicationService } from '../services/application.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private auth: AuthService, private app: ApplicationService) { }

    canActivate() {
        console.log('isAuthenticated', this.auth.isAuthenticated);

        if (this.auth.isAuthenticated) {
            return true;
        }
        else {
            this.app.router.navigateByUrl('/login');
            return false;
        }
    }
}