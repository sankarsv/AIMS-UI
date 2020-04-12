import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/Roles/user';
import * as jwt_decode from "jwt-decode";
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';

@Injectable()
export class JwtService {
  constructor(private httpClient: HttpClient) { }
  login(user: User) :Promise<User>{
    return this.httpClient.post(APP_CONSTANTS.URL[environment.type].LOGIN, user).toPromise().then((result: any) => {
        const token = result.token;
        localStorage.setItem('access_token', token);
        let data=jwt_decode(token);
        
        user.token = token;
        user.role = data.role;
        console.log(user.role);
        return user;
      }).catch(err => {alert(err.message); return user;}) 

  }
  logout():boolean{
    localStorage.removeItem('access_token');
    if(!localStorage.getItem('access_token'))
    return true;
    else return false;
  }
  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
}