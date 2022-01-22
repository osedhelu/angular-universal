import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  iso2: string = '';
  constructor(private http: HttpClient) { }

  get() {
    let url = `${URL}/country`;
    return this.http.get(url).pipe(catchError((err) => throwError(err)));
  }
}

