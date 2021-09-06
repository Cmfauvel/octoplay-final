import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { ProductService } from 'src/app/services/product.service';
import { Image } from 'src/app/_models/img';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  games: Product[];
  images: Image[];
  filteredImgTab: Image[];
  game: Product;
  idGame: number;
  headImg: Image;
  secondImg: Image;
  thirdImg: Image;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private imgService: ImagesService) {
  }

  ngOnInit(): void {
    this.idGame = this.activatedRoute.snapshot.params['idGame'];
    this.productService.getOneProduct(this.idGame).subscribe((response) => {
      this.game = response;
      this.images = response.images;
      this.filteredImgTab = this.images.filter(x => x.role == 'secondaire')
      this.secondImg = this.filteredImgTab[0];
      this.thirdImg = this.filteredImgTab[1];
      return this.game;
    });
    this.imgService.getImgRandom(this.idGame, 'principal').subscribe((resp) => {
      this.headImg = resp;
    });
  }
}
