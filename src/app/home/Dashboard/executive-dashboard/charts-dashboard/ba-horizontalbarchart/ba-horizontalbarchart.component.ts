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
        hoverBackgroundColor: this.executive.ColorValues,
        totalData: this.executive.BACounts
      },
    ];
    this.chartLabels = this.executive.BACounts.Keys();
    this.chartOptions = {
      title:{
        text:'BA Count',
        display:true
      },
      responsive: true,
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
              var label:string = ""
              if(data.datasets[tooltipItem.datasetIndex].totalData.ContainsKey(tooltipItem.yLabel))
              {
                label+="BA Percentage: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(tooltipItem.yLabel).BACountPerc;
              }
              return label;
            }
            }
          }
    };
  }

  public chartHovered(e: any): void {}
}
