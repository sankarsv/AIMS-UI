import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-trainee-barchart",
  templateUrl: "./trainee-barchart.component.html",
  styleUrls: ["./trainee-barchart.component.css"],
})
export class TraineeBarchartComponent implements OnInit {
  @Input() public TraineeData: any[] = [];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;

  // chartDatasets: any = [];
  constructor() {}

  ngOnInit() {
    if (this.TraineeData[0] != null) {
      this.loadtraineeChart();
    }
  }

  loadtraineeChart() {
    this.chartType = "polarArea";
    this.chartDatasets = [
      {
        data: [
          this.TraineeData[0].OnShoreTraineePerc,
          this.TraineeData[0].OffShoreTraineePerc,
        ],
        backgroundColor: ["rgba(105,159,177,0.2)", "rgba(77,20,96,0.3)"],
        hoverBackgroundColor: ["#fafafa", "#fafafa"],
      },
    ];
    this.chartLabels = [
      "OnshoreTrainee-Percentage",
      "OffshoreTrainee-Percentage",
    ];
    this.chartOptions = {
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
