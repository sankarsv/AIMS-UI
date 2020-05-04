import { Component, OnInit, Input } from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-billable-piechart",
  templateUrl: "./billable-piechart.component.html",
  styleUrls: ["./billable-piechart.component.css"],
})
export class BillablePiechartComponent implements OnInit {
  @Input() public billableData: any[] = [];
  tempData: any[] = [];
  //@Input() public test: any;
  //@Input("billableData") public data1;
  //@Input() public billableData: any;
  // private _billableData: any;
  // @Input()
  // set billableData(billableData: any) {
  //   this._billableData = billableData; // uppercase message here
  // }

  // get billableData(): any {
  //   return this._billableData;
  // }

  //@Input() public billableData: Array<any> = [];
  //@Input("test") public name;
  //public tempdata: any = [];
  //@Input() billableData;
  // Load() {
  //   this.tempdata = this._billableData.length;
  //   console.log(this._billableData.BRMName);
  // }

  public chartType: string = "pie";
  // chartDatasets: any = [];
  constructor() {}

  ngOnInit() {
    if (this.billableData[0] != null) {
      this.printData();
    }
  }

  // ngAfterContentInit() {
  //   console.log(
  //     this.billableData.forEach((childObj) => {
  //       console.log(childObj);
  //     })
  //   );
  // }

  printData() {
    this.tempData = this.billableData;
    console.log("billableData.");
    console.log(this.billableData);
    console.log("data printed");

    this.chartDatasets = [
      {
        data: [this.billableData[0].BillPerc, 20, 30],
        label: "test",
      },
    ];
    console.log("charDataSet data: " + this.billableData[0]);
  }

  public chartDatasets: Array<any>;
  // = [
  //   {
  //     data: [if(this.billableData[0]!=null) this.billableData[0].BillPerc],
  //     label: "BillablePercentage",
  //   },
  // ];

  public chartLabels: Array<any> = [
    "Billable-Percentage",
    "NonBillable-Percentage",
  ];

  public chartColors: Array<any> = [
    {
      backgroundColor: ["#F7464A", "#46BFBD"],
      hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"],
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}
}
