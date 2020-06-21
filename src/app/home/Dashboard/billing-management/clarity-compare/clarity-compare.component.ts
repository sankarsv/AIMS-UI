import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Injectable } from '@angular/core';
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
export class ClarityCompareComponent implements OnInit , AfterViewInit  {
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
  month: {};
  @ViewChild('table') table;
  months = {
    'JANUARY' : '01','FEBRUARY' : '02','MARCH' : '03','APRIL' : '04','MAY' : '05','JUNE' : '06','JULY' : '07','AUGUST' : '08','SEPTEMBER' : '09','OCTOBER' : '10','NOVEMBER' : '11','DECEMBER' : '12'
};
  // @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
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
         BRMName: brmDetail ["brmName"],
         BRMId: brmDetail ["brmId"]
        };
        this.BRMList.Add(brmDetalLocal.BRMName,brmDetalLocal);
        this.BrmNamesList =this.BRMList.Keys();
      })
  });
  }

  searchByInput(brmName:string,yearValue:string)
{
  
  this.initSetting();
 var brmID =this.BRMList.Item(brmName).BRMId;
 var monthName= yearValue.split(" ")[0];
 var yearName= yearValue.split(" ")[1]; 
 monthName = monthName.toUpperCase();
 monthName = this.months[monthName];

 var url = APP_CONSTANTS.URL[environment.type].GetBillingDiscrepancy +'/'+monthName+'/'+yearName+'/'+brmID
// this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].GetBillingDiscrepancy,{month:monthName,year:yearName,brmName:name}).then((res:any)=>{

  this.httpService.httpGet(url).then((res:any)=>{
    this.UnderBRMBillingDetailsList = new Dictionary<any>();
    res.map((brmDetail: { [x: string]: any; })=>{      
      let brmDetalLocal =  {
        dm: brmDetail ["dm"],
        location: brmDetail["location"],
        projectName: brmDetail ["projectName"],
        employeeId: brmDetail ["employeeId"],
        empname: brmDetail ["employeeName"],
        rateWithoutTax: brmDetail ["rateWithoutTax"],
        accruedHours: brmDetail ["accruedHours"],
        clarityHours: brmDetail ["clarityHours"],
        difference: brmDetail ["difference"],
        currentInvoiceHours: brmDetail ["currentInvoiceHours"],
        remarks: brmDetail ["remarks"],
        cleanupComments: brmDetail ["cleanupComments"],
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.empname,brmDetalLocal); 
      this.data= this.UnderBRMBillingDetailsList.Values();
     
    })
    this.initSetting();
});

}
 ExportToExcel(brmName:string,yearValue:string)
 {
  var brmID =this.BRMList.Item(brmName).BRMId;
  var monthName= yearValue.split(" ")[0];
  var yearName= yearValue.split(" ")[1]; 
  monthName = monthName.toUpperCase();
  monthName = this.months[monthName];
 
  var url = APP_CONSTANTS.URL[environment.type].GetBillingDiscrepancy +'/'+monthName+'/'+yearName+'/'+brmID
  this.httpService.httpGet(url).then((res:any)=> {
    if (!res) {
      alert("Error in downloading the report");
    }
    else{

      const blob = new Blob([res.blob()], { type : 'application/vnd.ms.excel' });
      window['saveAs'](blob, 'ClarityCompare.xlsx');
      var fileName = localStorage.getItem('filename');
      if(!fileName) {
        fileName = "ClarityCompare.xlsx";
        localStorage.removeItem('filename');
      }
     ;
    }
  });

 } 
ngAfterViewInit() {
  console.log('Values on ngAfterViewInit():');
  console.log("title:", this.table.nativeElement);
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
      dm: {
        title: 'DM'
      },
      location: {
        title: 'Location'
      },
      ProjectName: {
        title: 'projectName'
      },
      employeeId: {
        title: 'EmployeeID',
      },
      empname: {
        title: 'EmpName'
      },
      rateWithoutTax: {
        title: 'RateWithoutTax'
      },
      accruedHours: {
        title: 'AccruedHours'
      },
      clarityHours: {
        title: 'ClarityHours'
      },
      difference: {
        title: 'Difference'
      },
      currentInvoiceHours: {
        title: 'CurInvoiceHours'
      },
      remarks: {
        title: 'Remarks'
      },
      cleanupComments: {
        title: 'CleanupComments'
      },
  },
  attr: {
    class: 'table table-bordered'
  },
  rowClassFunction: (row) => {
    console.log("row.data.userID:: " + row.data.clarityDaysBilled);
    if (row.data.clarityHours !== row.data.accruedHours) {
      return 'aborted';    
    } else{
      return 'solved';
    } 
  }

}
     

}
populateTableHeader() {

  this.headerTitle= {
  "DM":"dm",
  "location":"Location",
  "projectName":"ProjectName",
  "EmployeeID":"EmployeeID",
  "EmpName":"employeeName",
  "RateWithoutTax":"rateWithoutTax",
  "AccruedHours":"accruedHours",
  "clarityHours": "ClarityHours",
  "difference": "Difference",
  "currentInvoiceHours": "CurInvoiceHours",
  "remarks": "Remarks",
  "cleanupComments": "CleanupComments"

  }
  
  }

}
