import { Component, OnInit, Input} from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";

@Component({
  selector: "app-billable-piechart",
  templateUrl: "./billable-piechart.component.html",
  styleUrls: ["./billable-piechart.component.css"],
})
export class BillablePiechartComponent implements OnInit {
  public billableData: any[]=[];
  @Input() public BillingDetails:Dictionary<any>;
  @Input() public ColorValues:string[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor() {}

  ngOnInit() {
    if (this.BillingDetails != null) {
      this.BillingDetails.Values().forEach((key: any) => {
        this.billableData.push(key.NBillCOunt+key.BillCount);
      });
      this.chartLabels = this.BillingDetails.Keys();
      this.loadPieChart();
    }
  }

  loadPieChart() {
    this.chartType = "pie";
    this.chartDatasets = [
      {
        data: this.billableData,
        backgroundColor: this.ColorValues,
        hoverBackgroundColor: this.ColorValues,
        label: this.BillingDetails.Keys(),
        totalData:this.BillingDetails
      },
    ];
    this.chartOptions = {
      title:{
        text:'Billable and NonBillable Details',
        display:true
      },
      responsive: true,
      legend:{
        position:'bottom'
      }
    };
  }

  public chartHovered(e: any): void {}

  public RefreshChartData(selectedBRM:any)
  {
    this.billableData=[];
    this.billableData.push(selectedBRM.NBillCOunt);
    this.billableData.push(selectedBRM.BillCount);
    this.chartLabels=["Non Billable Count","Billable Count"];
    this.loadPieChart();
  }

  public LoadAccountWiseChart()
  {
    this.ngOnInit();
  }
}
