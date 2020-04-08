import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/Roles/user';
import { Role } from 'app/Roles/roles';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class JwtService {
  constructor(private httpClient: HttpClient) { }
  login(user: User) :Promise<User>{
    return this.httpClient.post('/login', user,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'

      }).toPromise().then((result: any) => {
        localStorage.setItem('access_token', result);
        user.token=result;
        let data=jwt_decode(result);
        console.log(data);
        
        user.token=result;
        user.role=data.role;
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