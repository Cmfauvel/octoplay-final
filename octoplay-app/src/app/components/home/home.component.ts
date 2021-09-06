import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Image } from 'src/app/_models/img';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  games: any = [];
  images: Image[];
  gameSubscription: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    try {
      this.gameSubscription = this.productService
        .currentProductsSubject
        .subscribe((response) => {
          this.games = response;
          this.images = response[0].images;

        });
      this.productService.selectAll();
    } catch {
      console.log("__Error is handled gracefully: TypeError");
    };
  }
}
