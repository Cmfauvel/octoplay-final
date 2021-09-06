import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/_models/cat';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  editForm;
  cat: Category;
  alertMessage: string;
  error: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    private formBuilder: FormBuilder,
    private catService: CategoryService) { }

  ngOnInit(): void {
    this.cat = this.data;
    this.initEditForm();
  }

  initEditForm(): void {
    this.editForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      code: this.formBuilder.control('')
    });
    this.editForm.setValue({
      name: this.cat.name_cat,
      code: this.cat.code_cat
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.catService.update(this.cat.id, this.editForm.value).subscribe((resp) => {
      this.alertMessage = resp.message;
      this.catService.selectAll();
      if (this.alertMessage === `L'ajout à la base de données a échoué.`)
        this.error = true;
    });
  }
}
