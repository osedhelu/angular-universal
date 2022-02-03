import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
declare const window: any;
const { ethereum } = window;
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private router: Router
    ) {
    }
    canActivate(): boolean {


        if (this._auth.loggedIn()) {
            return true
        }
        else {
            this.router.navigate(['/packages'])
            return true;
        }
    }
}