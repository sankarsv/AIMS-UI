import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { httpService } from '../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { Dictionary } from 'app/utils/Dictionary';
import { DomSanitizer } from '@angular/platform-browser';
import { FileQueueObject, FileUploaderService } from '../../../home/Employee/employee-head/upload/file-uploader.service';

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
  fileUpload: boolean;
  uploadMessage: string;
  versionId:string;
  freezeInd:boolean = false;
  btnFreezeText: string;
  @ViewChild('fileInput') fileInput;
  @Output() onCompleteItem = new EventEmitter();
  @Output() onUploadFailed = new EventEmitter();

  constructor(public httpService: httpService,private _sanitizer:DomSanitizer, public uploader: FileUploaderService) { }

  ngOnInit() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].YearValues).then((res:any)=>{
      this.YearsList = res.map(yearname=>{
        return yearname["MonthYearName"];
      });     
    });
    this.btnFreezeText ="UnFreeze";

    // this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].GetFreeze).then((res:any)=>{
    //   this.YearsList = res.map(yearname=>{
    //     return yearname["MonthYearName"];
    //   });
    // });
  this.uploader.onCompleteItem = this.completeItem;
  this.uploader.onUploadFailed = this.uploadFailed;
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
upload(){
  this.fileInput.nativeElement.click();
}
uplodFile() {
  const fileBrowser = this.fileInput.nativeElement;  
  this.uploader.addToQueue(fileBrowser.files, APP_CONSTANTS.URL[environment.type].BillingUpload);
  this.uploader.uploadAll();
}
download(brmName:string, yearValue:string) {  
  var brmID =this.BRMList.Item(brmName).BRMNumber;
  var monthName= yearValue.split(" ")[0];
  var yearName= yearValue.split(" ")[1];
  var data = {month:monthName, year:yearName, brmID:brmID, versionId: this.versionId };
  console.log(data);
  this.httpService.downloadFile(APP_CONSTANTS.URL[environment.type].DownloadBillingFile, data ).then(result => {
    if (!result) {
      alert("Error in downloading the report");
    }    
  });

}
completeItem = (item: FileQueueObject, response: any) => {
  this.fileUpload = true;  
  this.uploadMessage = "File uploaded successfully";  
  this.onCompleteItem.emit({ item, response });
}

uploadFailed = (item: FileQueueObject, response: any) => {
  this.fileUpload = false;
  this.uploadMessage = "File upload failed";
  this.onUploadFailed.emit({ item, response });
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
       BRMName: brmDetail ["brmName"],
       freezeInd: brmDetail ["freezeInd"]
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.BRMName,brmDetalLocal); 
      this.data= this.UnderBRMBillingDetailsList.Values();
     
    })
    if(this.data.length >0){
      this.versionId = this.data[0].version;      
      this.freezeInd = (this.data[0].freezeInd == "Y");      
    }

    this.initSetting();
});

}
  initSetting() {
    this.searchBy = 'All';
    this.searchString = "";
    this.showTable = true;
    this.settings = {
      mode: 'inline',
      selectionMode:'multi',
      edit: {confirmSave: true},
      actions: {
        add: false,
        edit:true,
        update: true,
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
    if(this.freezeInd) {
      this.freezeSettings();
    }
  }

  freezeSettings() {    
    this.settings.selectionMode = null;
    delete this.settings.columns["checkbox"];    
    this.settings.actions = null;
    this.btnFreezeText ="Freeze";
  }

  onDeleteConfirm(event) {
    alert();

  }
  onSaveConfirm(event) {
    var data ={
      version: this.versionId,
      billingDetailsList:[]
    };
    var employee ={
      empId:event.newData["empNo"],
      billableHrs:event.newData["billablehrs"],
      billableDays:event.newData["billabledays"],      
      effortHrs: event.newData["efforthr"],
      extraBilling:event.newData["extrabiling"],
      billingAmount: event.newData["billableamt"],
      remarks:event.newData["remarks"]
    }
   data.billingDetailsList.push(employee);
   alert(JSON.stringify(data));
   
    this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].UpdateBillingDetails, data).then(result =>{      
        alert("Saved Successfully");      
    });
   
    
  }

}







