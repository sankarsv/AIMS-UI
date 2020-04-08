import { Component, OnInit } from '@angular/core';
import { JwtService } from 'services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'services/user.service';

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
  searchByFilters = ["Name", "EmployeeID", "DM", "BRM"];
  searchSelectedFilters = ["Selected1", "Selected2", "Selected3"];
  settings: any;
  data: any;
  showTable: boolean = false;
  // loadupload:boolean = false;
  // loaddownload:boolean =false;
  // loadsearch:boolean = false;
  constructor(public jwtService:JwtService,public router:Router,public route: ActivatedRoute, public userService:UserService) { }

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
        portfolio: {
          title: 'Portfolio'
        },
        brm: {
          title: 'BRM'
        },
        dm: {
          title: 'DM'
        }
      },
    };
  }

 
  submit() {
    this.showTable = true;
    this.data = [
      {
        id: 678923,
        name: "Leanne Graham",
        brm: "Bret",
        dm: "Sincere@april.biz",
        portfolio: "Channel"
      },
      {
        id: 267298,
        name: "Ervin Howell",
        brm: "Antonette",
        dm: "Shanna@melissa.tv",
        portfolio: "CustomerConnect"
      },

      {
        id: 310923,
        name: "Nicholas DuBuque",
        brm: "Nicholas.Stanton",
        dm: "Rey.Padberg@rosamond.biz",
        portfolio: "Ananad"
      }
    ];
  }
  reset() {
    this.ngOnInit();
  }
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

