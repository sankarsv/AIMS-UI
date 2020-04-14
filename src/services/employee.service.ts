import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { EmployeeDetails } from 'app/interfaces/employee-details-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeDetails():Promise<EmployeeDetails[]> {
    return this.http.get(APP_CONSTANTS.URL[environment.type].SEARCH).toPromise().then(
      (result:any) => {
             return result;
      },
      err => {
        throw err;        
      });
  }
}
