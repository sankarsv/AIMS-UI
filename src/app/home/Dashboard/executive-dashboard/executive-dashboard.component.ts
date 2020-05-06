import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import * as Chart from 'chart.js';
import { progressbar } from '../../../Roles/constants';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { forkJoin } from 'rxjs';
import { httpService } from '../../../../services/httpService';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { element } from '@angular/core/src/render3/instructions';
import 'rxjs/add/operator/map';
import { Dictionary } from 'app/utils/Dictionary';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.css'],

})

export class ExecutiveDashboardComponent implements OnInit {
  yearsList:number[];
  dashBoardDetails: any[];
  BillingDetails: Dictionary<any>;
  SRJrRatios: Dictionary<any>;
  HeadCounts: Dictionary<any>;
  TraineeDetails: Dictionary<any>;
  BACounts: Dictionary<any>;
  constructor(public httpService: httpService, public router: Router, public activatedRoute: ActivatedRoute,private renderer:Renderer,
    private http:HttpClient) {}

  ngOnInit() {}


  fetchYearlyDetails(year:string,month:string,brmName:string)
  {
    forkJoin([
      this.httpService.PostDetails("billing.json",{ reportType:"billable",year:year,momth:month,bramName:brmName}),
      this.httpService.PostDetails("SeniorJuniorRatio.json",{ reportType:"srjrratio",year:year,momth:month,brmName:brmName}),
      this.httpService.PostDetails("HeadCount.json",{ reportType:"hcratio",year:year,momth:month,brmName:brmName}),
      this.httpService.PostDetails("Trainee.json",{ reportType:"trnratio",year:year,momth:month,brmName:brmName}),
      this.httpService.PostDetails("BACount.json",{ reportType:"baratio",year:year,momth:month,brmName:brmName})
  ]).subscribe(res=>
    {
      this.dashBoardDetails=res;
      this.initializeView();
    });
  }
initializeView()                          
{
    if (this.dashBoardDetails[0] !=null && this.dashBoardDetails[1] !=null
      && this.dashBoardDetails[2] !=null&& this.dashBoardDetails[3] !=null&&
      this.dashBoardDetails[3] !=null) 
    {
      this.FillBillingDetails(this.dashBoardDetails[0]);
      this.FillSeniorJuniorRatio(this.dashBoardDetails[1])
      this.FillHeadCounts(this.dashBoardDetails[2]);
      this.FillTraineeDetails(this.dashBoardDetails[3]);
      this.FillBACount(this.dashBoardDetails[4]);;
    }
    else {
      alert("Session Expired!");
      this.router.navigate(['/']);
    }
  }

  FillBillingDetails(billingDetails:any)
  {
    this.BillingDetails = new Dictionary<any>();
     billingDetails.map((billingDetail)=>{
       let billingDetailsLocal =  {
        BRMName: billingDetail ["brmName"],
        BillCount: billingDetail["billableCountTot"],
        NBillCOunt: billingDetail["nbCountTot"],
        BillPerc: billingDetail["billableCountPerc"],
        NBillPerc:billingDetail["nbCountPerc"],
        OnBillCOunt: billingDetail["onbillableCount"],
        OffBillCount:billingDetail["offbillabeCount"],
        OnBillPerc:billingDetail["onbillabePerc"],
        OfBillPerc:billingDetail["ofbillabePerc"]
       };
       this.BillingDetails.Add(billingDetailsLocal.BRMName,billingDetailsLocal);
   });
 }

 FillSeniorJuniorRatio(srjrRatios:any)
  {
    this.SRJrRatios = new Dictionary<any>();
     srjrRatios.map((srjrRatio)=>{
      let srjrRatioLocal ={
        BRMName: srjrRatio ["brmName"],
        SrCount: srjrRatio["srCountTot"],
        JrCount: srjrRatio["jrCountTot"],
        SrCountPerc: srjrRatio["srCountPerc"],
        JrCountPerc:srjrRatio["jrCountPerc"],
        OnSrCountTot: srjrRatio["onsrCountTot"],
        OnJrCountTot:srjrRatio["onjrCountTot"],
        OffSrCountPerc:srjrRatio["offsrCountPerc"],
        OffJrCountPerc:srjrRatio["offjrCountPerc"]
       };
       this.SRJrRatios.Add(srjrRatioLocal.BRMName,srjrRatioLocal);
   });
 }

 FillHeadCounts(headCounts:any)
  {
    this.HeadCounts = new Dictionary<any>();
      headCounts.map((headCount)=>{
        let headCountLocal = {
        BRMName: headCount ["brmName"],
        OffTotal: headCount ["offTot"],
        TotalCOunt:headCount["totalCnt"],
        OnShoreTotal: headCount["onsiteTot"],
        OffPerc: headCount["offPerc"],
        OnshorePerc: headCount["onsitePerc"],
       };
       this.HeadCounts.Add(headCountLocal.BRMName,headCountLocal);
   });
 }

 FillTraineeDetails(traineeDetails:any)
 {
  this.TraineeDetails = new Dictionary<any>();
  traineeDetails.map((traineeDetail)=>{
      let traineeDetailLocal = {
        BRMName: traineeDetail ["brmName"],
       TraineeCountTotal: traineeDetail ["trCountTot"],
       TraineeCountPer: traineeDetail["trCountPerc"],
       OnTraineeCount: traineeDetail["ontrCountTot"],
       OnShoreTraineePerc: traineeDetail["ontrCountPerc"],
       OffShoreTraineeCount: traineeDetail["offtrCountTot"],
       OffShoreTraineePerc: traineeDetail["offtrCountPerc"],
      };
     this.TraineeDetails.Add(traineeDetailLocal.BRMName,traineeDetailLocal) ;
  }
  );
}
FillBACount(baCounts:any)
 {
  this.BACounts = new Dictionary<any>();
  baCounts.map((baCount)=>{
      let baCountLocal = {
        BRMName: baCount ["brmName"],
       BACountTotal: baCount ["baCountTot"],
       BACountPerc: baCount["baCountPerc"],
       BACountTotalOn: baCount ["baCountTotOn"],
       BACountTotalOff: baCount["baCountTotOff"],
       BACountPercOn: baCount ["baCountPerOn"],
       BACountPercOff: baCount["baCountPerOff"],
      };
     this.BACounts.Add(baCountLocal.BRMName,baCountLocal) ;
  }
  );
}
}


