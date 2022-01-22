import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }
    ethToken() {
        let url = `${URL}/auth/eth`;
        return this.http.post(url, { token: localStorage.getItem('eth-token') }).pipe(catchError((err) => throwError(err)));
    }
    loggedIn() {
        return !!localStorage.getItem('token')
    }
    deleteSeccion(address): Promise<any> {
        let url = `${URL}/auth/deleteSeccion`;
        return this.http.post(url, { from: address }).toPromise();
    }
    validateToken(): Promise<any> {
        let url = `${URL}/auth/profile`;
        return this.http.get(url).toPromise();


    }

}
