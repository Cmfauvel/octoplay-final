import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/_models/img';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  games: any = [];
  images: Image[];
  idGame: number;
  gameSubscription: Subscription;
  currentUser: User;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    try {
      this.gameSubscription = this.productService
      .currentProductsSubject
      .subscribe((response) => {
        this.games = response;
        this.images = response[0].images;
        console.log(response)
       
      });
      this.productService.selectAll();
    } catch {
      console.log("__Error is handled gracefully: TypeError")
    };    
  }


  ngOnDestroy(): void {
    // this.gameSubscription.unsuscribe();
  }
}
