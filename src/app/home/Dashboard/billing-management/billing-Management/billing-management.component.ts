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
  searchByYear: string;
  searchByBRM: Number;
  searchByFilter: any;
  searchByLocation: string;
  showTable: boolean = false;
  searchString: String;
  settings: any;
  source: any;
  input: string = '<input type="checkbox"></input>';
  BRMList: Dictionary<any>;
  UnderBRMBillingDetailsList: Dictionary<any>;
  YearsList: [];
  BrmNamesList: any[] = [];
  BRMNamesDropDownList:any[]=[];
  selectedRows: number[] = [];
  pushrow: [];
  selectedBRM: string;
  fileUpload: boolean;
  uploadMessage: string;
  versionId: string;
  freezeInd: boolean = false;
  btnFreezeText: string;
  headerTitle: {};
  FiltersValues = [{ Id: "brmid", Value: "BRMName" }, { Id: "other", Value: "Other" }, { Id: "all", Value: "All" }];
  @ViewChild('fileInput') fileInput;
  @ViewChild('table') table;
  @Output() onCompleteItem = new EventEmitter();
  @Output() onUploadFailed = new EventEmitter();

  constructor(public httpService: httpService, public router: Router, private _sanitizer: DomSanitizer, public uploader: FileUploaderService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.getYearValues();
    this.btnFreezeText = "Freeze";
    this.uploader.onCompleteItem = this.completeItem;
    this.uploader.onUploadFailed = this.uploadFailed;
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].BRMDetailsList).then((res: any) => {
      this.BRMList = new Dictionary<any>();
      res.map((brmDetail: { [x: string]: any; }) => {
        let brmDetalLocal = {
          BRMName: brmDetail["brmName"],
          BRMId: brmDetail["brmId"]
        };
        this.BRMList.Add(brmDetalLocal.BRMId, brmDetalLocal.BRMName);
        this.BrmNamesList.push({ value: Number(brmDetalLocal.BRMId), title: brmDetalLocal.BRMName });
        this.BRMNamesDropDownList.push({ value: brmDetalLocal.BRMName, title: brmDetalLocal.BRMName });
      })
    });
  }

  getYearValues() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].YearValues).then((res: any) => {
      this.YearsList = res.map(yearname => {
        return yearname["MonthYearName"];
      });
    });
  }

  upload() {
    this.fileInput.nativeElement.click();
  }
  uplodFile() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files, APP_CONSTANTS.URL[environment.type].BillingUpload);
    this.uploader.uploadAll();
  }
  download(brmName: string, yearValue: string) {
    var monthName = yearValue.split(" ")[0];
    var yearName = yearValue.split(" ")[1];
    var data = { month: monthName, year: yearName, brmId: Number(brmName), version: this.versionId };
    console.log(data);
    this.httpService.downloadFile(APP_CONSTANTS.URL[environment.type].DownloadBillingFile, data).then(result => {
      if (!result) {
        alert("Error in downloading the report");
      }
      else {
        var downloadUrl = window.URL.createObjectURL(result);
        var link = document.createElement('a');
        link.href = downloadUrl;
        var fileName = localStorage.getItem('filename');
        if (!fileName) {
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

  searchByInput() {
    var displayTable = (this.searchByFilter == "brmid" && this.searchByBRM != null && this.searchByLocation != null) ||
      this.searchByFilter == "other" || this.searchByFilter == "all";
    if (displayTable) {
      this.getBillingDetails();
    }
    this.showTable = displayTable;
  }

  getBillingDetails() {
    var brmID: any;
    let requestBody = {
      month: this.searchByYear.split(" ")[0],
      year: this.searchByYear.split(" ")[1],
      brmId: this.searchByBRM,
      filterBy: this.searchByFilter
    };
    this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].BillingManagment, requestBody).then((res: any) => {
      this.UnderBRMBillingDetailsList = new Dictionary<any>();
      res.map((brmDetail: { [x: string]: any; }) => {
        let brmDetalLocal = {
          location: brmDetail["locationId"],
          projectNo: brmDetail["projectId"],
          empNo: brmDetail["empId"],
          empFullName: brmDetail["empName"],
          billablehrs: brmDetail["billableHrs"],
          billabledays: brmDetail["billableDays"],
          efforthr: brmDetail["effortHrs"],
          extrahr: brmDetail["extraHrs"],
          extrabiling: brmDetail["extraBilling"],
          billableamt: brmDetail["billingAmount"],
          remarks1: brmDetail["remarks1"],
          remarks2: brmDetail["remarks2"],
          DMId: brmDetail["dmId"],
          DMName: brmDetail["dmName"],
          WONNumber: brmDetail["wonNumber"],
          STOName: brmDetail["stoName"],
          OfficeID: brmDetail["officeId"],
          BRMId: brmDetail["brmId"],
          BRMName: brmDetail["brmName"],
          freezeInd: brmDetail["freezeInd"],
          billRate: brmDetail["billRate"]
        };
        this.UnderBRMBillingDetailsList.Add(brmDetalLocal.empNo, brmDetalLocal);
        this.source = this.UnderBRMBillingDetailsList.Values();

      })
      if (res.length > 0) {
        this.versionId = res[0].version;
        this.freezeInd = (res[0].freezeInd == "Y");
        if (this.freezeInd) {
          this.btnFreezeText = "UnFreeze"
        }
        else {
          this.btnFreezeText = "Freeze"
        }
      }
      this.initSetting();
    });
  }

  populateTableHeader() {
    this.headerTitle = {
      "Project No": "projectNo",
      "Employee No": "empNo",
      "Employee Name": "empFullName",
      "BRM": "BRMName",
      "Billable Hrs": "billablehrs",
      "Billable Days": "billabledays",
      "Effort Hours": "efforthr",
      "Extra Hours": "extrahr",
      "Extra Billing": "extrabiling",
      "Billable Amount": "billableamt:",
      "Bill Rate": "billRate",
      "DM Name": "DMName",
      "STO": "stoName",
      "Won": "wonNumber",
      "Location": "location",
      "Remark 1": "remarks1",
      "Remark 2": "remarks2",
      "OfficeID": "officeId"
    }
  }

  getTableColumnName(HeaderName) {
    return this.headerTitle[HeaderName];
  }

  initSetting() {
    var editEnable: boolean = this.searchByFilter == "other" || !this.freezeInd;
    this.populateTableHeader();
    this.searchBy = 'All';
    this.searchString = "";
    var customString: any;
    if (editEnable) {
      customString = [{ name: 'Edit', title: `<img src="../../../assets/images/editnew.png">`, }]
    }
    this.settings = {
      mode: 'inline',
      selectMode: 'multi',
      edit: { confirmSave: true },
      delete: { confirmDelete: true },
      add: {
        confirmCreate: true,
        addButtonContent: '<span class="spAdd ng2-smart-action ng2-smart-action-add-add">Add New</span>'
      },
      actions: {
        add: editEnable,
        edit: editEnable,
        update: false,
        delete: editEnable,
        custom: customString,
        position: 'right'
      },
      columns: {
        WONNumber: {
          title: "Won"
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
        BRMName: {
          title: "BRM Name",
          editor: {
            type: 'list',
            config:
            {
              list: this.BRMNamesDropDownList
            }
          }
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
        billRate:
        {
          title: 'Bill Rate'
        },
        DMName:
        {
          title: 'Delivery Manager'
        },
        STOName:
        {
          title: 'STO'
        },
        remarks1: {
          title: 'Remark 1'
        },
        remarks2: {
          title: 'Remark 2'
        },
        OfficeID: {
          title: 'Office Id'
        }
      },
      attr: {
        class: 'table table-bordered'
      }
    };
    console.log(this.settings.actions.add)
    if (this.freezeInd) {
      this.freezeSettings();
    }
  }

  freezeSettings() {
    this.settings.selectionMode = null;
    delete this.settings.columns["checkbox"];
    this.settings.actions = null;
    this.btnFreezeText = "UnFreeze";
  }

  onSaveConfirm(event) {
    var data = {
      version: this.versionId,
      billingDetailsList: [this.populateServiceData(event.newData)]
    };
    alert(JSON.stringify(data));
    this.serviceCall(data, event, CallTypeEnum.Update);
  }

  OnBulkSave() {
    let bRowSelected: boolean = false;
    let gridSelectedRows: Array<Number> = Array.from(new Set(this.selectedRows));
    let selectedIx: any;
    for (var i = 0; i < gridSelectedRows.length; i++) {
      selectedIx = gridSelectedRows[i];
      if (this.table.grid.dataSet.rows[selectedIx].isSelected) {
        bRowSelected = true;
      }
    }
    if (!bRowSelected) {
      alert("Please select a row to update");
      return;
    }
    var data = {
      version: this.versionId,
      billingDetailsList: []
    };
    for (var i = 0; i < gridSelectedRows.length; i++) {
      let selectedIx: any = gridSelectedRows[i];
      if (this.table.grid.dataSet.rows[selectedIx].isSelected) {
        data.billingDetailsList.push(this.populateServiceData(this.table.grid.dataSet.data[selectedIx]));
      }
    }
    this.serviceCall(data, null, CallTypeEnum.BulkUpdate);
  }

  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      var data = {
        version: this.versionId,
        billingDetailsList: [this.populateServiceData(event.data)]
      };
      this.serviceCall(data, event, CallTypeEnum.Delete);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
    var data = {
      version: this.versionId,
      billingDetailsList: [this.populateServiceData(event.newData)]
    };
    console.log(data);
    if (!this.Validation(data.billingDetailsList[0], true)) {
      return false;
    }
    this.serviceCall(data, event, CallTypeEnum.Create);
  }

  serviceCall(data, event, callType: CallTypeEnum) {
    var bdetails = data.billingDetailsList;
    this.updateActionType(bdetails, callType);
    data.month = this.searchByYear.split(" ")[0];
    data.year = this.searchByYear.split(" ")[1];
    console.log(JSON.stringify(data))
    this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].UpdateBillingDetails, data).then(result => {
      alert("Saved Successfully");
      this.getBillingDetails();
      if (callType == CallTypeEnum.Update) {
        this.singleUpdate(event);
      }
      if (callType == CallTypeEnum.Delete || callType == CallTypeEnum.Create) {
        this.rowUpdate(event);
      }
    });
  }

  updateActionType(bdetails, callType: CallTypeEnum) {
    for (var i = 0; i < bdetails.length; i++) {
      switch (callType) {
        case CallTypeEnum.Update:
        case CallTypeEnum.BulkUpdate:
          if (this.searchByFilter == "other") {
            bdetails[i].action = "A";
          }
          else {
            bdetails[i].action = "U";
          }
          break;
        case CallTypeEnum.Create:
          bdetails[i].action = "A";
          break;
        case CallTypeEnum.Delete:
          bdetails[i].action = "D";
          break;
      }
    }
  }

  public change(event) {
    if (event.srcElement.closest("tr").querySelector("a.ng2-smart-action-add-create") == null) {
      let value = event.srcElement.value
      console.log(value)
      var rIx = event.srcElement.closest("tr").rowIndex - 2;
      var row = this.table.grid.dataSet.data[rIx];
      row[this.getTableColumnName(event.srcElement.placeholder)] = event.srcElement.value
      this.selectedRows.push(rIx);
    }
  }

  singleUpdate(event) {
    event.confirm.resolve(event.newData);
  }

  rowUpdate(event) {
    event.confirm.resolve();
  }

  updateFreezeInd(brmName: string, yearValue: string) {
    var monthName = this.searchByYear.split(" ")[0];
    var yearName = this.searchByYear.split(" ")[1];
    var freezeIndNew;
    if (this.freezeInd) {
      freezeIndNew = 'N'
    }
    else {
      freezeIndNew = 'Y'
    }
    var data = { brmId: this.searchByBRM, month: monthName, year: Number(yearName), version: Number(this.versionId), freezeInd: freezeIndNew };
    console.log(data);
    this.httpService.PostDetails(APP_CONSTANTS.URL[environment.type].GetFreeze, data).then(result => {
      if (!result) {
        alert("Error updating Freeze Ind");
      }
      this.searchByInput()
    });
  }

  validate(rowData, bNumeric, fieldName) {
    if (rowData == '') {
      alert("Please enter " + fieldName);
      return false;
    }
    if (bNumeric) {
      if (!Number(rowData)) {
        alert("Invalid " + fieldName);
        return false;
      }
    }
    return true;
  }

  Validation(row, bAdd) {
    if (bAdd && (!(this.validate(row.empId, true, "Employee Id") && this.validate(row.billableHrs, true, "Billable Hours") &&
      this.validate(row.billableDays, true, "Billable Days") && this.validate(row.effortHrs, true, "Effort Hours") &&
      this.validate(row.extraBilling, true, "Extra Billing") && this.validate(row.billingAmount, true, "Billable Amount") &&
      this.validate(row.STOName, false, "STO Name") && this.validate(row.brmName, false, "BRM Name") &&
      this.validate(row.billRate, true, "Bill Rate") && this.validate(row.dmName, false, "DM Name") &&
      this.validate(row.locationId, false, "Location Id") && this.validate(row.projectId, false, "Project Id") &&
      this.validate(row.wonNumber, true, "Won Number")
    ))) {
      return false;
    }
    return true;
  }

  resetEditMode() {
    let gridSelectedRows: Array<Number> = Array.from(new Set(this.selectedRows));
    for (var i = 0; i < gridSelectedRows.length; i++) {
      let selectedIx: any = gridSelectedRows[i];
      if (this.table.grid.dataSet.rows[selectedIx].isSelected) {
        this.table.grid.dataSet.data[selectedIx].isInEditing = false;
      }
      return true;
    }
  }

  populateServiceData(selectedData: any): any {
    var employee = {
      empId: selectedData.empNo,
      brm: this.getBRMIDFromBRMName(selectedData.BRMName),
      billableHrs: Number(selectedData.billablehrs),
      billableDays: Number(selectedData.billabledays),
      effortHrs: Number(selectedData.efforthr),
      extraHrs: Number(selectedData.extrahr),
      extraBilling: Number(selectedData.extrabiling),
      billingAmount: Number(selectedData.billableamt),
      remarks1: selectedData.remarks1,
      remarks2: selectedData.remarks2,
      billRate: Number(selectedData.billRate),
      locationId: selectedData.location,
      wonNumber: selectedData.WONNumber,
      stoName: selectedData.STOName,
      officeId: selectedData.OfficeID
    };
    return employee;
  }

  getBRMIDFromBRMName(selectedBRMValue:string):Number
  {
    var selectedBRMID:Number;
    this.BrmNamesList.forEach(value=>{
      if(value.title==selectedBRMValue)
      {
        selectedBRMID = value.value;
      }
    });
    return selectedBRMID;
  }
}

enum CallTypeEnum {
  Update,
  BulkUpdate,
  Delete,
  Create
}




