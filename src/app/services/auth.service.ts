import { Injectable } from '@angular/core';
import { RequestServiceService } from './request-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../interfaces/config-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getChangeCurrenUser: BehaviorSubject<any>;
  getCurrentPage: BehaviorSubject<any> = new BehaviorSubject('sad');
  public newCurrentUser = new Subject();
  user: User = {
    bio: '',
    following: false,
    image: '',
    token: '',
    username: ''
  };
  isLogged: boolean = false;
  constructor(private request: RequestServiceService, private router: Router) {
    this.getChangeCurrenUser = new BehaviorSubject('arguf');

    if (localStorage.getItem('token')) {
      this.isLogged = true;
      this.request.getToken();
    }
  }
  next(currentUser: User) {
    this.user = currentUser;
    this.newCurrentUser.next(this.user);
  }


  login(userData) {
    return this.request.postData("users/login", { user: userData });
  }
  register(userData) {
    return this.request.postData("users", { user: userData });
  }
  navigateTohome() {
    this.router.navigateByUrl('/');
  }
  handleAfterSuccess(data: User) {
    this.isLogged = true;
    localStorage.setItem('username', data.username);
    localStorage.setItem('token', data.token);
    this.request.getToken();
    this.next(data)
    this.router.navigateByUrl('/');

  }

  getCurrentUser() {
    if (this.isLogged == true) {

      return this.request.getData("user")
    }
    return of(undefined);
  }
  showErrors(err) {
    let listerros = [];
    let errors = err.error.errors;

    for (let key of Object.keys(errors)) {
      listerros.push(`${key} ${errors[key]}`)

    }
    return listerros;
  }
  logout() {
    localStorage.clear();
    this.isLogged = false;
    this.request.headers = new HttpHeaders();
    this.router.navigateByUrl('/');
  }
  checkLoginAndNavigate() {
    {
      if (!this.isLogged) { this.router.navigateByUrl('/login') };
    }
    return this.isLogged;
  }

}
