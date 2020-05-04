import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-exp-doughnutchart",
  templateUrl: "./exp-doughnutchart.component.html",
  styleUrls: ["./exp-doughnutchart.component.css"],
})
export class ExpDoughnutchartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // Doughnut
  public doughnutChartLabels: string[] = [
    "Age 18 to 24",
    "Age 25 to 35",
    "Above 35+",
  ];
  // public demodoughnutChartData: number[] = [
  //   [350, 450, 100],
  //   [250, 350, 150],
  // ];
  public doughnutChartType: string = "doughnut";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
