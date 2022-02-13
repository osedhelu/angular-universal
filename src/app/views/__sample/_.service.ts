
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
    providedIn: 'root',
})
export class __Service {
    constructor(private http: HttpClient) { }

}


