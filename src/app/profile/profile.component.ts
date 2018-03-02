import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Http } from '@angular/http';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fileToUpload: File = null;
  user = {imgPath: null};
  constructor( private apiService: ApiService , private router: Router , private http: Http) { }

  ngOnInit() {
  }
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    this.user.imgPath  = URL.createObjectURL(this.fileToUpload);

    this.apiService.uploadFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log("success");
      }, error => {
        console.log(error);
      });
  }


/*
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        const file: File = fileList.item(0);
        console.log(file);
        const formData:FormData = new FormData();
        formData.append('uploadFile', file);
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        //let options = new RequestOptions({headers: headers});
        this.apiService.uploadFile(formData);
      console.log(formData);

            
    }
  } */
}