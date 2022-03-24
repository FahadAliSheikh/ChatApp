import { Injectable } from '@angular/core';

// import * as io from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private url = 'http://localhost:8080';
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  // private socket;    
  constructor(private http: HttpClient) {
   }
   // Socket Connections
   socket = io(environment.SOCKET_ENDPOINT);
  
   

  // send message to a specific user on socket
  public sendUserMessage(senderId:any, receiverId:any, text:any) {
    this.socket.emit('sendMessage', {senderId, receiverId, text});
  }

//  get message for specifit user from socket
  public getUserMessage = () => {
    return Observable.create((observer:any) => {
        this.socket.on('getMessage', ({senderId, text}) => {
            observer.next({senderId, text});
        });
    });
  }


// Send newly connected user to socket
public addOnlineUser = (user:Object) =>{
  this.socket.emit('addOnlineUsers', user);
  }

// Get newly connected users from socket
public getOnlineUser = ()=>{
  return Observable.create((observer:any) => {
      this.socket.on('getOnlineUsers', (connectedUsers)=>{
          observer.next(connectedUsers);
      });
    });    
  }

  // Save messages to database
  sendMessageToDb(senderId:string, receiverId:string, text:string):Observable<any>{

    return this.http.post(environment.API_ENDPOINT + 'message', {
      senderId,
      receiverId,
      text
    }, httpOptions);
  }

// Get conversations from database
getOldConversation(senderId:string, receiverId: string ): Observable<any> {
  return this.http.get(environment.API_ENDPOINT + 'message/'+ senderId +'/'+receiverId)
  .pipe(map((body: any) => body));

}
// Get disconnected user from socket
getOffLineUser = ():any => {
  return  Observable.create((observer:any) => {
    this.socket.on('getOffLineUser', (offLineUser)=>{
        observer.next(offLineUser);
    });
  });
}

}
