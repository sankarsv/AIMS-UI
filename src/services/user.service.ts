import { Injectable } from '@angular/core';
import { User } from 'app/Roles/user';
import { userInfo } from 'os';

@Injectable()
export class UserService {
  private user:User;
  constructor() { }
  putUser(user:User){
    this.user=user;
  }
  getUser():User{
    return this.user;
  }
}
