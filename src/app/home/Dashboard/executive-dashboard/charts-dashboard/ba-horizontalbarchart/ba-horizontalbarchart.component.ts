import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";

@Component({
  selector: "app-ba-horizontalbarchart",
  templateUrl: "./ba-horizontalbarchart.component.html",
  styleUrls: ["./ba-horizontalbarchart.component.css"],
})
export class BaHorizontalbarchartComponent implements OnInit {
  public BAData: any[]=[];
  @Input() public BACounts:Dictionary<any>;
  @Input() public ColorValues:string[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;

  constructor() {}

  ngOnInit() {
    if (this.BACounts != null) {
      this.BACounts.Values().forEach((key: any) => {
        this.BAData.push(key.BACountTotal);
      });
      this.chartLabels = this.BACounts.Keys();
      this.loadChart();
    }
  }

  loadChart() {
    this.chartType = "horizontalBar";
    this.chartDatasets = [
      {
        data: this.BAData,
        backgroundColor: this.ColorValues,
        hoverBackgroundColor: this.ColorValues
      },
    ];
    
    this.chartOptions = {
      title:{
        text:'BA Count',
        display:true
      },
      responsive: true
    };
  }

  public chartHovered(e: any): void {}
  public RefreshChartData(selectedBRM:any)
  {
    this.BAData=[];
    this.BAData.push(selectedBRM.BACountTotal);
    this.chartLabels = [selectedBRM.BRMName];
    this.loadChart();
  }

  public LoadAccountWiseChart()
  {
    this.ngOnInit();
  }
}
