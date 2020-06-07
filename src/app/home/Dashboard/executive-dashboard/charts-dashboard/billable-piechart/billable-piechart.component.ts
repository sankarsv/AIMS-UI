import { Component, OnInit} from "@angular/core";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-billable-piechart",
  templateUrl: "./billable-piechart.component.html",
  styleUrls: ["./billable-piechart.component.css"],
})
export class BillablePiechartComponent implements OnInit {
  public billableData: any[]=[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor(public executive:ExecutiveDashboardComponent) {}

  ngOnInit() {
    if (this.executive.BillingDetails != null) {
      this.executive.BillingDetails.Values().forEach((key: any) => {
        this.billableData.push(key.NBillCOunt+key.BillCount);
      });
      this.loadPieChart();
    }
  }

  loadPieChart() {
    this.chartType = "pie";
    this.chartDatasets = [
      {
        data: this.billableData,
        backgroundColor: this.executive.ColorValues,
        hoverBackgroundColor: this.executive.ColorValues,
        label: this.executive.BillingDetails.Keys()
      },
    ];
    this.chartLabels = this.executive.BillingDetails.Keys();
    this.chartOptions = {
      title:{
        text:'Billable and NonBillable Details',
        display:true
      },
      responsive: true
    };
  }

  public chartHovered(e: any): void {}
}
