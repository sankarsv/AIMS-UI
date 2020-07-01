import { Component, OnInit, Input} from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";

@Component({
  selector: "app-trainee-barchart",
  templateUrl: "./trainee-barchart.component.html",
  styleUrls: ["./trainee-barchart.component.css"],
})
export class TraineeBarchartComponent implements OnInit {
  @Input() public TraineeDetails:Dictionary<any>;
  @Input() public ColorValues:string[];
  offshorTraineeData:any[]=[];
  OnshoreTraineeData:any[]=[];
  OffshoreNonTraineeData:any[]=[];
  OnshoreNonTraineeData:any[]=[];
  labelValues:string[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor() {}

  ngOnInit() {
    if (this.TraineeDetails != null) {
      this.TraineeDetails.Values().forEach((key: any) => {
        this.OnshoreTraineeData.push(key.OnTraineeCount);
        this.OnshoreNonTraineeData.push(key.TraineeCountTotal);
        this.offshorTraineeData.push(key.OffShoreTraineeCount);
        this.OffshoreNonTraineeData.push(key.TraineeCountTotal);
      });
      this.labelValues = this.TraineeDetails.Keys();
      this.loadtraineeChart();
    }
  }

  loadtraineeChart() {
    this.chartType = "bar";
    this.chartDatasets = [
      {
        data: this.offshorTraineeData,
        backgroundColor: '#ff99dd',
        hoverBackgroundColor: this.ColorValues[2],
        borderColor: this.ColorValues[2],
        borderWidth:2,
        label:"Offshore Trainee Data",
        fillOpacity: .1,
        fill:false
      },
      {
        data: this.OffshoreNonTraineeData,
        backgroundColor: '#6666ff',
        hoverBackgroundColor: this.ColorValues[3],
        borderColor: this.ColorValues[3],
        borderWidth:2,
        label:"Offshore Non Trainee Data",
        fillOpacity: .2,
        fill:false
      },
      {
        data: this.OnshoreTraineeData,
        backgroundColor: '#f0c2d1',
        hoverBackgroundColor: this.ColorValues[4],
        borderColor: this.ColorValues[4],
        borderWidth:2,
        label:"Onshore Trainee Data",
        fillOpacity: .3,
        fill:false
      },
      {
        data: this.OnshoreNonTraineeData,
        backgroundColor: '#f8b9c6',
        hoverBackgroundColor: this.ColorValues[5],
        borderColor: this.ColorValues[5],
        borderWidth:2,
        label:"Onshore Non Trainee Data",
        fillOpacity: .4,
        fill:false
      }
    ];
    this.chartLabels = this.labelValues;
    this.chartOptions = {
      title:{
        text:'Trainee Count',
        display:true
      },
      responsive: true,
      scales:{
        yAxes:[{
          ticks:{
            min:0
          }
        }]
      },
      legend:{
        position:'bottom'
      }
    };
  }

  public chartHovered(e: any): void {}
  public RefreshChartData(selectedBRM:any)
  {
    this.offshorTraineeData=[];
    this.OffshoreNonTraineeData=[];
    this.OnshoreTraineeData=[];
    this.OnshoreNonTraineeData=[];
    this.offshorTraineeData.push(selectedBRM.OnTraineeCount);
    this.OffshoreNonTraineeData.push(selectedBRM.TraineeCountTotal);
    this.OnshoreTraineeData.push(selectedBRM.OffShoreTraineeCount);
    this.OnshoreNonTraineeData.push(selectedBRM.TraineeCountTotal);
    this.labelValues=[selectedBRM.BRMName];
    this.loadtraineeChart();
  }

  public LoadAccountWiseChart()
  {
    this.ngOnInit();
  }
}
