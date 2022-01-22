import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'PageNotFound',
  templateUrl: './PageNotFound.component.html',
  styleUrls: ['./PageNotFound.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }

  refir() {

    console.log('hola')
  }
}
