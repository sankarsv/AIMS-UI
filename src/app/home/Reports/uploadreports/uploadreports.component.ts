import { DashboardResolver } from './../../Dashboard/executive-dashboard/executive.dashboard.resolver';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment'
import { throwError } from 'rxjs';

@Component({
  selector: 'app-uploadreports',
  templateUrl: './uploadreports.component.html',
  styleUrls: ['./uploadreports.component.css']
})
export class UploadreportsComponent implements OnInit {
  data: any[];


  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.data = [];
       this.http
             .get(APP_CONSTANTS.URL[environment.type].UPLOADREPORTS)
             .toPromise()
             .then(
                 (res:any) =>{
                  if (res === null) return throwError("null data");
                 this.data = res;
                }
      )

  }

}
