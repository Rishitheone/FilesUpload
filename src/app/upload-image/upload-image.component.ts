import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PhotoUploadService } from '../photo-upload.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  options: { content: FormData }
  constructor(private service: PhotoUploadService, private fb: FormBuilder, private http: HttpClient) { }
  uploadForm: FormGroup;
  files: string;
  myFiles: string[] = [];

  title = 'app';
  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;
  images: Array<any> = [];

  ngOnInit() {
    this.uploadForm = this.fb.group({
      files: ['']
    })
  }

  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.files = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.uploadForm.get('files').setValue(this.myFiles);
    }
    console.log(this.myFiles)

    let option: ResizeOptions = { Resize_Max_Height: 800, Resize_Max_Width: 1000, Resize_Quality: 60, Resize_Type: 'png' }
    ImageCompressService.filesToCompressedImageSourceEx(event.target.files, option).then(observableImages => {
      observableImages.subscribe((image) => {
        console.log(image);
        this.images.push(image);
      }, (error) => {
        console.log("Error while converting");
      }, () => {
        this.processedImages = this.images;
        // const array1 = this.processedImages;
        // array1.forEach(element => 
        //   this.myFiles = element.compressedImage.imageDataUrl),
          
        this.showTitle = true;
      });
    });
    // this.uploadForm.get('files').setValue(this.myFiles);
  }



  onSubmit() {
    const formData = new FormData();
    for (let i = 0; i < (this.myFiles.length); i++) {
      formData.append('files[]', this.myFiles[i]);
    }
    this.service.uploadeImage(formData).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }
}
