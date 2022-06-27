import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;
  img:string;
  constructor(public auth: AuthService) {
    this.auth.isLoggedBoolean ? this.auth.getCurrentPage.subscribe(data => {
      if (data) {
        this.auth.next(data.user);
      }
    }) : "";
  }

  ngOnInit() {
      this.auth.newCurrentUser.subscribe(data=>{
        this.username=data['username'];
        this.img=data['image'];
      })


  }

  logout() {
    this.auth.logout();
  }


}
