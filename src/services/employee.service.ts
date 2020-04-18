import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { EmployeeDetails } from 'app/interfaces/employee-details-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeDetails(key, value):Promise<EmployeeDetails[]> {
    return this.http.post(APP_CONSTANTS.URL[environment.type].SEARCH, this.getPayLoad(key, value)).toPromise().then(
      (result:any) => {
             return result;
      },
      err => {
        throw err;        
      });
  }

  getPayLoad(key, value) {
    if(key === 'empId') {
      return {'empId': value};
    } else if(key === 'dmId') {
      return {'dmId': value};
    } else if(key === 'glId') {
      return {'glId': value};
    }
  }
}
