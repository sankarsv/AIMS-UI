import { Component, OnInit } from '@angular/core';
import { JwtService } from 'services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'services/user.service';
import { httpService } from 'services/httpService';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // activeTab = 'search';
  searchBy: String;
  searchBySelected: String;
  searchString: String;
  searchByFilters = ["Name", "EmployeeID", "Branch", "Type" , "Authorization"];
  empType = ["Permanent", "Temporary"];
  branch = ["Chennai", "Bangalore", "Hyderabad", "Pune"];
  settings: any;
  data: any[];
  showTable: boolean = false;
  constructor(public jwtService: JwtService, public router: Router, public route: ActivatedRoute, public userService: UserService, private httpService: httpService, public dialog: MatDialog) { }

  ngOnInit() {

    this.searchBy = null;
    this.searchBySelected = null;
    this.searchString = null;
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
        id: {
          title: 'Employee ID'
        },
        name: {
          title: 'Name'
        },
        allExp: {
          title: 'Over All Experience'
        },
        sdsExp: {
          title: 'SDS Experience'
        },
        empType: {
          title: 'Employee Type'
        },
        branch: {
          title: 'Branch'
        }
      },
    };
  }


  submit() {
    let response;
    this.data = [];
    let tableData;
    if(this.searchBy =="Authorization"){
      tableData = "listUnAuth";
      this.settings["actions"]["custom"] = [{ name: 'Approve', title: 'Approve' }]
    }else{
      tableData = "getEmployeeDetails";
    }
    this.httpService.httpGet(tableData).then(result => {
      if (result) {
        response = JSON.parse(result.toString());

        response.forEach(element => {
          let key = {
            id: element["employeeId"],
            name: element["firstName"],
            allExp: element["overallExp"],
            sdsExp: element["sdsExp"],
            empType: element["employeeType"],
            branch: element["baseBranch"]
          }
          this.data.push(key);
        });

        this.showTable = true;
      }
    });


  }
  reset() {
    this.ngOnInit();
  }




  dataRoute(event) {
    console.log(event);
    switch (event.action) {
      case 'View':
        let viewObj = event.data;
        Object.assign(viewObj, { "dialogType": "View" });
        const viewdialogRef = this.dialog.open(ViewDialog, { data: viewObj , height:'600px'});
        break;
      case 'Edit':
        let editObj = event.data;
        Object.assign(editObj, { "dialogType": "Edit" });
        const editdialogRef = this.dialog.open(ViewDialog, { data: editObj ,height:'600px' } );
        break;
      case 'Delete':
        this.deleteRecord(event.data);
        break;
        case 'Approve':
          this.httpService.httpPost("saveUnAuth",{ "empNo": event.data.id }).then(result =>{
            if (result) {
              alert("Record approved successfully");
            }
            else{
              alert("Error in Record approval successfully");
            }
          })
    }
  }

  deleteRecord(formData: any) {
    this.httpService.httpPost("delete", { "empNo": formData.id }).then(result => {
      if (result) {
        alert("Record deleted successfully");
        this.submit();
      }
    });
  }

}



@Component({
  selector: 'view-dialog',
  templateUrl: 'view-dialog.html',
  styleUrls: ['./search.component.css']
})

export class ViewDialog {
  constructor(
    public dialogRef: MatDialogRef<ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: httpService
  ) { }
  empType = ["Permanent", "Temporary"];
  branch = ["Chennai", "Bangalore", "Hyderabad", "Pune"];
  public updatedData:any;
  ngOnInit() {
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSave(){

    this.httpService.httpPost("update", this.data).then(result => {
      if (result) {
        alert("Record updated successfully");
      }
    });
    this.dialogRef.close();
  }

}