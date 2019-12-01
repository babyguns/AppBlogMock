import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ResultUser } from 'src/app/interfaces/config-type';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  formSetting: FormGroup;
  image: string = '';
  name: string = '';
  bio: string = '';
  email: string = '';
  password: string = '';
  listErrors = [];
  constructor(fb: FormBuilder, private auth: AuthService, private user: UserService) {
    auth.getCurrentUser().subscribe(user => {
      this.image = user.user.image;
      this.name = user.user.username;
      this.bio = user.user.bio;
      this.email = user.user.email;
      this.password = user.password
      this.formSetting.setValue({
        image: this.image,
        username: this.name,
        bio: this.bio,
        email: this.email,
        password: ''
      })
    })

    this.formSetting = fb.group({
      email: ['', Validators.required],
      bio: [''],
      image: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],

    })


  }

  ngOnInit() {

  }
  handleSetting() {
    this.user.updateUser(this.formSetting.value).subscribe(
      (data: ResultUser) => {
        this.auth.next(data.user);
        localStorage.setItem('username', data.user.username)
        this.auth.navigateTohome()
      }
      , err => {
        this.listErrors = this.auth.showErrors(err);
        console.log(this.listErrors)

      })
  }
  logout() {
    this.auth.logout();
  }

}
