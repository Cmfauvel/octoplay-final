import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-upload-category',
  templateUrl: './upload-category.component.html',
  styleUrls: ['./upload-category.component.scss']
})
export class UploadCategoryComponent implements OnInit {
  showForm: boolean;
  uploadForm;
  alertMessage: string;
  error: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private catService: CategoryService) { }

  ngOnInit(): void {
    this.initUploadForm();
  }

  initUploadForm(): void {
    this.showForm = !this.showForm;
    this.uploadForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      code: this.formBuilder.control('')
    });
  }

  save(): void {
    this.catService.create(this.uploadForm.value).subscribe((resp) => {
      this.catService.selectAll();
      this.alertMessage = resp.message;
      if (this.alertMessage == "L'ajout à la base de données a échoué.")
        this.error = true;
    });
  }

}
