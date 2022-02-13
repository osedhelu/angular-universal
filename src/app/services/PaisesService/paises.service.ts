import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
export interface iCountries {
  name: string
  nombre: string
  iso2: string
  iso3: string
  phone_code: string
}
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

