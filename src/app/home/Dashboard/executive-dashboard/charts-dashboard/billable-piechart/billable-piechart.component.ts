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
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;

  // chartDatasets: any = [];
  constructor() {}

  ngOnInit() {
    if (this.billableData[0] != null) {
      this.loadPieChart();
    }
  }

  loadPieChart() {
    this.chartType = "pie";
    this.chartDatasets = [
      {
        data: [this.billableData[0].BillPerc, this.billableData[0].NBillPerc],
        backgroundColor: ["rgba(105,159,177,0.2)", "rgba(77,20,96,0.3)"],
        hoverBackgroundColor: ["#fafafa", "#fafafa"],
      },
      // {
      //   data: [this.billableData[0].NBillPerc],
      //   label: "NonBillablePercentage",
      //   backgroundColor: "#46BFBD",
      //   hoverBackgroundColor: "#5AD3D1",
      // },
    ];
    this.chartLabels = ["Billable-Percentage", "NonBillable-Percentage"];
    this.chartOptions = {
      responsive: true,
      // toolTipContent: "Working",
      // tooltips: {
      //   content: function(e) {

      //   },
      //   // callbacks: {
      //   //   label: function (tooltipItem, billableData) {
      //   //     return this.billableData[0].BillPerc;
      //   //   },
      //   // },
      // },
    };
  }

  public chartHovered(e: any): void {}
}
