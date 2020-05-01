import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { httpService } from 'services/httpService';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class DashboardResolver implements Resolve<any> {
    chartData:any
    constructor(private httpService: httpService) { }
    resolve(route: ActivatedRouteSnapshot,rstate:RouterStateSnapshot): Observable<any> {
        this.chartData =  
        forkJoin([
                this.httpService.httpGet("getAssociatesDetails.json"),
                this.httpService.httpGet("getAccountGrowth.json"),
                this.httpService.httpGet("getFinanceDetails.json"),
                this.httpService.httpGet("getAccountSpending.json")
            ])
            return this.chartData;
    };
} 