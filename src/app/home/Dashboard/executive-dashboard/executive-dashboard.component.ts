import {
  Component,
  OnInit,
  ViewChild,
  Renderer,
} from "@angular/core";
import { forkJoin } from "rxjs";
import { httpService } from "../../../../services/httpService";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { APP_CONSTANTS } from "app/utils/app-constants";
import { environment } from "environments/environment";
import "rxjs/add/operator/map";
import { Dictionary } from "app/utils/Dictionary";
import { ExpDoughnutchartComponent } from "./charts-dashboard/exp-doughnutchart/exp-doughnutchart.component";
import { BillablePiechartComponent } from "./charts-dashboard/billable-piechart/billable-piechart.component";
import { TraineeBarchartComponent } from "./charts-dashboard/trainee-barchart/trainee-barchart.component";
import { BaHorizontalbarchartComponent } from "./charts-dashboard/ba-horizontalbarchart/ba-horizontalbarchart.component";
import { NgxGaugeModule } from 'ngx-gauge';
import { DashBoardLocationWiseChartComponent } from "./charts-dashboard/dash-board-location-wise-chart/dash-board-location-wise-chart.component";
import { DashBoardBillableTyepChartComponent } from "./charts-dashboard/dash-board-billable-tyep-chart/dash-board-billable-tyep-chart.component";

@Component({
  selector: "app-executive-dashboard",
  templateUrl: "./executive-dashboard.component.html",
  styleUrls: ["./executive-dashboard.component.css"],
})
export class ExecutiveDashboardComponent implements OnInit {
  yearsList: number[];
  dashBoardDetails: any[];
  BillingDetails: Dictionary<any>;
  BillingTypeDetails: Dictionary<any>;
  LocationWiseDetails: Dictionary<any>;
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
  @ViewChild("LocationWiseChart") LocationWiseChart: DashBoardLocationWiseChartComponent;
  @ViewChild("BillablTypeChart") BillableTypeChart: DashBoardBillableTyepChartComponent;
  public ColorValues: string[] = ['#66CDAA', '#87CEEB', '#20B2AA', '#E9967A', '#DB7093', '#DC143C', '#FF69B4', '#FFA500', '#FF4500', '#FF0000'];

  constructor(
    public httpService: httpService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

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
      this.dashBoardDetails[4] != null &&
      this.dashBoardDetails[5] != null &&
      this.dashBoardDetails[6] != null
    ) {
      this.FillBillingTypeDetails(this.dashBoardDetails[6]);
      this.FillLocationWiseCount(this.dashBoardDetails[5]);
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
  FillBillingTypeDetails(billingTypeDetails: any) {
    this.BillingTypeDetails = new Dictionary<any>();
    billingTypeDetails.map(billingType => {
      let billingTypeLocal = {
        BRMId: billingType["brmNo"],
        BRMName: billingType["brmName"],
        FPTotal: billingType["fpCountTotal"],
        TMTotal: billingType["tmCountTotal"],
        OnFPTotal: billingType["onFPCountTotal"],
        OnTMTotal: billingType["onTMCountTotal"],
        OffFPTotal: billingType["offFPCountTotal"],
        OffTMTotal: billingType["offTMCountTotal"],
        FPTotalPerc: billingType["fpCountPerc"],
        TMTotalPerc: billingType["tmCountPerc"],
        OnFPTotalPerc: billingType["onfpCountPerc"],
        OnTMTotalPerc: billingType["ontmCountPerc"],
        OffFPTotalPerc: billingType["offfpCountPerc"],
        OffTMTotalPerc: billingType["offtmCountPerc"]
      };
      this.BillingTypeDetails.Add(billingTypeLocal.BRMName, billingTypeLocal);
    });
  }

  FillLocationWiseCount(locationWiseDetails: any) {
    this.LocationWiseDetails = new Dictionary<any>();
    locationWiseDetails.map(locationWiseDetail => {
      let LocationWise: any[] = [];
      locationWiseDetail["locationDetails"].map(locations => {
        let locationwise = {
          Geography: locations["geography"],
          Location: locations["location"],
          Count: locations["count"]
        };
        LocationWise.push(locationwise);
      })
      let locationWiseDetailsLocal = {
        BRMId: locationWiseDetail["brmId"],
        BRMName: locationWiseDetail["brmName"],
        LocationWise: LocationWise
      }
      this.LocationWiseDetails.Add(locationWiseDetailsLocal.BRMName, locationWiseDetailsLocal);
    });
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
      scaleShowValues: true,
      title: {
        text: 'Head Count',
        display: true
      },
      legend:{
        position:'bottom'
      }
    };
  }

  loadAccountWiseChart() {
    this.HasDataLoaded = true;
    this.loadHeadCountData();

    this.barChartData = [
      { data: this.OffshoreHeadCount, label: 'Offshore Count', stack: 'a', barPercentage: 0.4 },
      { data: this.OnshoreHeadCount, label: 'Onshore Count', stack: 'a', barPercentage: 0.4 }
    ];
    this.barChartLegend = true;
    this.mbarChartLabels = this.HeadCounts.Keys();
    this.loadBarChart();
  }

  RefreshAccountWiseData() {
    this.loadAccountWiseChart();
    this.BaChartComponent.LoadAccountWiseChart();
    this.BillableChartComponent.LoadAccountWiseChart();
    this.TraineeChartComponent.LoadAccountWiseChart();
    this.SrJrChartComponent.LoadAccountWiseChart();
    this.BillableTypeChart.LoadAccountWiseChart();
    this.LocationWiseChart.LoadAccountWiseChart();
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
    this.BillableTypeChart.RefreshChartData(this.BillingTypeDetails.Item(selectedBrmName));
    this.LocationWiseChart.RefreshChartData(this.LocationWiseDetails.Item(selectedBrmName));
  }

  loadBRMWiseBarChart(selectedBrmName: string) {
    this.OffshoreHeadCount = [this.HeadCounts.Item(selectedBrmName).OffTotal];
    this.OffshoreHeadCount.push(this.HeadCounts.Item(selectedBrmName).OnShoreTotal);
    this.barChartData = [
      { data: this.OffshoreHeadCount, barPercentage: 0.4 }
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
  public chartHovered(): void { }

  gaugeType = "full"; //full, arch  
  gaugeValue = 28.3;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";

}
