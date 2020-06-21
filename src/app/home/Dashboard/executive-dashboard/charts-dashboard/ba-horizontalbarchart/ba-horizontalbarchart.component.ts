import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-ba-horizontalbarchart",
  templateUrl: "./ba-horizontalbarchart.component.html",
  styleUrls: ["./ba-horizontalbarchart.component.css"],
})
export class BaHorizontalbarchartComponent implements OnInit {
  public BAData: any[]=[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;

  constructor(public executive:ExecutiveDashboardComponent) {}

  ngOnInit() {
    if (this.executive.BACounts != null) {
      this.executive.BACounts.Values().forEach((key: any) => {
        this.BAData.push(key.BACountTotal);
      });
      this.loadChart();
    }
  }

  loadChart() {
    this.chartType = "horizontalBar";
    this.chartDatasets = [
      {
        data: this.BAData,
        backgroundColor: this.executive.ColorValues,
        hoverBackgroundColor: this.executive.ColorValues
      },
    ];
    this.chartLabels = this.executive.BACounts.Keys();
    this.chartOptions = {
      title:{
        text:'BA Count',
        display:true
      },
      responsive: true
    };
  }

  public chartHovered(e: any): void {}
}
