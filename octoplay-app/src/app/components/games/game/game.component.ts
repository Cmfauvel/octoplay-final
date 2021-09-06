import {
  Component,
  OnInit
} from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

import { Order } from 'src/app/_models/order';
import { ProductService } from 'src/app/services/product.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  games: any = [];
  images?: unknown[];

  constructor(
    private imagesService: ImagesService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.selectAll();
    this.productService.currentProductsSubject.subscribe((resp) => {
      this.games = resp;
      const tabQuery = [];
      const role = 'principal';
      for (let i = 0; i < this.games.length; i++) {
        tabQuery.push(this.imagesService.getImgRandom(this.games[i].id, role))
      };
      forkJoin(tabQuery).subscribe((resp) => {
        this.images = resp;
      });
    });
  }
}
