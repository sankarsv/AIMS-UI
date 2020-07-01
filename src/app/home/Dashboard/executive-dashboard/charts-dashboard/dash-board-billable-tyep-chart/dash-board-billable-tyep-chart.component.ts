import { Component, OnInit, Input } from '@angular/core';
import { Dictionary } from 'app/utils/Dictionary';

@Component({
  selector: 'app-dash-board-billable-tyep-chart',
  templateUrl: './dash-board-billable-tyep-chart.component.html',
  styleUrls: ['./dash-board-billable-tyep-chart.component.css']
})
export class DashBoardBillableTyepChartComponent implements OnInit {
  public OnFPbillableType: any[] = [];
  public OffFPbillableType: any[] = [];
  public OnTMbillableType: any[] = [];
  public OffTMbillableType: any[] = [];
  @Input() public BillableTypeCounts: Dictionary<any>;
  @Input() public ColorValues: string[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor() { }

  ngOnInit() {

    if (this.BillableTypeCounts != null) {
      this.BillableTypeCounts.Values().forEach((key: any) => {
        this.OnFPbillableType.push(key.OnFPTotalPerc);
        this.OffFPbillableType.push(key.OffFPTotalPerc);
        this.OnTMbillableType.push(key.OnTMTotalPerc);
        this.OffTMbillableType.push(key.OffTMTotalPerc);
      });
      this.chartLabels = this.BillableTypeCounts.Keys();
      this.loadChart();
    }
  }
  loadChart() {
    this.chartType = "bar";
    this.chartDatasets = [
      {
        data: this.OnFPbillableType,
        backgroundColor: '#ff99dd',
        hoverBackgroundColor: this.ColorValues[2],
        borderColor: this.ColorValues[2],
        borderWidth: 2,
        label: "Onshore FP"
      },
      {
        data: this.OffFPbillableType,
        backgroundColor: '#6666ff',
        hoverBackgroundColor: this.ColorValues[3],
        borderColor: this.ColorValues[3],
        borderWidth: 2,
        label: "Offshore FP"
      },
      {
        data: this.OnTMbillableType,
        backgroundColor: '#f0c2d1',
        hoverBackgroundColor: this.ColorValues[4],
        borderColor: this.ColorValues[4],
        borderWidth: 2,
        label: "Onshore TM"
      },
      {
        data: this.OffTMbillableType,
        backgroundColor: '#f8b9c6',
        hoverBackgroundColor: this.ColorValues[5],
        borderColor: this.ColorValues[5],
        borderWidth: 2,
        label: "Offshore TM"
      },
    ];
    this.chartOptions = {
      title: {
        text: 'Billable Type',
        display: true
      },
      responsive: true,
      legend:{
        position:'bottom'
      },
      scales:{
        yAxes:[{
          ticks:{
            min:0
          }
        }]
      }
    };
  }

  public chartHovered(e: any): void { }
  public RefreshChartData(selectedBRM: any) {
    this.OnFPbillableType = [];
    this.OffFPbillableType = [];
    this.OnTMbillableType = [];
    this.OffTMbillableType = [];
    this.OnFPbillableType.push(selectedBRM.OnFPTotalPerc);
    this.OffFPbillableType.push(selectedBRM.OffFPTotalPerc);
    this.OnTMbillableType.push(selectedBRM.OnTMTotalPerc);
    this.OffTMbillableType.push(selectedBRM.OffTMTotalPerc);
    this.chartLabels = [selectedBRM.BRMName];
    this.loadChart();
  }

  public LoadAccountWiseChart() {
    this.ngOnInit();
  }
}
