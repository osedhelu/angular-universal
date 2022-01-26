import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdarwComponent implements OnInit {
  ADD_TO_FAVORITES = 'buy this pack';
  REMOVE_FROM_FAVORITES = 'Remove from Favorites';
  dimencion: number = 660
  currentHouse: any = {
    Favorite: false,
    img: 'hola.jpg'
  };
  btnComprar: boolean = false
  screen(width): any {

    return (width < 700) ? 'sm' : 'lg';
  }
  constructor() { }

  ngOnInit() {
  }

}
