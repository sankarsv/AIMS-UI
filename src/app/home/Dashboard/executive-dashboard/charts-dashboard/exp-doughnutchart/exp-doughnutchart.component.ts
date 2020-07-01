import { Component, OnInit, Input} from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";

@Component({
  selector: "app-exp-doughnutchart",
  templateUrl: "./exp-doughnutchart.component.html",
  styleUrls: ["./exp-doughnutchart.component.css"],
})
export class ExpDoughnutchartComponent implements OnInit {
  public SeniorJuniorData: any[] = [];
  @Input() public SrJrRatios:Dictionary<any>;
  @Input() public ColorValues:string[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor() {}

  ngOnInit() {
    if (this.SrJrRatios != null) {
      this.SrJrRatios.Values().forEach((key: any) => {
        this.SeniorJuniorData.push(key.SrCount+key.JrCount);
      });
      this.chartLabels = this.SrJrRatios.Keys();
      this.loadChart();
    }
  }

  loadChart() {
    this.chartType = "doughnut";
    this.chartDatasets = [
      {
        data: this.SeniorJuniorData,
        backgroundColor: this.ColorValues,
        hoverBackgroundColor: this.ColorValues,
        label:this.SrJrRatios.Keys(),
      },
    ];
    
    this.chartOptions = {
      title:{
        text:'Senior Junior Count',
        display:true
      },
      responsive: true,
      legend:{
        position:'bottom'
      }
    };
  }

  public chartHovered(e: any): void {}

  public RefreshChartData(selectedBRM:any)
  {
    this.SeniorJuniorData=[];
    this.SeniorJuniorData.push(selectedBRM.SrCount);
    this.SeniorJuniorData.push(selectedBRM.JrCount);
    this.chartLabels = ["Senior Count","Junior Count"];
    this.loadChart();
  }

  public LoadAccountWiseChart()
  {
    this.ngOnInit();
  }
}
