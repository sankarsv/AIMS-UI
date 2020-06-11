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
    this.chartType = "line";
    this.chartDatasets = [
      {
        data: this.TraineeData,
        backgroundColor: this.executive.ColorValues,
        hoverBackgroundColor: this.executive.ColorValues,
        label:this.executive.TraineeDetails.Keys(),
        totalData:this.executive.TraineeDetails
      },
    ];
    this.chartLabels = this.executive.TraineeDetails.Keys();
    this.chartOptions = {
      title:{
        text:'Trainee Count',
        display:true
      },
      responsive: true,
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
              var label:string = "";
              let dataValue:string =tooltipItem.xLabel;
              if(data.datasets[tooltipItem.datasetIndex].totalData.ContainsKey(dataValue))
              {
                let onlabel="Onshore Trainee Count: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(dataValue).OnTraineeCount;
                let offlabel=" Offshore Trainee Count: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(dataValue).OffShoreTraineeCount;
                return [onlabel,offlabel];
              }
              return label;
            }
            }
          }
    };
  }

  public chartHovered(e: any): void {}
}
