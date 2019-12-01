import { Injectable } from '@angular/core';
import { RequestServiceService } from './request-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private request: RequestServiceService) { }
  updateUser(userData = {}) {
    return this.request.putData("user", { user: userData });
  }
  getProfile(username) {
    return this.request.getData("profiles/" + username);
  }
  followUser(username) {
    return this.request.postData(`profiles/${username}/follow`)
  }
  unfollowUser(username) {
    return this.request.deleteData(`profiles/${username}/follow`)
  }


}


