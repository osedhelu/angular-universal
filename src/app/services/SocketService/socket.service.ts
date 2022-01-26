import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.hmr';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { Observable } from 'rxjs';
import io, { Socket } from 'socket.io-client';
const { URL, URL_SOCKET } = environment;

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  constructor(private _alert: AlertService, private router: Router) {
    console.log('.........................',URL_SOCKET)
    if (!!localStorage.getItem('token')) {
      this.socket = io(URL_SOCKET, {
        withCredentials: true,
        extraHeaders: {
          'x-token': localStorage.getItem('token'),
          'x-meta': localStorage.getItem('address')
        },
      })
      this.socket.on('error', (e) => {
        console.log('/////////////////////////', e)
        if (!e.ok) {
          this._alert.show(from.bottom, aling.right, status.error, 'actualiza la seccion')
          localStorage.removeItem('token')
          localStorage.removeItem('eth-token')
          localStorage.removeItem('user-eth')
          this.router.navigate(['/packages'])
          this.disconnect()
        }
      })
    }
  }

  initConecion() {
    this.socket = io(URL_SOCKET, {
      withCredentials: true,
      extraHeaders: {
        'x-token': localStorage.getItem('token'),
        'x-meta': localStorage.getItem('address')
      },
    });
  }
  // EMITTER
  emit(event: string, msg: string) {
    this.socket.emit(event, ...msg);
  }

  // HANDLER
  on(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, msg => {
        observer.next(msg);
      });
    });
  }
  disconnect() {
    this.socket.disconnect()
    this.socket.disconnected
  }

}