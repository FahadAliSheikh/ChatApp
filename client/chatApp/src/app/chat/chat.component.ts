import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'app works!';
  usersList: any = [];
  origionalUserList : any = [];
  public searchStr: string = "";
  public loggedInUser: any;
  public oldMessagesList = []
  public senderId : string = '';
  public receiverId : string = '';
  public onlineUser : any;
  public selectedUser: any;
  
  newMessage: string = '';
  messages: string[] = [];

  messageList: any = [];
  channelList: string[] = [];
  channel : string = '';
  username: string = 'fahad';
  public connectedUsers: any = [];

  constructor(private chatService: ChatService,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService) { }


        ngOnInit(){
          this.getUser()
          this.getOnlineUser();
          this.getUserMessage();
          this.getOffLineUser();
          this.loggedInUser = this.tokenStorageService.getUser().data.user;
        }

  // Search users from search bar
  public modelChange(str: string): void {
    this.searchStr = str;
    // Add code for searching here
    this.usersList = this.usersList.filter((singleUser: any) => singleUser.username.includes(this.searchStr));
    if(this.searchStr.length<1){
      this.usersList = this.origionalUserList;
    }
  }

  // Get all users from database
   async getUser(){
     this.authService.getUsers().subscribe(async(resp)=>{
          this.usersList = resp.data.users;
          this.usersList  = await this.usersList.filter((el:any) => { return el._id != this.loggedInUser._id; }); 
    })
  }

  // Get old conversation of users
 async getOldConversation (user:any){
  this.selectedUser = user;

  this.senderId = this.loggedInUser._id;
  this.receiverId = user._id;
   await this.chatService.getOldConversation(this.senderId, this.receiverId).subscribe({
      next: data => {
                this.messageList = data.data.messageData;
      },
      error: err => {
      }
    });
  }



  // Send user input message to socket server and database
  sendMessage() {
    let payload = {
      senderId: this.senderId,
     receiverId: this.receiverId,
     text: this.newMessage
    }
    this.chatService.sendUserMessage(this.senderId, this.receiverId, this.newMessage)
    this.chatService.sendMessageToDb(this.senderId, this.receiverId, this.newMessage)
    .subscribe((messages) => {})
       this.messageList.push(payload);
    this.newMessage = '';
  }

  // Get new message from socket server
  getUserMessage(){
    this.chatService.getUserMessage().subscribe((message:any) => {
      this.messageList.push(message);
    })
  }
  // Get all newly connected users
  getOnlineUser(){
   return this.chatService.getOnlineUser()
   .subscribe((onlineUsers: any) => {

      onlineUsers.forEach((element:any) => {
        this.usersList = this.usersList.map((obj: any )=> {
        if (obj._id === element._id) {
          return{ ...obj, socketId: element.socketId }
        }
        return obj;
      }); 
    }); 
    this.origionalUserList = this.usersList;
    })
  } 

  // Get disconnected user from socket and set it as offline
  getOffLineUser(): any{
    this.chatService.getOffLineUser().subscribe((offLineUser:any)=>{
        console.log(offLineUser);
      if(offLineUser){
      this.usersList = this.usersList.map((obj: any )=> {
        if (obj._id === offLineUser._id) {
          return{ ...obj, socketId: undefined }
        }
        return obj;
      }); 
    }
    })
  }
}
