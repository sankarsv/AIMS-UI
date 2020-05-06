import { Component, OnInit, Input } from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";

import { ChartsModule } from "ng2-charts";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-brm-barchart",
  templateUrl: "./brm-barchart.component.html",
  styleUrls: ["./brm-barchart.component.css"],
})
export class BrmBarchartComponent implements OnInit {
  @Input() public HCData: Dictionary<any>;
  public brmName: any[] = [];
  public offshoreHC: any[] = [];
  public onshoreHC: any[] = [];
  public mbarChartLabels: string[];
  public barChartData: any[];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  constructor() {}

  ngOnInit() {
    if (this.HCData != null) {
      console.log("inside load chart method-onit");
      //this.loadChart();
      this.mbarChartLabels = this.getBrmNames();
      this.barChartData = [
        { data: this.getOffshoreData(), label: "Offshore" },
        { data: this.getOnshoreData(), label: "Onshore" },
      ];
      console.log("this.mbarChartLabels");
    }
  }
  getBrmNames(): string[] {
    this.HCData.Values().forEach((key: any) => {
      this.brmName.push(key.BRMName);
    });
    return this.brmName;
  }
  getOffshoreData(): any[] {
    this.HCData.Values().forEach((key: any) => {
      this.offshoreHC.push(key.OffTotal);
    });
    return this.offshoreHC;
  }
  getOnshoreData(): any[] {
    this.HCData.Values().forEach((key: any) => {
      this.onshoreHC.push(key.OnShoreTotal);
    });
    return this.onshoreHC;
  }

  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: "rgba(105,159,177,0.2)",
      borderColor: "rgba(105,159,177,1)",
      pointBackgroundColor: "rgba(105,159,177,1)",
      pointBorderColor: "#fafafa",
      pointHoverBackgroundColor: "#fafafa",
      pointHoverBorderColor: "rgba(105,159,177)",
    },
    {
      backgroundColor: "rgba(77,20,96,0.3)",
      borderColor: "rgba(77,20,96,1)",
      pointBackgroundColor: "rgba(77,20,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,20,96,1)",
    },
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
