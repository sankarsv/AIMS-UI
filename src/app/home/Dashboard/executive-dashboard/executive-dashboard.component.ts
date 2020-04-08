import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import * as Chart from 'chart.js';
import { progressbar } from '../../../Roles/constants';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { forkJoin } from 'rxjs';
import { httpService } from '../../../../services/httpService';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.css'],

})

export class ExecutiveDashboardComponent implements OnInit {
  chartData: any[];
  getAssociatesDetails: string;
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
  totalAssociates: progressbar;
  monthyActiveBillable: progressbar;
  activeAccessTokens: progressbar;
  issuesOutstanding: progressbar;
  ltsReq: number;
  clientReq: number;
  associatesDetails: any;
  financeMonitoringData: any;
  accountMonthlyGrowData:any;
  accountSpendingData:any;
  @ViewChild('fileInput') fileInput:ElementRef;
  constructor(public httpService: httpService, public router: Router, public activatedRoute: ActivatedRoute,private renderer:Renderer) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }



  ngOnInit() {
    this.chartData = this.activatedRoute.snapshot.data.chartData;
    if (this.chartData[0].length > 0 && this.chartData[1].length > 0 && this.chartData[2].length > 0 && this.chartData[3].length > 0) {

      this.associatesDetails = JSON.parse(this.chartData[0]);
      this.accountSpendingData = JSON.parse(this.chartData[2]);
      this.accountMonthlyGrowData = JSON.parse(this.chartData[1]);
      this.financeMonitoringData = JSON.parse(this.chartData[3]);

      this.ltsReq = this.associatesDetails.Requirements.new;
      this.clientReq = this.associatesDetails.Requirements.expansions;
      this.attrition = [this.associatesDetails.Attrition.total, this.associatesDetails.Attrition.lastMonth];
      this.expansion = [this.associatesDetails.Expansions.total, this.associatesDetails.Expansions.lastMonth];

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
              barThickness: 6,
              maxBarThickness: 8,
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
              barThickness: 6,
              maxBarThickness: 8,
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
}



