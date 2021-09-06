import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  showForm: boolean;
  editForm;
  product: Product;
  categories;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditProductComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private catService: CategoryService) { }

  ngOnInit(): void {
    this.product = this.data;
    this.catService.currentCategoriesSubject.subscribe((resp) => {
      this.categories = resp;
    });
    this.catService.selectAll();
    this.initEditForm();
  }

  initEditForm(): void {
    this.showForm = !this.showForm;
    this.editForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      fabrication: this.formBuilder.control('', [Validators.required]),
      utilisation: this.formBuilder.control('', [Validators.required]),
      stock: this.formBuilder.control('', [Validators.required]),
      price: this.formBuilder.control('', [Validators.required]),
      cat: this.formBuilder.control('', [Validators.required])
    });
    this.editForm.setValue({
      name: this.product.name,
      description: this.product.description,
      utilisation: this.product.utilisation,
      fabrication: this.product.fabrication,
      stock: this.product.stock,
      price: this.product.price,
      cat: this.product.category_id
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.productService.update(this.product.id, this.editForm.value).subscribe((resp) => {
      this.productService.selectAll();
    });
  }
}
