import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Dictionary } from "app/utils/Dictionary";

import { ChartsModule } from "ng2-charts";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-brm-barchart",
  templateUrl: "./brm-barchart.component.html",
  styleUrls: ["./brm-barchart.component.css"],
})
export class BrmBarchartComponent implements OnInit {
  @Input() public HCData: Dictionary<any>;
  // @Output() selected_brmName = new EventEmitter<string>();
  @Output() messageToEmit = new EventEmitter<string>();

  public activeElement: string;
  public brmName: any[] = [];
  public offshoreHC: any[] = [];
  public onshoreHC: any[] = [];
  public mbarChartLabels: string[];
  public barChartData: any[];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    onClick: function (evt, array) {
      if (array.length != 0) {
        var position = array[0]._index;
        //var activeElement = this.tooltip._data.datasets[0].data[position];
        this.activeElement = this.tooltip._data.labels[position];
        //this.sendMessageToParent(this.activeElement);
        console.log("hllo " + this.activeElement);
        if (this.activeElement != null) {
          console.log("inside");
          this.messageToEmit.emit(this.activeElement);
        }

        //this.getSelectedBrmName(this.activeElement);
        //this.getSelectedName();
        // this.getSelectedName(this.tooltip._data.labels[position]);
        // this.selected_brmName.emit(this.tooltip._data.labels[position]);
      } else {
        console.log("You selected the background!");
      }
    },
  };

  sendMessageToParent(message: string) {
    //message = "Hello";
    this.messageToEmit.emit(message);
  }

  // selectedGetBrmNames(selected: string) {
  //   console.log(selected);
  //   this.selected_brmName.emit(selected);
  // }

  // getSelectedName(selected: string) {
  //   console.log(selected);
  //   this.selected_brmName.emit(this.activeElement);
  // }

  constructor() {}

  ngOnInit() {
    if (this.HCData != null) {
      console.log("inside load chart method-onit");
      //this.loadChart();
      this.mbarChartLabels = this.getBrmNames();
      this.barChartData = [
        { data: this.getOffshoreData(), label: "Offshore" },
        { data: this.getOnshoreData(), label: "Onshore" },
      ];
      console.log("this.mbarChartLabels");
    }
  }
  getBrmNames(): string[] {
    this.HCData.Values().forEach((key: any) => {
      this.brmName.push(key.BRMName);
    });
    return this.brmName;
  }
  getOffshoreData(): any[] {
    this.HCData.Values().forEach((key: any) => {
      this.offshoreHC.push(key.OffTotal);
    });
    return this.offshoreHC;
  }
  getOnshoreData(): any[] {
    this.HCData.Values().forEach((key: any) => {
      this.onshoreHC.push(key.OnShoreTotal);
    });
    return this.onshoreHC;
  }

  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: "rgba(105,159,177,0.2)",
      borderColor: "rgba(105,159,177,1)",
      pointBackgroundColor: "rgba(105,159,177,1)",
      pointBorderColor: "#fafafa",
      pointHoverBackgroundColor: "#fafafa",
      pointHoverBorderColor: "rgba(105,159,177)",
    },
    {
      backgroundColor: "rgba(77,20,96,0.3)",
      borderColor: "rgba(77,20,96,1)",
      pointBackgroundColor: "rgba(77,20,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,20,96,1)",
    },
  ];

  // events
  public chartClicked(e: any, arr) {
    //console.log("printing");
    //console.log(e);
    console.log(e[0]._model);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
