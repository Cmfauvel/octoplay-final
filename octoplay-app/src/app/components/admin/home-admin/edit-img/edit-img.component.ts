import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/_models/img';

@Component({
  selector: 'app-edit-img',
  templateUrl: './edit-img.component.html',
  styleUrls: ['./edit-img.component.scss']
})
export class EditImgComponent implements OnInit {
  showForm: boolean;
  editImgForm;
  image: Image;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditImgComponent>,
    private formBuilder: FormBuilder,
    private imgService: ImagesService) { }

  ngOnInit(): void {
    this.image = this.data;
    this.initEditImgForm();
  }


  initEditImgForm(): void {
    this.showForm = !this.showForm;
    this.editImgForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      component: this.formBuilder.control(''),
      role: this.formBuilder.control(''),
      produit: this.formBuilder.control('')
    })
    this.editImgForm.setValue({
      name: this.image.name,
      description: this.image.description,
      component: this.image.component,
      role: this.image.role,
      produit: this.image.ProductId
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.imgService.update(this.image.id, this.editImgForm.value).subscribe((resp) => {
      this.imgService.getAllImages();
    })
  }

}
