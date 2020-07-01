import { Component, OnInit, Input } from '@angular/core';
import { Dictionary } from 'app/utils/Dictionary';

@Component({
  selector: 'app-dash-board-location-wise-chart',
  templateUrl: './dash-board-location-wise-chart.component.html',
  styleUrls: ['./dash-board-location-wise-chart.component.css']
})
export class DashBoardLocationWiseChartComponent implements OnInit {
  public OnshoreData: Dictionary<any>;
  public OffshoreData: Dictionary<any>;
  datavariable: any[];
  @Input() public LocationWiseCounts: Dictionary<any>;
  @Input() public ColorValues: string[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor() { }

  ngOnInit() {

    if (this.LocationWiseCounts != null) {
      this.OnshoreData = new Dictionary<any>();
      this.OffshoreData = new Dictionary<any>();
      let index =0;
      let dataIndex=0;
      this.LocationWiseCounts.Values().forEach((key: any) => {
        key.LocationWise.forEach(element => {

          if (element.Geography == "Onsite") {
            if (this.OnshoreData.ContainsKey(element.Location)) {
              this.OnshoreData.Item(element.Location).data[dataIndex] =element.Count;
            }
            else {
              index++;
              let dummyData=[0,0,0,0,0,0,0,0,0,0,0,0,0];
              dummyData[dataIndex]=element.Count;
              let chartData={ data: dummyData, label: element.Location, stack: 'Onsite', barPercentage: 0.4,backgroundColor: this.ColorValues[index],borderColor: this.ColorValues[index] }
              this.OnshoreData.Add(element.Location, chartData);
            }
          }
          if (element.Geography == "Offsite") {
            if (this.OnshoreData.ContainsKey(element.Location)) {
              this.OnshoreData.Item(element.Location).data[dataIndex] =element.Count;
            }
            else {
              index++;
               let dummyData=[0,0,0,0,0,0,0,0,0,0,0,0,0];
              dummyData[dataIndex]=element.Count;
              let chartData={ data: dummyData, label: element.Location, stack: 'Offsite', barPercentage: 0.4,backgroundColor: this.ColorValues[index],borderColor: this.ColorValues[index] }
              this.OnshoreData.Add(element.Location, chartData);
            }
          }
        });
        dataIndex++;
      });
      this.chartLabels = this.LocationWiseCounts.Keys();
      this.loadChart();
    }
  }
  public barChartColors: Array<any>;
  loadChart() {
    this.chartType = "bar";
    this.chartDatasets = this.OnshoreData.Values().concat(this.OffshoreData.Values());

    this.chartOptions = {
      title: {
        text: 'LocationWise',
        display: true
      },
      responsive: true,
      legend:{
        position:'bottom'
      }
    };
  }

  public chartHovered(e: any): void { }
  public RefreshChartData(selectedBRM: any) {
    this.OnshoreData = new Dictionary<any>();
    this.OffshoreData = new Dictionary<any>();
    let index=0;
    selectedBRM.LocationWise.forEach(element => {
      if (element.Geography == "Onsite") {
        if (this.OnshoreData.ContainsKey(element.Location)) {
          this.OnshoreData.Item(element.Location).data.push(element.Count);
        }
        else {
          index++;
          let chartData={ data: [element.Count], label: element.Location, stack: element.Location, barPercentage: 0.4,backgroundColor: this.ColorValues[index],borderColor: this.ColorValues[index] }
          this.OnshoreData.Add(element.Location, chartData);
        }
      }
      if (element.Geography == "Offsite") {
        if (this.OnshoreData.ContainsKey(element.Location)) {
          this.OnshoreData.Item(element.Location).data.push(element.Count);
        }
        else {
          index++;
          let chartData={ data: [element.Count], label: element.Location, stack: element.Location, barPercentage: 0.4,backgroundColor: this.ColorValues[index],borderColor: this.ColorValues[index] }
          this.OnshoreData.Add(element.Location, chartData);
        }
      }
    });
    this.chartLabels = [selectedBRM.BRMName];
    this.loadChart();
  }

  public LoadAccountWiseChart() {
    this.ngOnInit();
  }
}
