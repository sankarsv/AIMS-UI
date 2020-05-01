/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.css'],

})
export class ExecutiveDashboardComponent implements OnInit {

  constructor() { };

  ngOnInit() {
  }

}

*/

import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import * as Chart from 'chart.js';
import { progressbar } from '../../../Roles/constants';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { forkJoin } from 'rxjs';
import { httpService } from '../../../../services/httpService';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { element } from '@angular/core/src/render3/instructions';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.css'],

})

export class ExecutiveDashboardComponent implements OnInit {
  getAssociatesDetails: any;
  getAccountGowth: any[];
  getFinanceDetails: any[];
  getAccountSpending: any[]
  attrition: string[];
  expansion: string[];
  financeMonitoring: any;
  ctxfinanceMonitoring: any;
  accountMonthlyGrow: any;
  ctxaccountMonthlyGrow: any;
  accountSpending: any;
  ctxaccountSpending: any;
  ltsReq: number;
  clientReq: number;
  associatesDetails: any;
  financeMonitoringData: any;
  accountMonthlyGrowData:any;
  accountSpendingData:any;
  @ViewChild('fileInput') fileInput:ElementRef;
  constructor(public httpService: httpService, public router: Router, public activatedRoute: ActivatedRoute,private renderer:Renderer,
    private http:HttpClient) {
    this.activatedRoute.data.map(data=>data.chartData.JSON()).subscribe((res)=>{
console.log(res);
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  ngOnInit() {
    this.getAssociatesDetails = [];
    this.activatedRoute.data.subscribe(chartData=>
      this.getAssociatesDetails=chartData
    );
    
    this.initializeView();
  }
    // this.http
    //       .get(APP_CONSTANTS.URL[environment.type].Dashboard)
    //       .toPromise()
    //       .then(
    //           (res:any) =>{
    //             this.getAssociatesDetails = res;
    //             this.initializeView();})};

initializeView()                          
{
    if (this.getAssociatesDetails[0] !=null && this.getAssociatesDetails[1] !=null&& this.getAssociatesDetails[2] !=null&& this.getAssociatesDetails[3] !=null) 
    {

      this.PrefillAssociateDetails(this.getAssociatesDetails[0]);
      this.accountSpendingData = JSON.parse(this.getAssociatesDetails[2]);
      this.accountMonthlyGrowData = JSON.parse(this.getAssociatesDetails[1]);
      this.financeMonitoringData = JSON.parse(this.getAssociatesDetails[3]);

      this.ltsReq = this.associatesDetails.Requirements.new;
      this.clientReq = this.associatesDetails.Requirements.expansions;
      this.attrition = [this.associatesDetails.Attritiontotal, this.associatesDetails.AttritionlastMonth];
      this.expansion = [this.associatesDetails.ExpansionsTotal, this.associatesDetails.ExpansionsLastMonth];

      this.financeMonitoring = document.getElementById('financeMonitoring');
      this.ctxfinanceMonitoring = this.financeMonitoring.getContext('2d');
      let financeMonitoring = new Chart(this.ctxfinanceMonitoring, {
        type: 'horizontalBar',
        data: {
          labels: this.financeMonitoringData[0]['labels'],
          datasets: [{
            label: this.financeMonitoringData[1]["datasets"]["label"],
            data: this.financeMonitoringData[1]["datasets"]["data"],
            backgroundColor: [
              '#B8E986',
              '#B8E986',
              '#B8E986',
              '#B8E986',
              '#B8E986',
              '#B8E986'

            ],
            borderWidth: 1
          },
          {
            label: this.financeMonitoringData[2]["datasets"]["label"],
            data: this.financeMonitoringData[2]["datasets"]["data"],
            backgroundColor: [
              '#7ED321',
              '#7ED321',
              '#7ED321',
              '#7ED321',
              '#7ED321',
              '#7ED321'
            ],
            borderWidth: 1
          }, {
            label: this.financeMonitoringData[3]["datasets"]["label"],
            data: this.financeMonitoringData[3]["datasets"]["data"],
            backgroundColor: [
              '#39579A',
              '#39579A',
              '#39579A',
              '#39579A',
              '#39579A',
              '#39579A'
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              // barThickness: 6,
              // maxBarThickness: 8,
              gridLines: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        },

      });

      this.accountMonthlyGrow = document.getElementById('accountMonthlyGrow');
      this.ctxaccountMonthlyGrow = this.accountMonthlyGrow.getContext('2d');
      let accountMonthlyGrow = new Chart(this.ctxaccountMonthlyGrow, {
        type: 'line',
        data: {
          labels: this.accountMonthlyGrowData[0]['labels'],
          datasets: [{
            label: this.accountMonthlyGrowData[1]["datasets"]["label"],
            data: this.accountMonthlyGrowData[1]["datasets"]["data"],
            backgroundColor: [
              '#42E0FC'
            ],
            borderWidth: 1
          }, {
            label: this.accountMonthlyGrowData[2]["datasets"]["label"],
            data: this.accountMonthlyGrowData[2]["datasets"]["data"],
            backgroundColor: [
              '#9013FE'
            ],

            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              stacked: true,
              gridLines: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        }
      });

      this.accountSpending = document.getElementById('accountSpending');
      this.ctxaccountSpending = this.accountSpending.getContext('2d');
      let accountSpending = new Chart(this.ctxaccountSpending, {
        type: 'bar',
        data: {
          labels: this.accountSpendingData[0]['labels'],
          datasets: [{
            label: this.accountSpendingData[1]["datasets"]["label"],
            data: this.accountSpendingData[1]["datasets"]["data"],
            backgroundColor: ['#FFCC41', '#FFCC41', '#FFCC41', '#FFCC41'],
            borderWidth: 1
          },
          {
            label:this.accountSpendingData[2]["datasets"]["label"],
            data: this.accountSpendingData[2]["datasets"]["data"],
            backgroundColor: ['#39475B', '#39475B', '#39475B', '#39475B'],
            borderWidth: 1
          },
          ]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                display: false
              }
            }],
            xAxes: [{
              // barThickness: 6,
              // maxBarThickness: 8,
              stacked: true,
              gridLines: {
                display: false
              }
            }]
          }
        }
      });


    }
    else {
      alert("Session Expired!");
      this.router.navigate(['/']);
    }
  }

  PrefillAssociateDetails(associateDetails:any)
  {
     this.associatesDetails = {
                                totalAssociates: associateDetails ["totalAssociates"],
                                monthlyActiveBillable: associateDetails["monthlyActiveBillable"],
                                activeAccessTokens: associateDetails["activeAccessTokens"],
                                issuesOutstanding: associateDetails["issuesOutstanding"],
                                ExpansionsTotal: associateDetails["Expansions"]["total"],
                                ExpansionsLastMonth:associateDetails["Expansions"]["lastMonth"],
                                Attritiontotal: associateDetails["Attrition"]["total"],
                                AttritionlastMonth:associateDetails["Attrition"]["lastMonth"],
                             };
   }
  
}


