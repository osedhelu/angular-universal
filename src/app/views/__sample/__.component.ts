import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sample',
  templateUrl: './__.component.html',
  styleUrls: ['./__.component.scss']
})
export class __Component implements OnInit, OnDestroy {
  _unsubscribeall: Subject<any>
  un: any
  constructor() { }

  ngOnInit(): void {
    this._unsubscribeall = new Subject();
    this.un = takeUntil(this._unsubscribeall);
  }

  ngOnDestroy(): void {
    this._unsubscribeall.next()
    this._unsubscribeall.complete()
    this._unsubscribeall.unsubscribe()
  }
}
