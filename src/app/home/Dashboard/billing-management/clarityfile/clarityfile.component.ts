import { Dictionary } from 'app/utils/Dictionary';
import { Component, OnInit } from '@angular/core';
import { httpService } from '../../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clarityfile',
  templateUrl: './clarityfile.component.html',
  styleUrls: ['./clarityfile.component.css']
})
export class ClarityfileComponent implements OnInit {
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
  constructor(public httpService: httpService,public router:Router ) { }

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
  this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].GetClarityFile,{month:monthName,year:yearName,brmName:name}).then((res:any)=>{
    this.UnderBRMBillingDetailsList = new Dictionary<any>();
    res.map((brmDetail: { [x: string]: any; })=>{      
      let brmDetalLocal =  {
        empname: brmDetail ["empName"],
        officeid: brmDetail["officeId"],
        stoname: brmDetail ["stoName"],
        daysbillable: brmDetail ["daysBillable"],
        hrsbillable: brmDetail ["hoursBillable"],
       billrate: brmDetail ["billRate"],
       billamt: brmDetail ["billedAmount"],
       remarks: brmDetail ["remarks"],
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
      // checkbox:{
      //   title:'Select',
      //   type:"html",
      //   editor:{
      //     type:'label',
      //   },
      //   valuePrepareFunctioPostDetailsn:(value)=>{return this._sanitizer.bypassSecurityTrustHtml(this.input);},
      //   filter:false
      // },
      empname: {
        title: 'empName'
      },
      officeid: {
        title: 'officeId'
      },
      stoname: {
        title: 'stoName'
      },
      daysbillable: {
        title: 'daysBillable'
      },
      hrsbillable: {
        title: 'hoursBillable',
      },
      billrate: {
        title: 'billRate'
      },
      billamt: {
        title: 'billedAmount'
      },
      remarks: {
        title: 'remarks'
      },
      
  }
}
}
populateTableHeader() {

  this.headerTitle= {
  "Empname":"empName",
  "officeID":"officeId",
  "STOName":"stoName",
  "Days Billable":"daysBillable",
  "Hrs Billable":"hoursBillable",
  "Bill Rate":"billRate",
  "Billed Amount":"billedAmount",
  "Remarks":"remarks"  
  }
  
  }

}
