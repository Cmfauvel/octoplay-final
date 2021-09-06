import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ImagesService } from 'src/app/services/images.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from 'src/app/_helpers/confirm/confirm.component';
import { Category } from 'src/app/_models/cat';
import { Image } from 'src/app/_models/img';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { EditImgComponent } from '../edit-img/edit-img.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() products: Product[];
  @Input() images: Image[];
  @Input() cats: Category[];
  orders: Order[];
  visibleImages: boolean;
  visibleProducts: boolean;
  visibleCats: boolean;
  visibleOrders: boolean;
  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(private productService: ProductService,
    private imgService: ImagesService,
    private catService: CategoryService,
    private matDialog: MatDialog,
    private orderService: OrderService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.imgService.getAllImages();
    this.imgService.currentImagesSubject.subscribe((resp) => {
      this.images = resp;
    });
    this.productService.selectAll();
    this.productService.currentProductsSubject.subscribe((resp) => {
      this.products = resp;
    });
    this.catService.selectAll();
    this.catService.currentCategoriesSubject.subscribe((resp) => {
      this.cats = resp;
    });
    this.orderService.allOrdersSubject.subscribe((resp) => {
      this.orders = resp;
      console.log(resp);
    });
    this.orderService.selectAll();
  }

  showProducts(): void {
    this.visibleProducts = !this.visibleProducts;
  }

  showImages(): void {
    this.visibleImages = !this.visibleImages;
  }

  showOrders(): void {
    this.visibleOrders = !this.visibleOrders;
  }

  deleteImage(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: "Voulez-vous supprimer cette image ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imgService.delete(id).subscribe((resp) => {
          this.imgService.getAllImages();
        });
      };
    });
  }

  deleteCat(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: "Voulez-vous supprimer cette catégorie ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.catService.delete(id).subscribe((resp) => {
          this.catService.selectAll();
          this.productService.selectAll();
        });
      };
    });
  }

  deleteProduct(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: "Voulez-vous supprimer ce produit ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(id).subscribe((resp) => {
          this.productService.selectAll();
          this.imgService.getAllImages();
        });
      };
    });
  }

  deleteOrder(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: 'Voulez-vous supprimer cette commande ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.orderService.delete(id).subscribe((resp) => {
        //   this.orderService.selectAll();
        // });
      };
    });
  }

  showCats(): void {
    this.visibleCats = !this.visibleCats;
  };

  openEditImg(image: Image): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EditImgComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true,
      data: image
    });
  }

  openEditProduct(product: Product): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EditProductComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true,
      data: product
    });
  }

  openEditOrder(order: Order): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EditOrderComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true,
      data: order
    });
  }

  openEditCat(Cat: Category): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EditCategoryComponent, {
      width: '100%',
      height: '80%',
      autoFocus: true,
      data: Cat
    });
  }
}
