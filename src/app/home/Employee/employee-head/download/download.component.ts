import { Component, OnInit } from '@angular/core';
import { JwtService } from 'services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'services/user.service';
import { httpService } from 'services/httpService';
import { MatDialog } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  data: any[] | any;
  settings:any;
  constructor(public jwtService: JwtService, public router: Router, public route: ActivatedRoute, public userService: UserService, private httpService: httpService, public dialog: MatDialog,
    private http:HttpClient,private sanitizer: DomSanitizer) {}
  
  ngOnInit()
   {
       this.data = [];
       this.http
             .get(APP_CONSTANTS.URL[environment.type].VERSION)
             .toPromise()
             .then(
                 (res:any) =>{
                                 this.mapData(res);
                                 this.initializeSettings();
                              }
                  )
       console.log(this.data);   
   }

mapData(response:any)
{
  this.data=response.map((element: { [x: string]: any; }) => {
    let key = {
      date: element["loadDate"],
      baselineNumber: element["versionNo"]
    }
    return key;
  });
}

initializeSettings()
{
  this.settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [{name: 'View', title: `Download Baseline`}]
    },
    columns: {
      date: {
        title: 'Date'
      },
      baselineNumber: {
        title: 'Baseline Number'
      }
    }            
  };
}

  dataRoute(event){
    this.httpService.exportBaseline(APP_CONSTANTS.URL[environment.type].Download, { "versionNo": event.data.baselineNumber }).then(result => {
      if (!result) {
        alert("Error in downloading the report");
      }
      else{

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

  baseLine() {
    this.httpService.httpPost("genbaseLine", null).then(result =>{
      if(result){
        alert("Basline Generated");
      }
      else{
        alert("Error in generating the Baseline");
      }
    });
  }

}

