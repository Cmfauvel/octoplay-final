import {
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { environment } from 'src/environments/environment';

import { Order } from 'src/app/_models/order';
import { ProductService } from 'src/app/services/product.service';
import { Image } from 'src/app/_models/img';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  games: any = [];
  images?: unknown[];
  image;
  idGame: number;
  gameSubscription: Subscription;
  apiUrl: string;
  order: Order;
  currentBasket;
  currentGame;

  constructor(
    private imagesService: ImagesService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.selectAll();
    this.productService.currentProductsSubject.subscribe((resp) => {
      this.games = resp;
      console.log(resp)
      const tabQuery = [];
      const role = "principal";

      for(let i = 0; i < this.games.length; i++) {
        tabQuery.push(this.imagesService.getImgRandom(this.games[i].id,  role))
      };
      forkJoin(tabQuery).subscribe((resp) => {
        console.log(resp)
        this.images = resp;
      })
      console.log(this.image)
    })
    // this.gameSubscription = this.productService
    //   .getAllGames()
    //   .subscribe((response) => {
    //     this.games = response;
    //     this.apiUrl = environment.apiUrl;
    //     this.games.forEach((game) => {
    //       this.imagesService
    //         .getImagesOfOneProduct(game.id)
    //         .subscribe((response) => {
    //           this.images = response;
    //         });
    //     });
    //   });
  }


  ngOnDestroy() {
    // this.gameSubscription.unsuscribe();
  }
}
