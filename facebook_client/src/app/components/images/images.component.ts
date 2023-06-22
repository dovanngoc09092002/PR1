import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  // arrImages: string[] = [];
  arrImages: any = [];
 objectArray: any = []

  constructor(private homeService: HomeService) {
    this.getFullImages();
  }

  getFullImages() {
    this.homeService.getImages(1000 , 0).subscribe(
      (res) => {
        // console.log('this is images full', res);
        this.arrImages = res.data;
        // console.log(this.arrImages);
        
        this.objectArray = this.arrImages.map((str: string) => {
          return { image: str, thumbImage  : str};
        });
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }
}
