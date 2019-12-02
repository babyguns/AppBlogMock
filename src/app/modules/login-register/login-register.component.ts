import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  LoginTab: boolean;
  formInput: FormGroup;
  listError = [];
  constructor(private auth: AuthService, private route: ActivatedRoute, public fb: FormBuilder) {

    this.LoginTab = (this.route.url['value'][0].path == 'login');
    this.formInput = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]

    })
    if (this.LoginTab) {
      this.formInput.removeControl('username')
    }
  }


  ngOnInit() {

  }
  handleSubmit() {
    if (this.LoginTab) {
      this.auth.login(this.formInput.value).subscribe(data => {
        this.auth.handleAfterSuccess(data.user);
      }, (err) => { this.listError = this.auth.showErrors(err) }
      )
    }
    if (!this.LoginTab) {
      this.auth.register(this.formInput.value).subscribe(data => {
        this.auth.handleAfterSuccess(data.user);
      }, err => { this.listError = this.auth.showErrors(err) })
    }
  }
}
