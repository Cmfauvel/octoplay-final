import { Component, OnInit } from '@angular/core';
import { Bazar } from 'src/app/_models/bazar';

@Component({
  selector: 'app-bazar-details',
  templateUrl: './bazar-details.component.html',
  styleUrls: ['./bazar-details.component.scss']
})
export class BazarDetailsComponent implements OnInit {
  bazars: [];
  bazar: Bazar = {
    id: 1,
    name: 'Re cycle plastique',
    price: '9.99€',
    dispo: true,
    description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed porro delectus labore eligendi qui accusamus.',
    url: '/bazar',
    img: '../assets/image_test/image1.png',
  };

  constructor() { }

  ngOnInit(): void {

  }
  

}
