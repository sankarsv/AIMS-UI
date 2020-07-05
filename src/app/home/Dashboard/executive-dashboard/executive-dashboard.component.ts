import {
  Component,
  OnInit,
} from "@angular/core";
import { httpService } from "../../../../services/httpService";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/map";
import { DashBoardDataMapper } from "./DashBoardDataMapper";

@Component({
  selector: "app-executive-dashboard",
  templateUrl: "./executive-dashboard.component.html",
  styleUrls: ["./executive-dashboard.component.css"],
})
export class ExecutiveDashboardComponent implements OnInit {
  DisplayBRMData: boolean = false;
  HasDataLoaded: Boolean = false;
  selectedBRM: string;
  dashBoardType: any;
  colorScheme = {
    domain: ['#66CDAA', '#87CEEB', '#20B2AA', '#E9967A', '#DB7093', '#DC143C', '#FF69B4', '#FFA500', '#FF4500', '#FF0000']
  };
  constructor(
    public httpService: httpService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dashBoardMapper: DashBoardDataMapper) { }

  ngOnInit() {
    this.dashBoardType = 'Accountwise DashBoard';
    this.dashBoardMapper.MapDashBoardData();
    this.dashBoardMapper.OnDataInitialized.subscribe(() => {
      this.HasDataLoaded = true;
      this.locationChartLabels = this.dashBoardMapper.LocationWiseDetails.Keys();
      this.loadLocationWiseChart();
    });
  }
  public locationChartOptions: any;
  public locationChartLabels: any;
  loadLocationWiseChart() {
    this.locationChartOptions = {
      title: {
        text: 'LocationWise',
        display: true
      },
      responsive: true,
      legend: {
        position: 'bottom'
      }
    };
  }


  LoadAccountWiseDetailsChart() {
    this.locationChartLabels = this.dashBoardMapper.LocationWiseDetails.Keys();
    this.dashBoardMapper.LoadAccountWiseDetails();
  }


  public chartHovered(event): void { }

  onSelect(event) {
    console.log(event);
    if (!this.DisplayBRMData) {
      this.DisplayBRMData=true;
      this.dashBoardMapper.LoadBRMList();
      if(event.series!=null)
      this.selectedBRM = event.series;
      else if(event.label!=null)
      this.selectedBRM = event.label;
      this.LoadBRMWiseDetails();
    }
  }

    LoadBRMWiseDetails()
    {
      this.locationChartLabels = [this.selectedBRM];
      this.dashBoardMapper.LoadBRMWiseLocationData(this.selectedBRM);
      this.dashBoardMapper.LoadBrmWiseDetails(this.selectedBRM);
    }
}
