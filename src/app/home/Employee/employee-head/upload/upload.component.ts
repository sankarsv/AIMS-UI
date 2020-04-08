import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileQueueObject, FileUploaderService } from '../upload/file-uploader.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  constructor(public uploader: FileUploaderService) { }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }
}
