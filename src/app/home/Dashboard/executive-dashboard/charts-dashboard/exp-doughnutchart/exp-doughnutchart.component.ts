import { Component, OnInit} from "@angular/core";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-exp-doughnutchart",
  templateUrl: "./exp-doughnutchart.component.html",
  styleUrls: ["./exp-doughnutchart.component.css"],
})
export class ExpDoughnutchartComponent implements OnInit {
  public SeniorJuniorData: any[] = [];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor(public executive:ExecutiveDashboardComponent) {}

  ngOnInit() {
    if (this.executive.SRJrRatios != null) {
      this.executive.SRJrRatios.Values().forEach((key: any) => {
        this.SeniorJuniorData.push(key.SrCount+key.JrCount);
      });
      this.loadChart();
    }
  }

  loadChart() {
    this.chartType = "doughnut";
    this.chartDatasets = [
      {
        data: this.SeniorJuniorData,
        backgroundColor: this.executive.ColorValues,
        hoverBackgroundColor: this.executive.ColorValues,
        label:this.executive.SRJrRatios.Keys()
      },
    ];
    this.chartLabels = this.executive.SRJrRatios.Keys();
    this.chartOptions = {
      title:{
        text:'Senior Junior Count',
        display:true
      },
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
