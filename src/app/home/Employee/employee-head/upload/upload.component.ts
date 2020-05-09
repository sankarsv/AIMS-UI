import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FileQueueObject, FileUploaderService } from '../upload/file-uploader.service';
import { APP_CONSTANTS } from 'app/utils/app-constants';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  Billing : any;

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;

  @ViewChild('fileInput')
 myInputVariable: ElementRef;

  queue: Observable<FileQueueObject[]>;

  constructor(public uploader: FileUploaderService,private formBuilder: FormBuilder) {}
   
  ngOnInit() {
      this.form = new FormGroup({
      'upload': new FormControl('', [Validators.required]),
      'billingName': new FormControl('', [Validators.required])
    });
    this.Billing = ['Headcount', 'Billing']
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }
  changeBilling(e) {
    this.uploader.clearQueue();
    this.form.controls["upload"].reset();
    this.form.controls["billingName"].setValue(e.target.value, {
      onlySelf: true
    })
  }
  get f() { return this.form.controls; }

  completeItem = (item: FileQueueObject, response: any) => {    
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    if(this.form.controls["billingName"].value === "1: Headcount")
    this.uploader.addToQueue(fileBrowser.files, APP_CONSTANTS.URL[environment.type].UPLOAD);
    else
    this.uploader.addToQueue(fileBrowser.files, APP_CONSTANTS.URL[environment.type].UPLOADBR);

  }
  reset() {
     this.form.controls["upload"].reset();
     this.form.controls["billingName"].setValue("");
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
            return;
    }
    
  }

}
