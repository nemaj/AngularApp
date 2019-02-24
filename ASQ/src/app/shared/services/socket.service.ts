import { Injectable, NgZone } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() {}

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.socketUrl);

    const observable = new Observable(obs => {
      this.socket.on('message', data => {
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
