import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss']
})
export class UploadProductComponent implements OnInit {
  showForm: boolean;
  uploadForm;
  alertMessage: string;
  error: boolean = false;
  @Input() cats;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.initUploadForm();
  }

  initUploadForm(): void {
    this.showForm = !this.showForm;
    this.uploadForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      fabrication: this.formBuilder.control('', [Validators.required]),
      utilisation: this.formBuilder.control('', [Validators.required]),
      stock: this.formBuilder.control('', [Validators.required]),
      price: this.formBuilder.control('', [Validators.required]),
      cat: this.formBuilder.control('', [Validators.required])
    });
  }

  save(): void {
    console.log(this.uploadForm.value)
    this.productService.create(this.uploadForm.value).subscribe((resp) => {
      this.productService.selectAll();
      this.alertMessage = resp.message;
      if (this.alertMessage === `L'ajout à la base de données a échoué.`)
        this.error = true;
    });
  }
}
