import { Component, OnInit } from '@angular/core';
import { BrandModel } from '../Models/brandModel';

@Component({
  selector: 'app-brands-carousel',
  templateUrl: './brands-carousel.component.html',
  styleUrls: ['./brands-carousel.component.css']
})
export class BrandsCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.brandList = [
      new BrandModel('Adidas', 'assets/brands-img/adidas.png', '#'),
      new BrandModel('Calvin Klein', 'assets/brands-img/ck.png', '#'),
      new BrandModel('Hollister', 'assets/brands-img/hollister.png', '#'),
      new BrandModel('Levis', 'assets/brands-img/levis.png', '#'),
      new BrandModel('Louis Vuitton', 'assets/brands-img/louis-vuitton.png', '#'),
      new BrandModel('Nike', 'assets/brands-img/nike.png', '#'),
      new BrandModel('Puma', 'assets/brands-img/puma.png', '#'),
      new BrandModel('Ralph Lauren', 'assets/brands-img/ralph-Lauren.png', '#'),
    ];

    this.brandList = this._shuffle(this.brandList);

  }

  brandList: BrandModel[] = [];


  private _shuffle(array: BrandModel[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


}
