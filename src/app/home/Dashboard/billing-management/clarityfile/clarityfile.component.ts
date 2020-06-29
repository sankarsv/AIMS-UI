import { Dictionary } from 'app/utils/Dictionary';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { httpService } from '../../../../../services/httpService';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clarityfile',
  templateUrl: './clarityfile.component.html',
  styleUrls: ['./clarityfile.component.css']
})
export class ClarityfileComponent implements OnInit {
  searchBy: String;
  showTable: boolean = false;
  searchString: String;
  YearsList:[];
  blYearsel:boolean =false;
  BRMList:Dictionary<any>;
  settings: any;
  BrmNamesList:string[];
  UnderBRMBillingDetailsList:Dictionary<any>;
  data:any;
  headerTitle: {};
  

  constructor(public httpService: httpService,public router:Router ) { }

  ngOnInit() {
    this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].YearValues).then((res:any)=>{
      this.YearsList = res.map(yearname=>{
        return yearname["MonthYearName"];
      });     
    });

  this.httpService.httpGet(APP_CONSTANTS.URL[environment.type].BRMDetailsList).then((res:any)=>{
      this.BRMList = new Dictionary<any>();
      res.map((brmDetail: { [x: string]: any; })=>{
        let brmDetalLocal =  {
         BRMName: brmDetail ["brmName"],
         BRMId: brmDetail ["brmId"]
         
        };
        this.BRMList.Add(brmDetalLocal.BRMName,brmDetalLocal);
        this.BrmNamesList =this.BRMList.Keys();
      })
  });
  }
  searchByInput(brmName:string,yearValue:string)
{
  this.data = {};
  var months = {
      'JANUARY' : '01','FEBRUARY' : '02','MARCH' : '03','APRIL' : '04','MAY' : '05','JUNE' : '06','JULY' : '07','AUGUST' : '08','SEPTEMBER' : '09','OCTOBER' : '10','NOVEMBER' : '11','DECEMBER' : '12'
  }
  this.initSetting();
 
 var monthName= yearValue.split(" ")[0];
 var yearName= yearValue.split(" ")[1];
  var name =brmName;
  monthName = monthName.toUpperCase();
  monthName = months[monthName];
  var brmID =this.BRMList.Item(brmName).BRMId;

 var url = APP_CONSTANTS.URL[environment.type].GetClarityDetails +'/'+monthName +'/'+yearName+'/'+brmID
 //To Run local
 //this.httpService.httpPost(APP_CONSTANTS.URL[environment.type].GetClarityDetails,{month:monthName,year:yearName,brmName:name}).then((res:any)=>{

  this.httpService.httpGet(url).then((res:any)=>{
    this.UnderBRMBillingDetailsList = new Dictionary<any>();
    res.map((brmDetail: { [x: string]: any; })=>{      
      let brmDetalLocal =  {
        lastNameFirstName: brmDetail ["lastNameFirstName"],
        resourceId: brmDetail["resourceId"],
        officeId: brmDetail ["officeId"],
        cccio: brmDetail ["cccio"],
        resourceManager: brmDetail ["resourceManager"],
        cin: brmDetail ["cin"],
        sumOfHours: brmDetail ["sumOfHours"],
        averageRate: brmDetail ["averageRate"],
        rateWithoutTax: brmDetail ["rateWithoutTax"],
      };
      this.UnderBRMBillingDetailsList.Add(brmDetalLocal.lastNameFirstName,brmDetalLocal); 
      this.data= this.UnderBRMBillingDetailsList.Values();
     
    })
    this.initSetting();
});

}
setYearValue(){
  this.blYearsel =true;
  console.log('Year Select' +  this.blYearsel);
}

initSetting() {
  //this.populateTableHeader();
  this.searchBy = 'All';
  this.searchString = "";
  this.showTable = true;
  
  this.settings = {
    mode: 'inline',
   // selectMode:'multi',
   actions: {
    add: false,
    edit: false,
    delete: false
    },
    columns: {
      lastNameFirstName: {
        title: 'EmpName'
      },
      resourceId: {
        title: 'ResourceId'
      },
      officeId: {
        title: 'OfficeId'
      },
      cccio: {
        title: 'CIO'
      },
      resourceManager: {
        title: 'ResourceManager'
      },
      cin: {
        title: 'CIN'
      },
      sumOfHours: {
        title: 'SumOfHours',
      },
      averageRate: {
        title: 'AverageRate'
      },
      rateWithoutTax: {
        title: 'RateWithoutTax'
      }
     
  },
  attr: {
    class: 'table table-bordered'
  }  

}
     

}
populateTableHeader() {

  this.headerTitle= {
  "Empname":"lastNameFirstName",
  "ResourceId":"resourceId",
  "officeId":"officeId",
  "CIO":"cccio",
  "ResourceManager":"resourceManager",
  "CIN":"cin",
  "sumOfHours":"sumOfHours",
  "AverageRate":"averageRate",
  "RateWithoutTax":"rateWithoutTax"
  }
  
  }
  

}
