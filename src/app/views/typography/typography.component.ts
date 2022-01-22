import { Component, OnInit } from '@angular/core';
import { AlertService, status } from '@services/alertService/alert.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  constructor(public _alert: AlertService) { }

  ngOnInit() {
  }
 showNotification(from, lenght) {
    this._alert.show(from, lenght, status.success, 'hola')
  }

}
