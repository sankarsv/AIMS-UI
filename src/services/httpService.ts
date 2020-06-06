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
        return this.httpClient.get(url).toPromise().then(
            (result: any) => {
                return result;
            },
            err => {
                if (err.message = "JWT Token is incorrect") {
                    return [];
            }

        });
    }

    httpPost(url: string, body: any): Promise< any > {
        let token = localStorage.getItem("access_token");
        return this.httpClient.post(url, body,
            {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
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

    downloadFile(url: string, body: any) {
        let token = localStorage.getItem("access_token");
        return this.httpClient.post("/aims/user/" + url, body,
        {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
            responseType: 'blob'

        }).toPromise().then((result: any) => {
            return result;
        }).catch(err => { alert(err.message); return null; })

    }

    PostDetails(url:string,body:any):Promise< any >{
        let token = localStorage.getItem("access_token");
        return this.httpClient.post("assets\\mock\\aims\\dashBoard\\"+url,body,
        {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        }).toPromise().then((result:any)=>{
            console.log(result);
            return result;
        }).catch(msg=>{alert(msg.message);
        return null;})
        }

}

