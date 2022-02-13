import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
export class iAgent {
  ID: number;
  Name: string;
  Phone: string;
  Picture: string;
}

export class iPackage {
  ID: number;
  Favorite: boolean;
  name: string;
  utility: any
  receives: number;
  status: boolean;
  Price: number;
  img: string;
  Features: string
  timestamp: number;
  user: string
  dias: Date
  commission: number
  delivered: number
  _id?: string
}


@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  iso2: string = '';
  constructor(private http: HttpClient) { }

  get() {
    let url = `${URL}/package`;
    return this.http.post(url, { token: localStorage.getItem('token') });
  }
  emitCajaComprada(data) {
    let url = `${URL}/package`;
    return this.http.post(url, data).toPromise()
  }
  getUserPack(id): Promise<any> {
    let url = `${URL}/package/${id}`;
    return this.http.get(url).toPromise()

  }
  getPackagaFo() {
    let url = `${URL}/package/meses`;
    return this.http.post(url, null)
  }

}
