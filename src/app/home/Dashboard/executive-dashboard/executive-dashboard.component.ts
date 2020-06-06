import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer,
} from "@angular/core";
import * as Chart from "chart.js";
import { progressbar } from "../../../Roles/constants";
import { NgCircleProgressModule } from "ng-circle-progress";
import { forkJoin } from "rxjs";
import { httpService } from "../../../../services/httpService";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { APP_CONSTANTS } from "app/utils/app-constants";
import { environment } from "environments/environment";
import { element } from "@angular/core/src/render3/instructions";
import "rxjs/add/operator/map";
import { Dictionary } from "app/utils/Dictionary";
import { ChartsModule } from "ng2-charts";
import { BrmBarchartComponent } from "./charts-dashboard/brm-barchart/brm-barchart.component";
import { BillablePiechartComponent } from "./charts-dashboard/billable-piechart/billable-piechart.component";

@Component({
  selector: "app-executive-dashboard",
  templateUrl: "./executive-dashboard.component.html",
  styleUrls: ["./executive-dashboard.component.css"],
})
export class ExecutiveDashboardComponent implements OnInit {
  yearsList: number[];
  dashBoardDetails: any[];
  BillingDetails: Dictionary<any>;
  public billingDetails: any[] = [];
  public seniorJuniorDetails: any[] = [];
  public traineeDetails: any[] = [];
  public headCountDetails: any[] = [];
  public BADetails: any[] = [];
  SRJrRatios: Dictionary<any>;
  HeadCounts: Dictionary<any>;
  TraineeDetails: Dictionary<any>;
  BACounts: Dictionary<any>;
  HasSummaryDataFetched: Boolean = false;
  HasDataFetched: Boolean = false;
  selectedBrmNameValue: string;
  receivedChildMessage: string;

  constructor(
    public httpService: httpService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchYearlyDetails("2020", "MAY");
  }

  getMessage(message: string) {
    this.receivedChildMessage = message;
    console.log(message);
  }

  fetchYearlyDetails(year: string, month: string) {
    forkJoin([
      this.httpService.PostDetails("billing.json", {
        reportType: "billable",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails("SeniorJuniorRatio.json", {
        reportType: "srjrratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails("HeadCount.json", {
        reportType: "hcratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails("Trainee.json", {
        reportType: "trnratio",
        year: year,
        month: month,
      }),
      this.httpService.PostDetails("BACount.json", {
        reportType: "baratio",
        year: year,
        month: month,
      }),
    ]).subscribe((res) => {
      this.dashBoardDetails = res;
      this.initializeView();
    });
  }

  // fetchYearlyDetails(year:string,month:string,brmName:string)
  // {
  //   forkJoin([
  //     this.httpService.PostDetails("billing.json",{ reportType:"billable",year:year,momth:month,bramName:brmName}),
  //     this.httpService.PostDetails("SeniorJuniorRatio.json",{ reportType:"srjrratio",year:year,momth:month,brmName:brmName}),
  //     this.httpService.PostDetails("HeadCount.json",{ reportType:"hcratio",year:year,momth:month,brmName:brmName}),
  //     this.httpService.PostDetails("Trainee.json",{ reportType:"trnratio",year:year,momth:month,brmName:brmName}),
  //     this.httpService.PostDetails("BACount.json",{ reportType:"baratio",year:year,momth:month,brmName:brmName})
  // ]).subscribe(res=>
  //   {
  //     this.dashBoardDetails=res;
  //     this.initializeView();
  //   });
  // }
  initializeView() {
    if (
      this.dashBoardDetails[0] != null &&
      this.dashBoardDetails[1] != null &&
      this.dashBoardDetails[2] != null &&
      this.dashBoardDetails[3] != null &&
      this.dashBoardDetails[3] != null
    ) {
      this.FillBillingDetails(this.dashBoardDetails[0]);
      this.FillSeniorJuniorRatio(this.dashBoardDetails[1]);
      this.FillHeadCounts(this.dashBoardDetails[2]);
      this.FillTraineeDetails(this.dashBoardDetails[3]);
      this.FillBACount(this.dashBoardDetails[4]);
      this.HasSummaryDataFetched = true;
      this.HasDataFetched = false;
      this.loadSummaryBarchart();
    } else {
      alert("Session Expired!");
      this.router.navigate(["/"]);
    }
  }

  FillBillingDetails(billingDetails: any) {
    this.BillingDetails = new Dictionary<any>();
    billingDetails.map((billingDetail) => {
      let billingDetailsLocal = {
        BRMName: billingDetail["brmName"],
        BRMNumber: billingDetail["brnNumber"],
        BillCount: billingDetail["billableCountTot"],
        NBillCOunt: billingDetail["nbCountTot"],
        BillPerc: billingDetail["billableCountPerc"],
        NBillPerc: billingDetail["nbCountPerc"],
        OnBillCOunt: billingDetail["onbillableCount"],
        OffBillCount: billingDetail["offbillabeCount"],
        OnBillPerc: billingDetail["onbillabePerc"],
        OfBillPerc: billingDetail["ofbillabePerc"],
      };
      this.BillingDetails.Add(billingDetailsLocal.BRMName, billingDetailsLocal);
    });
    //this.billingDetails.push(this.BillingDetails.Item("Akkaiah"));
  }

  FillSeniorJuniorRatio(srjrRatios: any) {
    this.SRJrRatios = new Dictionary<any>();
    srjrRatios.map((srjrRatio) => {
      let srjrRatioLocal = {
        BRMName: srjrRatio["brmName"],
        BRMNumber: srjrRatio["brnNumber"],
        SrCount: srjrRatio["srCountTot"],
        JrCount: srjrRatio["jrCountTot"],
        SrCountPerc: srjrRatio["srCountPerc"],
        JrCountPerc: srjrRatio["jrCountPerc"],
        OnSrCountTot: srjrRatio["onsrCountTot"],
        OnJrCountTot: srjrRatio["onjrCountTot"],
        OffSrCountPerc: srjrRatio["offsrCountPerc"],
        OffJrCountPerc: srjrRatio["offjrCountPerc"],
      };
      this.SRJrRatios.Add(srjrRatioLocal.BRMName, srjrRatioLocal);
    });
    //this.seniorJuniorDetails.push(this.SRJrRatios.Item("Akkaiah"));
  }

  FillHeadCounts(headCounts: any) {
    this.HeadCounts = new Dictionary<any>();
    headCounts.map((headCount) => {
      let headCountLocal = {
        BRMName: headCount["brmName"],
        BRMNumber: headCount["brnNumber"],
        OffTotal: headCount["offTot"],
        OnShoreTotal: headCount["onsiteTot"],
        OffPerc: headCount["offPerc"],
        OnshorePerc: headCount["onsitePerc"],
      };
      this.HeadCounts.Add(headCountLocal.BRMName, headCountLocal);
    });
    //this.headCountDetails.push(this.HeadCounts.Item("Akkaiah"));
  }

  FillTraineeDetails(traineeDetails: any) {
    this.TraineeDetails = new Dictionary<any>();
    traineeDetails.map((traineeDetail) => {
      let traineeDetailLocal = {
        BRMName: traineeDetail["brmName"],
        BRMNumber: traineeDetail["brnNumber"],
        TraineeCountTotal: traineeDetail["trCountTot"],
        TraineeCountPer: traineeDetail["trCountPerc"],
        OnTraineeCount: traineeDetail["ontrCountTot"],
        OnShoreTraineePerc: traineeDetail["ontrCountPerc"],
        OffShoreTraineeCount: traineeDetail["offtrCountTot"],
        OffShoreTraineePerc: traineeDetail["offtrCountPerc"],
      };
      this.TraineeDetails.Add(traineeDetailLocal.BRMName, traineeDetailLocal);
    });
    //this.traineeDetails.push(this.TraineeDetails.Item("Akkaiah"));
  }

  FillBACount(baCounts: any) {
    this.BACounts = new Dictionary<any>();
    baCounts.map((baCount) => {
      let baCountLocal = {
        BRMName: baCount["brmName"],
        BRMNumber: baCount["brnNumber"],
        BACountTotal: baCount["baCountTot"],
        BACountPerc: baCount["baCountPerc"],
      };
      this.BACounts.Add(baCountLocal.BRMName, baCountLocal);
    });
    //this.BADetails.push(this.BACounts.Item("Akkaiah"));
  }

  // selectedGetBrmNames(name: string) {
  //   console.log("Selected Name:" + name);
  // }

  // selectedGetBrmNames($event) {
  //   this.selectedBrmNameValue = $event;
  //   console.log(this.selectedBrmNameValue);
  // }

  //#region barchart - BRM vs Headcount
  public brmNames: any[] = [];
  public offshoreHC: any[] = [];
  public onshoreHC: any[] = [];
  public mbarChartLabels: string[];
  public barChartData: any[];
  public barChartOptions: any;
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartColors: Array<any>;
  public activeElement: string;
  loadSummaryBarchart() {
    this.barChartType = "bar";
    this.barChartData = [
      { data: this.getOffshoreData(), label: "Offshore-Head count" },
      { data: this.getOnshoreData(), label: "Onshore-Head count" },
    ];
    this.barChartLegend = true;
    this.mbarChartLabels = this.getBrmNames();
    this.barChartColors = [
      {
        backgroundColor: "rgba(0,0,255,0.3)",
        borderColor: "rgba(0,0,255,1)",
        pointBackgroundColor: "rgba(0,0,255,1)",
        pointBorderColor: "#fafafa",
        pointHoverBackgroundColor: "#fafafa",
        pointHoverBorderColor: "rgba(0,0,255)",
      },
      {
        backgroundColor: "rgba(0,255,0,0.3)",
        borderColor: "rgba(0,255,0,1)",
        pointBackgroundColor: "rgba(0,255,0,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0,255,0,0.3)",
      },
    ];
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
    };
  }

  getBrmNames(): string[] {
    this.HeadCounts.Values().forEach((key: any) => {
      this.brmNames.push(key.BRMName);
    });
    return this.brmNames;
  }
  getOffshoreData(): any[] {
    this.HeadCounts.Values().forEach((key: any) => {
      this.offshoreHC.push(key.OffTotal);
    });
    return this.offshoreHC;
  }
  getOnshoreData(): any[] {
    this.HeadCounts.Values().forEach((key: any) => {
      this.onshoreHC.push(key.OnShoreTotal);
    });
    return this.onshoreHC;
  }
  public chartClicked(evt: any) {
    //console.log(e.active[0]._model.label);
    this.activeElement = evt.active[0]._model.label;
    //alert(this.activeElement);
    this.loadOtherchartdetails(this.activeElement);
    if (
      this.billingDetails != null &&
      this.seniorJuniorDetails != null &&
      this.traineeDetails != null &&
      this.BADetails != null
    ) {
      this.HasSummaryDataFetched = false;
      this.HasDataFetched = true;
    }
  }

  //endregion barchart - BRM vs Headcount

  //#region Load other charts
  loadOtherchartdetails(selectedBrmName: string) {
    console.log("print" + selectedBrmName);
    this.billingDetails.push(this.BillingDetails.Item(selectedBrmName));
    this.seniorJuniorDetails.push(this.SRJrRatios.Item(selectedBrmName));
    this.traineeDetails.push(this.TraineeDetails.Item(selectedBrmName));
    this.BADetails.push(this.BACounts.Item(selectedBrmName));
  }
  //endregion Load other charts
}
