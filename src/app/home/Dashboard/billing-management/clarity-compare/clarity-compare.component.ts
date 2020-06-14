import { Component, OnInit } from '@angular/core';
import { Dictionary } from 'app/utils/Dictionary';
import { httpService } from '../../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clarity-compare',
  templateUrl: './clarity-compare.component.html',
  styleUrls: ['./clarity-compare.component.css']
})
export class ClarityCompareComponent implements OnInit {
  searchBy: String;
  showTable: boolean = false;
  searchString: String;
  YearsList:[];
  BRMList:Dictionary<any>;
  settings: any;
  BrmNamesList:string[];
  UnderBRMBillingDetailsList:Dictionary<any>;
  data:any;
  headerTitle: {};
  constructor(public httpService: httpService,public router:Router) { }

  ngOnInit() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].YearValues).then((res:any)=>{
      this.YearsList = res.map(yearname=>{
        return yearname["MonthYearName"];
      });     
    });

  this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].BRMDetailsList).then((res:any)=>{
      this.BRMList = new Dictionary<any>();
      res.map((brmDetail: { [x: string]: any; })=>{
        let brmDetalLocal =  {
         BRMName: brmDetail ["brmName"]
        };
        this.BRMList.Add(brmDetalLocal.BRMName,brmDetalLocal);
        this.BrmNamesList =this.BRMList.Keys();
      })
  });
  }
  searchByInput(brmName:string,yearValue:string)
{
  this.initSetting();
 var monthName= yearValue.split(" ")[0];
 var yearName= yearValue.split(" ")[1];
  var name =brmName;
  this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].GetBillingDiscrepancy,{month:monthName,year:yearName,brmName:name}).then((res:any)=>{
    this.UnderBRMBillingDetailsList = new Dictionary<any>();
    res.map((brmDetail: { [x: string]: any; })=>{      
      let brmDetalLocal =  {
        empname: brmDetail ["empName"],
        officeid: brmDetail["officeId"],
        stoname: brmDetail ["stoName"],
        clarityDaysBilled: brmDetail ["clarityDaysBilled"],
        clarityHoursBillable: brmDetail ["clarityHoursBillable"],
        tsBillRate: brmDetail ["tsBillRate"],
        clarityBillRate: brmDetail ["clarityBillRate"],
        tsBilledAmt: brmDetail ["tsBilledAmt"],
        clarityBilledAmt: brmDetail ["clarityBilledAmt"],
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.empname,brmDetalLocal); 
      this.data= this.UnderBRMBillingDetailsList.Values();
     
    })
    this.initSetting();
});

}
initSetting() {
  //this.populateTableHeader();
  this.searchBy = 'All';
  this.searchString = "";
  this.showTable = true;
  
  this.settings = {
    mode: 'inline',
   // selectMode:'multi',
   actions: {
    add: false,
    edit: false,
    delete: false
    },
    columns: {
      empname: {
        title: 'EmpName'
      },
      officeid: {
        title: 'OfficeId'
      },
      stoname: {
        title: 'STOName'
      },
      clarityDaysBilled: {
        title: 'Days Billable Billing',
      },
      clarityHoursBillable: {
        title: 'Days Billable Clarity',
      },
      tsBillRate: {
        title: 'Bill Rate Billing'
      },
      clarityBillRate: {
        title: 'Bill Rate Clarity'
      },
      tsBilledAmt: {
        title: 'Bill Amount Billling'
      },
      clarityBilledAmt: {
        title: 'Bill Amount Clarity'
      },
  },
  attr: {
    class: 'table table-bordered'
  },
  rowClassFunction: (row) => {
    console.log("row.data.userID:: " + row.data.clarityDaysBilled);
    if (row.data.clarityDaysBilled !== row.data.clarityHoursBillable || row.data.tsBilledAmt !== row.data.clarityBilledAmt) {
      return 'aborted';    
    } else{
      return 'solved';
    } 
  }

}
     

}
populateTableHeader() {

  this.headerTitle= {
  "Empname":"empName",
  "officeID":"officeId",
  "STOName":"stoName",
  "Days Billable Billing":"clarityDaysBilled",
  "Days Billable Clarity":"clarityHoursBillable",
  "Bill Rate Billing":"tsBillRate",
  "Bill Rate Clarity":"clarityBillRate",
  "Bill Amount Billling":"tsBilledAmt",
  "Bill Amount Clarity": "clarityBilledAmt"  
  }
  
  }

}
