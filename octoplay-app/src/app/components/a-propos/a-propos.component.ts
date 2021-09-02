import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/_models/img';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.scss'],
})
export class AProposComponent implements OnInit {

  images: Image[];
  headImg: Image;
  middleImg: Image;
  name: string = "apropos";
  constructor(private imgService: ImagesService) { }

  ngOnInit(): void {
    this.imgService.getImgByComponent(this.name).subscribe((response) => {
      this.images = response;
      this.headImg = this.images[0];
      this.middleImg = this.images[1];
    })
  }
}
