
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private url: string = `${environment.URL}/token`
    constructor(private http: HttpClient) { }
    get() {
        return this.http.get(this.url)
    }

}


