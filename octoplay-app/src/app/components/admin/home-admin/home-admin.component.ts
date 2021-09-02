import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ImagesService } from 'src/app/services/images.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/_models/cat';
import { Image } from 'src/app/_models/img';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  onImage: boolean;
  onData: boolean = true;
  onProduct: boolean;
  onCategory: boolean;
  products: Product[];
  cats: Category[];
  images: Image[];
  constructor(private productService: ProductService,
    private catService: CategoryService,
    private imgService: ImagesService) { }

  ngOnInit(): void {
    
    this.imgService.getAllImages();
    this.imgService.currentImagesSubject.subscribe((resp) => {
      this.images = resp;
    });

    this.productService.selectAll();
    this.productService.currentProductsSubject.subscribe((resp) => {
      console.log(resp)
      this.products = resp;
    });

    this.catService.selectAll();
    this.catService.currentCategoriesSubject.subscribe((resp) => {
      this.cats = resp;
    });
    
  }

  uploadImage(): void {
    this.onImage = !this.onImage;
    this.onData = false;
    this.onProduct = false;
    this.onCategory = false;
  }

  showData(): void {
    this.onData = true;
    this.onProduct = false;
    this.onImage = false;
    this.onCategory = false;
  }

  uploadProduct(): void {
    this.onProduct = !this.onProduct;
    this.onImage = false;
    this.onData = false;
    this.onCategory = false;
  }

  uploadCategory(): void {
    this.onCategory = !this.onCategory;
    this.onImage = false;
    this.onData = false;
    this.onProduct = false;
  }

}
