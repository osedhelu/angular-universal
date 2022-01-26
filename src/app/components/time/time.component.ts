import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'component-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
    test: Date = new Date();

    constructor() { }

    ngOnInit() {
    }

}

