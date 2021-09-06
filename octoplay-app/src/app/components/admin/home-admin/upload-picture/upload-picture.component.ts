import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/_models/img';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {
  selectedFile: File = null;
  downloadURL: Observable<string>;
  fb: string;
  task: any;
  n: string;
  file: File;
  image: Image;
  namePicture: string;
  uploadForm;
  images: Image[];
  alertMessage: string;
  error: boolean = false;
  @Input() products;

  constructor(private formBuiler: FormBuilder,
    private storage: AngularFireStorage,
    private imgService: ImagesService) {
    this.uploadForm = this.formBuiler.group({
      name: '',
      description: '',
      component: '',
      role: '',
      produit: ''
    });
  }

  ngOnInit(): void {
    this.initUploadForm();
  }

  initUploadForm(): void {
    setTimeout(() => {
      this.uploadForm = this.formBuiler.group({
        name: this.formBuiler.control('', [Validators.required]),
        description: this.formBuiler.control('', [Validators.required]),
        component: this.formBuiler.control(''),
        role: this.formBuiler.control(''),
        produit: this.formBuiler.control('')
      });
    }, 1000)
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.n = Date.now() + '-' + this.selectedFile.name;
    this.namePicture = this.selectedFile.name;
  }

  onUpload(): void {
    const filePath = `test/${this.n}`;
    const fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, this.selectedFile);
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              const newImage = {
                name: this.uploadForm.value.name,
                description: this.uploadForm.value.description,
                role: this.uploadForm.value.role,
                component: this.uploadForm.value.component,
                ProductId: parseInt(this.uploadForm.value.produit),
                size: `${this.selectedFile.size}octets`,
                path: this.fb,
                type: this.selectedFile.type
              };
              this.imgService.addImage(newImage).subscribe((resp) => {
                this.alertMessage = resp.message;
                this.imgService.getAllImages();
                if (this.alertMessage === `L'ajout à la base de données a échoué.`)
                  this.error = true;
              });
            };
          }, err => {
            console.log(err);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          return url;
        };
      });
  }
}
