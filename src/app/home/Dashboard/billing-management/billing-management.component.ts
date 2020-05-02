import { Component, OnInit } from '@angular/core';
import { httpService } from '../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { Dictionary } from 'app/utils/Dictionary';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-billing-management',
  templateUrl: './billing-management.component.html',
  styleUrls: ['./billing-management.component.css']
})
export class BillingManagementComponent implements OnInit {
  searchBy: String;
  showTable: boolean = false;
  searchString: String;
  settings: any;
  data:any;
  input:string='<input type="checkbox"></input>';
BRMList:Dictionary<any>;
UnderBRMBillingDetailsList:Dictionary<any>;
YearsList:[];
BrmNamesList:string[];
  constructor(public httpService: httpService,private _sanitizer:DomSanitizer) { }

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
         BRMNumber: brmDetail["brmId"],
        };
        this.BRMList.Add(brmDetalLocal.BRMName,brmDetalLocal);
        this.BrmNamesList =this.BRMList.Keys();
      })
  });
  
}
searchByInput(brmName:string,yearValue:string)
{
 var monthName= yearValue.split(" ")[0];
 var yearName= yearValue.split(" ")[1];
  var brmID =this.BRMList.Item(brmName).BRMNumber;
  this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].BillingManagment,{month:monthName,year:yearName,brmID:brmID}).then((res:any)=>{
    this.UnderBRMBillingDetailsList = new Dictionary<any>();
    res.map((brmDetail: { [x: string]: any; })=>{
      let brmDetalLocal =  {
        version: brmDetail ["version"],
        location: brmDetail["locationId"],
        projectNo: brmDetail ["projectId"],
        empNo: brmDetail ["empId"],
        empFullName: brmDetail ["empName"],
       billablehrs: brmDetail ["billableHrs"],
       billabledays: brmDetail ["billableDays"],
       efforthr: brmDetail ["effortHrs"],
       extrahr: brmDetail ["extraHrs"],
       extrabiling: brmDetail ["extraBilling"],
       billableamt: brmDetail ["billingAmount"],
       remarks: brmDetail ["remarks"],
       DMId: brmDetail ["dmId"],
       DMName: brmDetail ["dmName"],
       WONNumber: brmDetail ["wonNumber"],
       STOName: brmDetail ["stoName"],
       OfficeID: brmDetail ["officeId"],
       BRMID: brmDetail ["brmId"],
       BRMName: brmDetail ["brmName"]
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.BRMName,brmDetalLocal); 
      this.data= this.UnderBRMBillingDetailsList.Values()    ;
    })
    this.initSetting();
});

}
  initSetting() {
    this.searchBy = 'All';
    this.searchString = "";
    this.showTable = true;
    this.settings = {
      selectionMode:'multi',
      actions: {
        add: false,
        edit: true,
        delete: false,
custom:[{ name: 'Edit', title: `<img src="../../../assets/images/editnew.png">` }],
        position: 'right'
      },
      columns: {
        checkbox:{
          title:'Select',
          type:"html",
          valuePrepareFunction:(value)=>{return this._sanitizer.bypassSecurityTrustHtml(this.input);},
          filter:false
        },
        location: {
          title: 'Location'
        },
        projectNo: {
          title: 'Project No'
        },
        empNo: {
          title: 'Employee No'
        },
        empFullName: {
          title: 'Employee Name'
        },
        billablehrs: {
          title: 'Billable Hours'
        },
        billabledays: {
          title: 'Billable Days'
        },
        efforthr: {
          title: 'Effort Hours'
        },
        extrahr: {
          title: 'Extra Hours'
        },
        extrabiling: {
          title: 'Extra Billing'
        },
        billableamt: {
          title: 'Billable Amount'
        },
        remarks: {
          title: 'Remarks'
        }
      },
    };
  }

}






