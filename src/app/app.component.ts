import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mock-Project';
  username: string = '';
  img: string = '';

  constructor(public auth: AuthService) {
    // this.auth.getCurrentUser().subscribe(data => {
    //   if (data) {
    //     this.auth.getChangeCurrenUser.next(data.user)
    //   }

    // })
    this.auth.getCurrentUser().subscribe(data => {
      if (data) {
        this.auth.newCurrentUser.next(data.user)
      }

    })
  }

  ngOnInit() {
      this.auth.newCurrentUser.subscribe(data=>{
        this.username=data['username'];
        this.img=data['image'];
      })
    // this.auth.getChangeCurrenUser.subscribe(data => {
    //   this.username = data.username;
    // this.img = data.image;
    // });

  }

  logout() {
    this.auth.logout();
  }

}
