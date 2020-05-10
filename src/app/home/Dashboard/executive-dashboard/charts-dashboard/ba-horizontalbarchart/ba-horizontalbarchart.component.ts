import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ba-horizontalbarchart",
  templateUrl: "./ba-horizontalbarchart.component.html",
  styleUrls: ["./ba-horizontalbarchart.component.css"],
})
export class BaHorizontalbarchartComponent implements OnInit {
  @Input() public BAData: any[] = [];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;

  // chartDatasets: any = [];
  constructor() {}

  ngOnInit() {
    if (this.BAData[0] != null) {
      this.loadChart();
    }
  }

  loadChart() {
    this.chartType = "horizontalBar";
    this.chartDatasets = [
      {
        data: [this.BAData[0].BACountPerc],
        backgroundColor: ["rgba(0,0,255,0.3)"],
        hoverBackgroundColor: ["#fafafa"],
      },
    ];
    this.chartLabels = ["Business Analyst-Percentage"];
    this.chartOptions = {
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
