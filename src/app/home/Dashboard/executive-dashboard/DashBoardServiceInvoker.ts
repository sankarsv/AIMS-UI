import { forkJoin, Observable } from "rxjs";
import { APP_CONSTANTS } from "app/utils/app-constants";
import { environment } from "environments/environment";
import { httpService } from "../../../../services/httpService";
import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class DashBoardServiceInvoker {
  dashBoardDetails: any[];
  @Output() OnDataFetched: EventEmitter<any> = new EventEmitter();
  @Output() OnBRMDataFetched: EventEmitter<any> = new EventEmitter();
  constructor(public httpService: httpService,) { }

  public InvokeDashBoardService() {
    let year = "2020";
    let month = "may";
    forkJoin([
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].BillingDetails, {
        reportType: "billable",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].SRJRRatio, {
        reportType: "srjrratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].HeadCount, {
        reportType: "hcratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].TraineeCount, {
        reportType: "trnratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].BADetails, {
        reportType: "baratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].LocationWiseCount, {
        reportType: "locationwisecount",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].BillingTypeCount, {
        reportType: "billingType",
        year: year,
        month: month,
      })
    ]).subscribe(res => {
      this.OnDataFetched.emit(res);
    });
  }

  InvokeBRMDetails() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].BRMDetailsList).then((res: any) => {
      this.OnBRMDataFetched.emit(res);
    });
  }
}