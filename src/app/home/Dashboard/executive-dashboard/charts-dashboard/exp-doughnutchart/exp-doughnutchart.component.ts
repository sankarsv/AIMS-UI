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
        backgroundColor: ["rgba(105,159,177,0.2)", "rgba(77,20,96,0.3)"],
        hoverBackgroundColor: ["#fafafa", "#fafafa"],
      },
    ];
    this.chartLabels = ["SeniorCount-Percentage", "JuniorCount-Percentage"];
    this.chartOptions = {
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
