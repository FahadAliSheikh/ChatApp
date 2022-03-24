import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { ChatService } from './_services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatApp';
  onlineUser?: object;
  isLoggedIn = false;
  username?: string;
  userId? : string;
  constructor(private tokenStorageService: TokenStorageService,
              private chatService: ChatService
              ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.data.user.username;
      this.userId = user.data.user._id;
      this.addOnlineUser(user.data.user);
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  addOnlineUser(onlineUser:Object): void{
    this.chatService.addOnlineUser(onlineUser);
  }
  
}
