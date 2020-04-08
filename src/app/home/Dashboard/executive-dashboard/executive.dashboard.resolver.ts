import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { httpService } from 'services/httpService';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class DashboardResolver implements Resolve<any> {
    constructor(private httpService: httpService) { }
    chartData: any;
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        
            return forkJoin([
                this.httpService.httpGet("getAssociatesDetails"),
                this.httpService.httpGet("getAccountGrowth"),
                this.httpService.httpGet("getFinanceDetails"),
                this.httpService.httpGet("getAccountSpending")
            ])
        
    };
}