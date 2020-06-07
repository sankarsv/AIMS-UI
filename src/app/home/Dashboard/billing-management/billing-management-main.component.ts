import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-management-main',
  templateUrl: './billing-management-main.component.html',
  styleUrls: ['./billing-management-main.component.css']
})
export class BillingManagementMainComponent implements OnInit {
  activeTab = 'billing';
  path:String = "billing";
  selectedTab:string= "billing";
  billingCompontentFlag:boolean = true;
  clarityfileCompontentFlag:boolean = false;
  loadbilling:boolean = false;
  loadclarityfile:boolean =false;
  
  constructor() { }

  ngOnInit() {
  }
  billing(activeTab){
    this.activeTab = activeTab;
    
  }
  clarityfile(activeTab){
    this.activeTab = activeTab;
  }
  billingcomponent(){
    this.loadbilling = true;
    this.loadclarityfile =  false;
 }
 clarityfilecomponent(){
  this.loadclarityfile =true;
  this.loadbilling =  false;
 }

}
