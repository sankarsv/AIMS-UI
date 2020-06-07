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
    this.chartType = "radar";
    this.chartDatasets = [
      {
        data: this.BAData,
        backgroundColor: ['#0000FF','#DC143C','#FF69B4','#FFA500','#FF4500','#FF0000','#FFFF00','#87CEEB','#808080','#2F4F4F'],
        hoverBackgroundColor: ['#0000FF','#DC143C','#FF69B4','#FFA500','#FF4500','#FF0000','#FFFF00','#87CEEB','#808080','#2F4F4F'],
        label:this.executive.BACounts.Keys()
      },
    ];
    this.chartLabels = this.executive.BACounts.Keys();
    this.chartOptions = {
      title:{
        text:'BA Count',
        display:true
      },
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
