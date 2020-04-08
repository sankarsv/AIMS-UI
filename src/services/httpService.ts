import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/Roles/user';
import { Observable } from 'rxjs';
import { Role } from 'app/Roles/roles';

@Injectable()
export class httpService {
    constructor(private httpClient: HttpClient) {
    }

    httpGet(url: string):Promise<void|Object> {
        let token = localStorage.getItem("access_token");
        return this.httpClient.get("/aims/"+url, {
            headers: {Authorisation: "Token " +token},
            responseType: 'text'
        
        }).toPromise().then(
                (result:any) => {
                       return result;
                },
                err => {
                    if(err.message="JWT Token is incorrect") {
                        return [];
                    }
                  
                });
    }

}