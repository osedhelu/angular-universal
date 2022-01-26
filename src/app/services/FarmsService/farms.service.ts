import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
  providedIn: 'root',
})
export class FarmsService {
  path: string = `${URL}/nft`
  constructor(private http: HttpClient) { }

  getNFT(): Observable<any> {
    const url = `${URL}/nft`;
    return this.http.get(url)
  }
  getDailys() {
    const url = '';
    return this.http.get(url).toPromise()
  }
  getVentasToPackage(id): Promise<any> {
    const url = `${URL}/nft/package/${id}`;
    return this.http.get(url).toPromise()
  }
}

