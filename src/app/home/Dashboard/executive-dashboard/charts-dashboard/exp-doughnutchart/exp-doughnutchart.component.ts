import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-exp-doughnutchart",
  templateUrl: "./exp-doughnutchart.component.html",
  styleUrls: ["./exp-doughnutchart.component.css"],
})
export class ExpDoughnutchartComponent implements OnInit {
  @Input() public SeniorJuniorData: any[] = [];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;

  // chartDatasets: any = [];
  constructor() {}

  ngOnInit() {
    if (this.SeniorJuniorData[0] != null) {
      this.loadChart();
    }
  }

  loadChart() {
    this.chartType = "doughnut";
    this.chartDatasets = [
      {
        data: [
          this.SeniorJuniorData[0].SrCountPerc,
          this.SeniorJuniorData[0].JrCountPerc,
        ],
        backgroundColor: ["#F7464A", "#46BFBD"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"],
      },
    ];
    this.chartLabels = ["SeniorCount-Percentage", "JuniorCount-Percentage"];
    this.chartOptions = {
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
