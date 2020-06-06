import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { httpService } from '../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { Router } from '@angular/router';
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
  selectedRows:number[]=[];
  pushrow:[];
  fileUpload: boolean;
  uploadMessage: string;
  versionId:string;
  freezeInd:boolean = false;
  btnFreezeText: string;
  headerTitle: {};
  FiltersValues = ["BRMName","Other","All"];
  @ViewChild('fileInput') fileInput;
  @ViewChild('table') table;
  @Output() onCompleteItem = new EventEmitter();
  @Output() onUploadFailed = new EventEmitter();

  constructor(public httpService: httpService, public router:Router, private _sanitizer:DomSanitizer, public uploader: FileUploaderService) { }

  ngOnInit() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].YearValues).then((res:any)=>{
      this.YearsList = res.map(yearname=>{
        return yearname["MonthYearName"];
      });     
    });
    this.btnFreezeText ="Freeze";

  this.uploader.onCompleteItem = this.completeItem;
  this.uploader.onUploadFailed = this.uploadFailed;
  this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].BRMDetailsList).then((res:any)=>{
      this.BRMList = new Dictionary<any>();
      res.map((brmDetail: { [x: string]: any; })=>{
        let brmDetalLocal =  {
         BRMName: brmDetail ["brmName"],
         BRMId:brmDetail["brmId"]
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
  var data = {month:monthName, year:yearName, brmID:brmID, version: this.versionId };
  console.log(data);
  this.httpService.downloadFile(APP_CONSTANTS.URL[environment.type].DownloadBillingFile, data ).then(result => {
    if (!result) {
      alert("Error in downloading the report");
    } else{

      //let excelData = result.data();
      //const downloadExcel = new Blob([(result)] , {type:'application/vnd.ms-excel'});
      var downloadUrl = window.URL.createObjectURL(result);
      var link = document.createElement('a');
      link.href = downloadUrl;
      var fileName = localStorage.getItem('filename');
      if(!fileName) {
        fileName = "BaseLineReport.xlsx";
        localStorage.removeItem('filename');
      }
      link.download = fileName;
      link.click();
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
  this.uploadMessage = "File uploaded successfully";
  this.onUploadFailed.emit({ item, response });
}

searchByInput(Location:string,filterValue:string,brmName:string,yearValue:string)
{
var displayTable =(filterValue=="BRMName"&&brmName!=null&&Location!=null)||filterValue=="Other"||filterValue=="All";
  
  if(displayTable)
  {
  var brmID:any;
  if(brmName!=null&&this.BRMList.ContainsKey(brmName))
  {
    brmID=this.BRMList.Item(brmName).BRMId;
  }
  
  let requestBody = {
    month: yearValue.split(" ")[0],
    year:yearValue.split(" ")[1],
    brmId:brmID,
filterby:filterValue
  };
 var monthName= yearValue.split(" ")[0];
 var yearName= yearValue.split(" ")[1];
  var name =brmName;
  this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].BillingManagment,{month:monthName,year:yearName,brmName:name}).then((res:any)=>{
    this.UnderBRMBillingDetailsList = new Dictionary<any>();
    res.map((brmDetail: { [x: string]: any; })=>{      
      let brmDetalLocal =  {
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
       remarks1: brmDetail ["remarks1"],
       remarks2: brmDetail ["remarks2"],
       DMId: brmDetail ["dmId"],
       DMName: brmDetail ["dmName"],
       WONNumber: brmDetail ["wonNumber"],
       STOName: brmDetail ["stoName"],
       OfficeID: brmDetail ["officeId"],
       BRMId:brmDetail["brmId"],
       BRMName: brmDetail ["brmName"],
       freezeInd: brmDetail ["freezeInd"]
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.empNo,brmDetalLocal); 
      this.data= this.UnderBRMBillingDetailsList.Values();
     
    })
    if(this.data.length >0){
      this.versionId = this.data[0].version;      
      this.freezeInd = (this.data[0].freezeInd == "Y");
      if(this.freezeInd) this.btnFreezeText = "UnFreeze" 
      else {
        this.btnFreezeText = "Freeze"
      }
    }
    this.showTable = displayTable;

    this.initSetting(filterValue == "Other");
});
  }
}

populateTableHeader() {

this.headerTitle= {
"Location":"location",
"Project No":"projectNo",
"Employee No":"empNo",
"Employee Name":"empFullName",
"BRM":"BRMName",
"Billable Hrs":"billablehrs",
"Billable Days":"billabledays",
"Effort Hours":"efforthr",
"Extra Hours":"extrahr",
"Extra Billing":"extrabiling",
"Billable Amount":"billableamt:",
"Remark 1":"remarks1",
"Remark 2":"remarks2"
}

}

getTableColumnName(HeaderName){
  return this.headerTitle[HeaderName];
}

  initSetting(editEnable:boolean) {
    this.populateTableHeader();
    this.searchBy = 'All';
    this.searchString = "";
    var customString :any;
    if(editEnable)
     customString = [{ name: 'Edit', title: `<img src="../../../assets/images/editnew.png">`, }]
    this.settings = {
      mode: 'inline',
      selectMode:'multi',
      edit: {confirmSave: editEnable},
      actions: {
        add: false,
        edit: editEnable,
        update: false,
        delete: false,
        custom:customString,
        position: 'right'
      },
      columns: {
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
        BRMName: {
          title:'BRM'
        },
        billablehrs: {
          title: 'Billable Hrs',
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
        remarks1: {
          title: 'Remark 1'
        },
        remarks2: {
          title: 'Remark 2'
        },
      },
      attr: {
        class: 'table table-bordered'
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
    this.btnFreezeText ="UnFreeze";
  }


  onDeleteConfirm(event) {
    alert();

  }
  public change(event) {
    let value = event.srcElement.value
    console.log(value)
     let column:number = Number (this.table.grid.dataSet.selectedRow.index)
     var row =this.table.grid.dataSet.data[this.table.grid.dataSet.selectedRow.index];
     row[this.getTableColumnName(event.srcElement.placeholder)] = event.srcElement.value
      this.selectedRows.push(column);
  }
  reset(){

    var data ={
      version: this.versionId,
      billingDetailsList:[]
    };
   for(var i=0; i<this.selectedRows.length; i++)
   {
     let selectedIx: any =this.selectedRows[i];
      if(this.table.grid.dataSet.rows[selectedIx].isSelected) {
        let selectedData: any = this.table.grid.dataSet.rows[selectedIx];
        var employee ={
          empId:selectedData.data.empNo,
          billableHrs:selectedData.data.billablehrs,
          billableDays:selectedData.data.billabledays,      
          effortHrs: selectedData.data.efforthr,
          extraBilling:selectedData.data.extrabiling,
          billingAmount: selectedData.data.billableamt,
          remarks:selectedData.data.remarks
        }
        data.billingDetailsList.push(employee);
      }
      alert(JSON.stringify(data));
     
      this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].UpdateBillingDetails, data).then(result =>{      
          alert("Saved Successfully");      
      });
     

   }
   
  }

  updateFreezeInd(brmName:string,yearValue:string){
    //var brmID =this.BRMList.Item(brmName).BRMNumber;
    var monthName= yearValue.split(" ")[0];
    var yearName= yearValue.split(" ")[1];
    var freezeIndNew;
    if(this.freezeInd){
      freezeIndNew = 'N'
    } else {
      freezeIndNew = 'Y'
    }
    var data = {brmId:brmName,month:monthName, year:Number(yearName), version: Number(this.versionId), freezeInd:freezeIndNew};
    console.log(data);
    this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].GetFreeze, data ).then(result => {
    if (!result) {
      alert("Error updating Freeze Ind");
    }
    this.searchByInput(" " ,"BRMName",brmName,yearValue)}); 
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
        event.confirm.resolve(event.newData);    
        alert("Saved Successfully");      
    });
    
  }
  
}







