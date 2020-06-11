import { Component, OnInit} from "@angular/core";
import { ExecutiveDashboardComponent } from "../../executive-dashboard.component";

@Component({
  selector: "app-billable-piechart",
  templateUrl: "./billable-piechart.component.html",
  styleUrls: ["./billable-piechart.component.css"],
})
export class BillablePiechartComponent implements OnInit {
  public billableData: any[]=[];
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions;
  constructor(public executive:ExecutiveDashboardComponent) {}

  ngOnInit() {
    if (this.executive.BillingDetails != null) {
      this.executive.BillingDetails.Values().forEach((key: any) => {
        this.billableData.push(key.NBillCOunt+key.BillCount);
      });
      this.loadPieChart();
    }
  }

  loadPieChart() {
    this.chartType = "pie";
    this.chartDatasets = [
      {
        data: this.billableData,
        backgroundColor: this.executive.ColorValues,
        hoverBackgroundColor: this.executive.ColorValues,
        label: this.executive.BillingDetails.Keys(),
        totalData:this.executive.BillingDetails
      },
    ];
    this.chartLabels = this.executive.BillingDetails.Keys();
    this.chartOptions = {
      title:{
        text:'Billable and NonBillable Details',
        display:true
      },
      responsive: true,
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
              var label:string = "";
              let dataValue:string =data.datasets[tooltipItem.datasetIndex]._meta[4].controller.chart.active[0]._model.label;
              if(data.datasets[tooltipItem.datasetIndex].totalData.ContainsKey(dataValue))
              {
                let billlabel="Billable Count: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(dataValue).BillCount;
                let nonbilllabel=" Non Billable Count: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(dataValue).NBillCOunt;
                let onbilllabel=" OnShore Billable Count: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(dataValue).OnBillCOunt;
                let offbilllabel=" Offshore Billable Count: "+data.datasets[tooltipItem.datasetIndex].totalData.Item(dataValue).OffBillCount;
                return [billlabel,nonbilllabel,onbilllabel,offbilllabel];
              }
              return label;
            }
            }
          }
    };
  }

  public chartHovered(e: any): void {}
}
