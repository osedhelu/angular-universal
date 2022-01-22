import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.hmr';
const { URL } = environment;
@Injectable({
  providedIn: 'root',
})
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
    console.log(data);
    let url = `${URL}/user`;
    return this.http.post(url, data);
  }
  miRama() {
    let url = `${URL}/user/rama`;
    return this.http.get(url);
  }

}
