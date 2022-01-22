import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
declare const window: any;
const { ethereum } = window;
@Injectable({
    providedIn: 'root'
})
export class MetamaskGuard implements CanActivate {
    constructor(
        private router: Router
    ) {
    }
    canActivate(): boolean {
        return this.isMetamask()
    }
    isMetamask() {
        if (ethereum) {
            return true
        } else {
            this.router.navigate(['404'])
            return false
        }
    }
}