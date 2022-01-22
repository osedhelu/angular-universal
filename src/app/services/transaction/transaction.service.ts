import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    constructor(private http: HttpClient) { }
    save(data: any) {
        let url = `${URL}/transaccion`;
        return this.http.post(url, data)
    }
    toPayPackage(data) {
        const url = `${URL}/package/topay`
        return this.http.post(url, data)
    }
     getBalance(): Observable<any> {
        const url = `${URL}/accountant`
        return this.http.get(url)
    }
}
