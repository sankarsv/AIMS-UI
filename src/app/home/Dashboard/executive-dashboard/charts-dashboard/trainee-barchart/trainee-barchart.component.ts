import { Component, OnInit} from "@angular/core";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-trainee-barchart",
  templateUrl: "./trainee-barchart.component.html",
  styleUrls: ["./trainee-barchart.component.css"],
})
export class TraineeBarchartComponent implements OnInit {
  public TraineeData: any[] = [];
  offshorTraineeData:any[]=[];
  OnshoreTraineeData:any[]=[];
  OffshoreNonTraineeData:any[]=[];
  OnshoreNonTraineeData:any[]=[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor(public executive:ExecutiveDashboardComponent) {}

  ngOnInit() {
    if (this.executive.TraineeDetails != null) {
      this.executive.TraineeDetails.Values().forEach((key: any) => {
        this.OnshoreTraineeData.push(key.OnTraineeCount);
        this.OnshoreNonTraineeData.push(key.TraineeCountTotal);
        this.offshorTraineeData.push(key.OffShoreTraineeCount);
        this.OffshoreNonTraineeData.push(key.TraineeCountTotal);
      });
      this.loadtraineeChart();
    }
  }

  loadtraineeChart() {
    this.chartType = "line";
    this.chartDatasets = [
      {
        data: this.offshorTraineeData,
        backgroundColor: '#ff99dd',
        hoverBackgroundColor: this.executive.ColorValues[2],
        borderColor: this.executive.ColorValues[2],
        borderWidth:2,
        label:"Offshore Trainee Data",
        fillOpacity: .1,
        fill:false
      },
      {
        data: this.OffshoreNonTraineeData,
        backgroundColor: '#6666ff',
        hoverBackgroundColor: this.executive.ColorValues[3],
        borderColor: this.executive.ColorValues[3],
        borderWidth:2,
        label:"Offshore Non Trainee Data",
        fillOpacity: .2,
        fill:false
      },
      {
        data: this.OnshoreTraineeData,
        backgroundColor: '#f0c2d1',
        hoverBackgroundColor: this.executive.ColorValues[4],
        borderColor: this.executive.ColorValues[4],
        borderWidth:2,
        label:"Onshore Trainee Data",
        fillOpacity: .3,
        fill:false
      },
      {
        data: this.OnshoreNonTraineeData,
        backgroundColor: '#f8b9c6',
        hoverBackgroundColor: this.executive.ColorValues[5],
        borderColor: this.executive.ColorValues[5],
        borderWidth:2,
        label:"Onshore Non Trainee Data",
        fillOpacity: .4,
        fill:false
      }
    ];
    this.chartLabels = this.executive.TraineeDetails.Keys();
    this.chartOptions = {
      title:{
        text:'Trainee Count',
        display:true
      },
      responsive: true
    };
  }

  public chartHovered(e: any): void {}
}
