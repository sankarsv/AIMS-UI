import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { httpService } from '../../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Dictionary } from 'app/utils/Dictionary';
import { DomSanitizer } from '@angular/platform-browser';
import { FileQueueObject, FileUploaderService } from '../../../../home/Employee/employee-head/upload/file-uploader.service';

@Component({
  selector: 'app-billing-management',
  templateUrl: './billing-management.component.html',
  styleUrls: ['./billing-management.component.css']
})

export class BillingManagementComponent implements OnInit {
  searchBy: String;
  searchByYear: String;
  searchByBRM: string;
  showTable: boolean = false;
  searchString: String;
  settings: any;
  source:any;
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
  this.getYearValues();
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

getYearValues(){
  this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].YearValues).then((res:any)=>{
    this.YearsList = res.map(yearname=>{
      return yearname["MonthYearName"];
    });     
  });

}

billingcomponent(){
  
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
  var brmID =this.BRMList.Item(brmName).BRMId;
  var monthName= yearValue.split(" ")[0];
  var yearName= yearValue.split(" ")[1];
  var data = {month:monthName, year:yearName, BRMId:brmID, version: this.versionId };
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
  if(filterValue=="BRMName")
  {
    filterValue = "brmid";
  }
  else if (filterValue=="Other")
  {
    filterValue = "other";
  }
  else if(filterValue=="All")
  {
    filterValue="all";
  }
    let requestBody = {
      month: yearValue.split(" ")[0],
      year:yearValue.split(" ")[1],
      brmId:Number(brmID),
      filterBy:filterValue
    };
  
    this.getBillingDetails(filterValue=="other",requestBody);  
  }
  this.showTable = displayTable;
}

getBillingDetails(editEnable:boolean,requestBody:any) {
  if(requestBody==null)
  {
    var brmID:any;
    if(this.searchByBRM!=null&&this.BRMList.ContainsKey(this.searchByBRM))
    {
      brmID=this.BRMList.Item(this.searchByBRM).BRMId;
    }
    requestBody={
  month:this.searchByYear.split(" ")[0],
  year:this.searchByYear.split(" ")[1],
  brmId:Number(brmID)
    }
  }
  this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].BillingManagment,requestBody).then((res:any)=>{
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
       freezeInd: brmDetail ["freezeInd"],
       billRate:brmDetail["billRate"]
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.empNo,brmDetalLocal); 
      this.source= this.UnderBRMBillingDetailsList.Values();
     
    })
    if(this.source.length >0){
      this.versionId = this.source[0].version;      
      this.freezeInd = (this.source[0].freezeInd == "Y");
      if(this.freezeInd) this.btnFreezeText = "UnFreeze" 
      else {
        this.btnFreezeText = "Freeze"
      }
    }
    var BRMColumn;
    if(requestBody.filterBy=="other")
    {
      let listValues=[];
      let count=1;
      this.BRMList.Keys().forEach(value=>{
        listValues.push({value:this.BRMList.Item(value).BRMId,title:value});
      });
      let configValue={
        selectText:'Select',
        list:listValues
      };
      let editorValue={
        type:'list',
        config:configValue
      };
      BRMColumn=
      {
        title:"BRM Name",
        editor: editorValue
      };
    }
    else
    {
      BRMColumn={
        title:"BRM Name"
      }
    }
    this.initSetting(editEnable,BRMColumn);    
  });

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
"Bill Rate":"billRate",
"Remark 1":"remarks1",
"Remark 2":"remarks2"
}

}

getTableColumnName(HeaderName){
  return this.headerTitle[HeaderName];
}

  initSetting(editEnable:boolean,brmColumn:any) {
    this.populateTableHeader();
    this.searchBy = 'All';
    this.searchString = "";
    var customString :any;
    if(editEnable)
     customString = [{ name: 'Edit', title: `<img src="../../../assets/images/editnew.png">`, }]
    this.settings = {
      mode: 'inline',
      selectMode:'multi',
      edit: {confirmSave: true},
      delete:  {confirmDelete: true},
      add:  {confirmCreate: true},
      actions: {
        add: editEnable,
        edit: editEnable,
        update: false,
        delete:   editEnable,
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
        BRMName: brmColumn,
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
        billRate:
        {
          title:'Bill Rate'
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
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      var data ={
        version: this.versionId,
        billingDetailsList:[]
      };
      var selectedData =event.data;
      var employee ={
        empId:selectedData.empNo,
        billableHrs:selectedData.billablehrs,
        billableDays:selectedData.billabledays,      
        effortHrs: selectedData.efforthr,
        extraBilling:selectedData.extrabiling,
        billingAmount: selectedData.billableamt,
        remarks:selectedData.remarks
      }
      data.billingDetailsList.push(employee);
      this.serviceCall(data, event, 2);      
    } else {
      event.confirm.reject();
    }

  }
  public change(event) {
    if(event.srcElement.closest("tr").querySelector("a.ng2-smart-action-add-create")==null){
      let value = event.srcElement.value
      console.log(value)
      var rIx =event.srcElement.closest("tr").rowIndex-2;
      var row =this.table.grid.dataSet.data[rIx];
      row[this.getTableColumnName(event.srcElement.placeholder)] = event.srcElement.value
      this.selectedRows.push(rIx);
    }
  }

  save()
  {
    let bRowSelected: boolean =false;
    let gridSelectedRows: Array<Number> = Array.from(new Set(this.selectedRows));    
    let selectedIx: any;
    for(var i=0; i<gridSelectedRows.length; i++)
    {
      selectedIx = gridSelectedRows[i];
      if(this.table.grid.dataSet.rows[selectedIx].isSelected) {     
        bRowSelected =true;
      }
    }
    if(!bRowSelected){
      alert("Please select a row to update");
      return;
    }
    
    var data ={
      version: this.versionId,
      billingDetailsList:[]
    };
    
    for(var i=0; i<gridSelectedRows.length; i++)
    {
      let selectedIx: any =gridSelectedRows[i];
        if(this.table.grid.dataSet.rows[selectedIx].isSelected) {     
          let selectedData: any = this.table.grid.dataSet.data[selectedIx];
          var employee ={
            empId:selectedData.empNo,
            billableHrs:selectedData.billablehrs,
            billableDays:selectedData.billabledays,      
            effortHrs: selectedData.efforthr,
            extraBilling:selectedData.extrabiling,
            billingAmount: selectedData.billableamt,
            remarks:selectedData.remarks
          }
          data.billingDetailsList.push(employee);
        }

    }    
    this.serviceCall(data,null,1);   
  }


  serviceCall(data,event, callType){    
    console.log(JSON.stringify(data))
    this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].UpdateBillingDetails, data).then(result =>{      
      alert("Saved Successfully");    
      this.getBillingDetails(true,null); 
      //single update      
      if(callType == 0)  {
        this.singleUpdate(event);
      }
      //Delete
      if(callType == 2 || callType == 3)  {
        this.rowUpdate(event);
      }
      
    });     
  }

  singleUpdate(event)
  {
    event.confirm.resolve(event.newData);
  }
  
  rowUpdate(event)
  {
    event.confirm.resolve();
  }
  updateFreezeInd(brmName:string,yearValue:string){
    //var brmID =this.BRMList.Item(brmName).BRMNumber;
    var monthName= this.searchByYear.split(" ")[0];
    var yearName= this.searchByYear.split(" ")[1];    
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
    this.serviceCall(data,event, 0);
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
    var data ={
      version: this.versionId,
      billingDetailsList:[]
    };
    var selectedData =event.newData;
    var employee ={
      empId:selectedData.empNo,
      billableHrs:selectedData.billablehrs,
      billableDays:selectedData.billabledays,      
      effortHrs: selectedData.efforthr,
      extraBilling:selectedData.extrabiling,
      billingAmount: selectedData.billableamt,
      remarks:selectedData.remarks
    }
    data.billingDetailsList.push(employee);
    this.serviceCall(data, event, 3);      
  }

 

  resetEditMode(){
    let gridSelectedRows: Array<Number> = Array.from(new Set(this.selectedRows));   
    for(var i=0; i<gridSelectedRows.length; i++)
    {
      let selectedIx: any =gridSelectedRows[i];
      if(this.table.grid.dataSet.rows[selectedIx].isSelected) {     
       this.table.grid.dataSet.data[selectedIx].isInEditing =false;
      }
    }

  }
  
}







