import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
import { iCountries } from '@services/PaisesService/paises.service';
const { URL } = environment;
export interface iUser {
  MyID: string
  PadreID: string
  apellidos: string
  celular: string
  country: iCountries
  email: string
  estado: boolean
  nombre: string
  patrocinador: iUser
  role: string
  username: string
  _id: string
}
@Injectable({
  providedIn: 'root',
})
// iUser
export class UsersService {
  constructor(private http: HttpClient) { }
  getInfoUser(id?: any): Promise<any> {
    let url = `${URL}/user/query/${id}`;
    return this.http.get(url).pipe(
      catchError((resp) => throwError(resp)),
      map((resp: any) => {
        return resp.data;
      })
    ).toPromise();
  }
  add(data: any) {
    let url = `${URL}/user`;
    return this.http.post(url, data);
  }
  miRama() {
    let url = `${URL}/user/rama`;
    return this.http.get(url);
  }

  getAllUser() {
    let url = `${URL}/user`;
    return this.http.get(url);
  }
  Edit(data, id) {
    let url = `${URL}/user/${id}`;
    return this.http.put(url, data);
  }
}
