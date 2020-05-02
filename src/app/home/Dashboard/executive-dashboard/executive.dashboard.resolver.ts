import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { httpService } from 'services/httpService';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class DashboardResolver implements Resolve<any> {
    constructor(private httpService: httpService) { }
    resolve(route: ActivatedRouteSnapshot,rstate:RouterStateSnapshot): Observable<any> {
         this.httpService.httpGet("years.json").then(res=>
            {
                return res;
            });
return null;
    
    };
} 