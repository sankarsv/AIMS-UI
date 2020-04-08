import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileQueueObject } from './upload/file-uploader.service';

@Component({
  selector: 'app-headcount-search',
  templateUrl: './headcount-search.component.html',
  styleUrls: ['./headcount-search.component.css']
})
export class HeadcountSearchComponent implements OnInit {
  activeTab = 'search';
  path:String = "Search";
  selectedTab:string= "Search";
  searchCompontentFlag:boolean = true;
  uploadCompontentFlag:boolean = false;
  downloadCompontentFlag:boolean=false;
  loadupload:boolean = false;
  loaddownload:boolean =false;
  loadsearch:boolean = false;
  constructor( public router: Router) { }

  ngOnInit() {
    this.loadsearch =true;
    
   }

  upload(activeTab){
    this.activeTab = activeTab;
    
  }
  download(activeTab){
    this.activeTab = activeTab;
  }
  search(activeTab){
    this.activeTab = activeTab;
  }

  uploadcomponent(){
    this.loadupload = true;
    this.loadsearch =  false;
 }
 Downloadcomponent(){
  this.loaddownload =true;
  this.loadsearch =  false;
 }
 searchcomponent()
 {
  this.loadsearch =  true;
 }
 onCompleteItem($event) {
  console.log($event);
}

  }