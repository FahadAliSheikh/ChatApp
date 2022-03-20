import { Injectable } from '@angular/core';

// import * as io from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private url = 'http://localhost:8080';
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  // private socket;    
  constructor() {
    // this.socket = io(this.url);
   }
   socket = io('http://localhost:8800');
   public sendMessage(message:any) {
     console.log('inside chat service');
     console.log(message);

    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

}
