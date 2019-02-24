import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SocketService } from './socket.service';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Subject<any>;

  constructor(private _http: HttpClient, private _socket: SocketService) {
    this.messages = <Subject<any>>_socket.connect().pipe(
      map(
        (response: any): any => {
          return response;
        }
      )
    );
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  writeMessage(data): Observable<any> {
    return this._http.post(`${baseUrl}/chat/writeMessage.php`, data);
  }

  getMessages(data): Observable<any> {
    return this._http.post(`${baseUrl}/chat/getMessages.php`, data);
  }

  getUsers(id): Observable<any> {
    return this._http.get(`${baseUrl}/chat/getUsers.php?id=${id}`);
  }
}
