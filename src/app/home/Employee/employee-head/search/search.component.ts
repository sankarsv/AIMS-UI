import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'services/employee.service';
import { EmployeeDetails } from 'app/interfaces/employee-details-interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 // activeTab = 'search';
  searchBy: String;
  searchString: String;
  searchByFilters = ["Employee_ID", "BRM_Name", "DM_Name"];
  searchSelectedFilters = ["All","Selected1", "Selected2", "Selected3"];
  settings: any;
  data: EmployeeDetails[];
  dataSearched: EmployeeDetails[];
  showTable: boolean = false;
  empDetailsUpdated:EmployeeDetails[] = [];
  searchCreteria = {
    "Name": "empName",
    "Role": "teamRole",
    "Base Branch": "baseBranch",
    "Employee_ID": "empId",
    "BRM_Name": "brmName",
    "DM_Name": "dmName",
    "All":"",
  }
  searchField:string;

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.initSetting();
    
  }
  onChange(event) {
   this.searchString = "";

  }
 
  submit() {
    this.showTable = true;
    this.employeeService.getEmployeeDetails(this.searchField, this.searchString).then(
      result => {
        this.empDetailsUpdated = [];
        for (const emp of result) {
          emp.empFullName = `${emp.firstName} ${(emp.lastName) ? emp.lastName : ''}`;
          //emp.dob = emp.dob.substr(0, 10);
          this.empDetailsUpdated.push(emp);
        }
        this.data = this.empDetailsUpdated;
      }
    );

    // Used for initial testing of search without backend
    /* this.dataSearched = this.data.filter((str : EmployeeDetails) => { 
       return String(str[this.searchField]).toLowerCase().includes(this.searchString.toString().toLowerCase());
    }); */
  }

  searchByInput(keyStr) {
    this.searchField = this.searchCreteria[keyStr];
  }

  reset() {
    this.initSetting();
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  initSetting() {
    this.searchBy = 'All';
    this.searchString = "";
    this.showTable = false;
    this.settings = {
      actions: {
        add: false,
        edit: false,
        custom: [{ name: 'View', title: `<img src="../../../assets/images/viewnew.png">` },
        { name: 'Edit', title: `<img src="../../../assets/images/editnew.png">` },
        { name: 'Delete', title: `<img src="../../../assets/images/delete.png">` }],
        delete: false,

        position: 'right'
      },
      columns: {
        employeeId: {
          title: 'Employee ID'
        },
        empFullName: {
          title: 'Employee Name'
        },
        teamRole: {
          title: 'Role'
        },
        overallExp: {
          title: 'Experience'
        },
        baseBranch: {
          title: 'Base Branch'
        },
        dmName: {
          title: 'Delivery Manager'
        },
        brmName: {
          title: 'BRM'
        }
      },
    };
  }
}

