import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/Roles/user';
import { Observable } from 'rxjs';
import { Role } from 'app/Roles/roles';

@Injectable()
export class httpService {
    constructor(private httpClient: HttpClient) {
    }

    httpGet(url: string): Promise<void | Object> {
        let token = localStorage.getItem("access_token");
        return this.httpClient.get("/aims/" + url).toPromise().then(
            (result: any) => {
                return result;
            },
            err => {
                if (err.message = "JWT Token is incorrect") {
                    return [];
            }

        });
    }

    httpPost(url: string, body: any): Promise<User> {
        let token = localStorage.getItem("access_token");
        return this.httpClient.post("/aims/user" + url, body,
            {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
                responseType: 'text'

            }).toPromise().then((result: any) => {
                return result;
            }).catch(err => { alert(err.message); return null; })

    }

    exportBaseline(url: string, body: any) {
        let token = localStorage.getItem("access_token");
        return this.httpClient.post("/aims/user/" + url, body,
        {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
            responseType: 'blob'

        }).toPromise().then((result: any) => {
            return result;
        }).catch(err => { alert(err.message); return null; })

    }

}

