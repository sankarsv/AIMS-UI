import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit() {
    this.initSetting();
  }

  initSetting() {
    this.searchBy = 'All';
    this.searchString = "";
    this.showTable = true;
    this.settings = {
      actions: {
        add: false,
        edit: false,
        delete: false,

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






