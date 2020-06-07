import { Component, OnInit} from "@angular/core";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-trainee-barchart",
  templateUrl: "./trainee-barchart.component.html",
  styleUrls: ["./trainee-barchart.component.css"],
})
export class TraineeBarchartComponent implements OnInit {
  public TraineeData: any[] = [];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor(public executive:ExecutiveDashboardComponent) {}

  ngOnInit() {
    if (this.executive.TraineeDetails != null) {
      this.executive.TraineeDetails.Values().forEach((key: any) => {
        this.TraineeData.push(key.TraineeCountTotal);
      });
      this.loadtraineeChart();
    }
  }

  loadtraineeChart() {
    this.chartType = "polarArea";
    this.chartDatasets = [
      {
        data: this.TraineeData,
        backgroundColor: ['#0000FF','#DC143C','#FF69B4','#FFA500','#FF4500','#FF0000','#FFFF00','#87CEEB','#808080','#2F4F4F'],
        hoverBackgroundColor: ['#0000FF','#DC143C','#FF69B4','#FFA500','#FF4500','#FF0000','#FFFF00','#87CEEB','#808080','#2F4F4F'],
        label:this.executive.TraineeDetails.Keys()
      },
    ];
    this.chartLabels = this.executive.TraineeDetails.Keys();
    this.chartOptions = {
      title:{
        text:'Trainee Count',
        display:true
      },
      responsive: true,
    };
  }

  public chartHovered(e: any): void {}
}
