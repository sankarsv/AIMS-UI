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
    let params = new HttpParams();
    params = params.append(key, value);
    return this.http.post(APP_CONSTANTS.URL[environment.type].SEARCH, params).toPromise().then(
      (result:any) => {
             return result;
      },
      err => {
        throw err;        
      });
  }
}
