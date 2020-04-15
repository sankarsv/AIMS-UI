import { Component, OnInit } from '@angular/core';
import { JwtService } from 'services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'services/user.service';
import { httpService } from 'services/httpService';
import { MatDialog } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  data: any[];
  settings:any;
  constructor(public jwtService: JwtService, public router: Router, public route: ActivatedRoute, public userService: UserService, private httpService: httpService, public dialog: MatDialog,
    private sanitizer: DomSanitizer) { }
  
  ngOnInit() {




    let response;
    this.data = [];
    this.httpService.httpGet("listBaseline ").then(result => {
      if (result) {
        response = JSON.parse(result.toString());
        this.settings = {
          actions: {
            add: false,
            edit: false,
            delete: false,
            position: 'right',
            custom: [{name: 'View', title: `Download Baseline`}]
          },
          columns: {
            id: {
              title: 'Employee ID'
            },
            date: {
              title: 'Date'
            },
            baselineNumber: {
              title: 'Baseline Number'
            }
          }
        };
        response.forEach(element => {
          let key = {
            id: element["id"],
            date: element["date"],
            baselineNumber: element["baseLineNo"]
          }
          this.data.push(key);
        });
      }
    });
  }

  dataRoute(event){
    /* this.httpService.exportBaseline("export", { "baseLine": event.data.id }).then(result => {
      if (!result) {
        alert("Error in downloading the report");
      }
      else{

        let excelData = result.toString();
        const downloadExcel = new Blob([(excelData)] , {type:'application/vnd.ms-excel'});
        const fileName = new File ([downloadExcel],'BaseLineReport'+event.data.id , {type:'application/vnd.ms-excel'})
        const exportData = window.URL.createObjectURL(fileName);
        window.open(exportData);
      }
    }); */
  }

  baseLine() {
    /* this.httpService.httpPost("genbaseLine", null).then(result =>{
      if(result){
        alert("Basline Generated");
      }
      else{
        alert("Error in generating the Baseline");
      }
    }); */
  }

}

