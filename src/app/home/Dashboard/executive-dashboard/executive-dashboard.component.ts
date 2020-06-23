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
import { ExpDoughnutchartComponent } from "./charts-dashboard/exp-doughnutchart/exp-doughnutchart.component";
import { BillablePiechartComponent } from "./charts-dashboard/billable-piechart/billable-piechart.component";
import { TraineeBarchartComponent } from "./charts-dashboard/trainee-barchart/trainee-barchart.component";
import { BaHorizontalbarchartComponent } from "./charts-dashboard/ba-horizontalbarchart/ba-horizontalbarchart.component";

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
  BRMList: Dictionary<any>;
  BrmNamesList: any[] = []
  SrJrRatios: Dictionary<any>;
  HeadCounts: Dictionary<any>;
  TraineeDetails: Dictionary<any>;
  BACounts: Dictionary<any>;
  DisplayBRMData: boolean = false;
  isloading: boolean = false;
  HasDataFetched: Boolean = false;
  HasDataLoaded: Boolean = false;
  selectedBRM: string;
  receivedChildMessage: string;
  dashBoardType: any;
  @ViewChild("SrJrChart") SrJrChartComponent: ExpDoughnutchartComponent;
  @ViewChild("BillableChart") BillableChartComponent: BillablePiechartComponent;
  @ViewChild("TraineeChart") TraineeChartComponent: TraineeBarchartComponent;
  @ViewChild("BaChart") BaChartComponent: BaHorizontalbarchartComponent;
  public ColorValues: string[] = ['#66CDAA', '#87CEEB', '#20B2AA', '#E9967A', '#DB7093', '#DC143C', '#FF69B4', '#FFA500', '#FF4500', '#FF0000'];

  constructor(
    public httpService: httpService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.dashBoardType = 'Accountwise DashBoard';
    this.fetchYearlyDetails("2020", "MAY");
  }

  getMessage(message: string) {
    this.receivedChildMessage = message;
    console.log(message);
  }

  fetchYearlyDetails(year: string, month: string) {
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
    ]).subscribe((res) => {
      this.dashBoardDetails = res;
      this.initializeView();
    });
  }
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
      this.HasDataFetched = false;
      this.loadAccountWiseChart();
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
        BillCount: Number(billingDetail["billableCountTot"]),
        NBillCOunt: Number(billingDetail["nbCountTot"]),
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
    this.SrJrRatios = new Dictionary<any>();
    srjrRatios.map((srjrRatio) => {
      let srjrRatioLocal = {
        BRMName: srjrRatio["brmName"],
        BRMNumber: srjrRatio["brnNumber"],
        SrCount: Number(srjrRatio["srCountTot"]),
        JrCount: Number(srjrRatio["jrCountTot"]),
        SrCountPerc: srjrRatio["srCountPerc"],
        JrCountPerc: srjrRatio["jrCountPerc"],
        OnSrCountTot: srjrRatio["onsrCountTot"],
        OnJrCountTot: srjrRatio["onjrCountTot"],
        OffSrCountPerc: srjrRatio["offsrCountPerc"],
        OffJrCountPerc: srjrRatio["offjrCountPerc"],
      };
      this.SrJrRatios.Add(srjrRatioLocal.BRMName, srjrRatioLocal);
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
        TotalCount: headCount["totalCnt"],
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
        TraineeCountTotal: Number(traineeDetail["trCountTot"]),
        TraineeCountPer: traineeDetail["trCountPerc"],
        OnTraineeCount: Number(traineeDetail["ontrCountTot"]),
        OnShoreTraineePerc: traineeDetail["ontrCountPerc"],
        OffShoreTraineeCount: Number(traineeDetail["offtrCountTot"]),
        OffShoreTraineePerc: traineeDetail["offtrCountPerc"],
      };
      this.TraineeDetails.Add(traineeDetailLocal.BRMName, traineeDetailLocal);
    });
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
  }


  //#region barchart - BRM vs Headcount
  public brmNames: any[] = [];
  public OffshoreHeadCount: any[] = [];
  public OnshoreHeadCount: any[] = [];
  public mbarChartLabels: string[];
  public barChartData: any[];
  public barChartOptions: any;
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartColors: Array<any>;
  public activeElement: string;
  
  loadBarChart() {
    this.barChartType = "bar";
    this.barChartColors = [
      {
        backgroundColor: this.ColorValues[4],
        borderColor: this.ColorValues[4],
        borderWidth: 2
      },
      {
        backgroundColor: this.ColorValues[5],
        borderColor: this.ColorValues[5],
        borderWidth: 2
      }
    ];
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      title: {
        text: 'Head Count',
        display: true
      },
      scales: {
        xAxes: [{
          barPercentage: 0.2
        }]
      }
    };
  }

  loadAccountWiseChart() {
    this.HasDataLoaded = true;
    this.loadHeadCountData();

    this.barChartData = [
      { data: this.OffshoreHeadCount, label: 'Offshore Count', stack: 'a' },
      { data: this.OnshoreHeadCount, label: 'Onshore Count', stack: 'a' }
    ];
    this.barChartLegend = true;
    this.mbarChartLabels = this.HeadCounts.Keys();
    this.loadBarChart();
  }

  RefreshAccountWiseData()
  {
    this.loadAccountWiseChart();
    this.BaChartComponent.LoadAccountWiseChart();
    this.BillableChartComponent.LoadAccountWiseChart();
    this.TraineeChartComponent.LoadAccountWiseChart();
    this.SrJrChartComponent.LoadAccountWiseChart();
  }

  loadHeadCountData() {
    this.OffshoreHeadCount = [];
    this.OnshoreHeadCount = [];
    this.HeadCounts.Values().forEach((key: any) => {
      this.brmNames.push(key.BRMName);
      this.OffshoreHeadCount.push(key.OffTotal);
      this.OnshoreHeadCount.push(key.OnShoreTotal);
    });
  }

  public chartClicked(evt: any) {
    if (!this.DisplayBRMData) {
      this.activeElement = evt.active[0]._model.label;
      this.DisplayBRMData = true;
      this.getBRMDetails();
      this.selectedBRM = this.activeElement;
      this.loadOtherchartdetails(this.activeElement);
    }
  }

  loadOtherchartdetails(selectedBrmName: string) {
    console.log("print" + selectedBrmName);
    this.loadBRMWiseBarChart(selectedBrmName);
    this.BillableChartComponent.RefreshChartData(this.BillingDetails.Item(selectedBrmName));
    this.SrJrChartComponent.RefreshChartData(this.SrJrRatios.Item(selectedBrmName));
    this.TraineeChartComponent.RefreshChartData(this.TraineeDetails.Item(selectedBrmName));
    this.BaChartComponent.RefreshChartData(this.BACounts.Item(selectedBrmName));
  }

  loadBRMWiseBarChart(selectedBrmName: string) {
    this.OffshoreHeadCount = [this.HeadCounts.Item(selectedBrmName).OffTotal];
    this.OffshoreHeadCount.push(this.HeadCounts.Item(selectedBrmName).OnShoreTotal);
    this.barChartData = [
      { data: this.OffshoreHeadCount}
    ];
    this.barChartLegend = false;
    this.mbarChartLabels = ['Offshore Count', 'Onshore Count'];
    this.loadBarChart();
  }

  getBRMDetails() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].BRMDetailsList).then((res: any) => {
      this.BRMList = new Dictionary<any>();
      this.BrmNamesList = [];
      res.map((brmDetail: { [x: string]: any; }) => {
        let brmDetalLocal = {
          BRMName: brmDetail["brmName"],
          BRMId: brmDetail["brmId"]
        };
        this.BRMList.Add(brmDetalLocal.BRMId, brmDetalLocal.BRMName);
        this.BrmNamesList.push({ value: Number(brmDetalLocal.BRMId), title: brmDetalLocal.BRMName })
      })
    });
  }
  public chartHovered(e: any): void { }
}
