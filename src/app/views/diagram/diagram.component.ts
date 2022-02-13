import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertService, aling, from, status, } from '@services/alertService/alert.service';
import { UsersService } from '@services/UsersService/Users.service';
import { copyText } from '@utils/copy.utils';
import { DxDiagramComponent } from 'devextreme-angular/ui/diagram';
import ArrayStore from 'devextreme/data/array_store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Employee, employees } from './diagram.service';


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
  @ViewChild(DxDiagramComponent, { static: false }) diagram: DxDiagramComponent;
  respuesta: string;
  copy: boolean;
  @ViewChild('urls', { static: false }) laurl: ElementRef;
  currentEmployee: Employee = new Employee();

  employees: Employee[];

  dataSource: ArrayStore;

  popupVisible = false;
  private _unsubscribeAll!: Subject<any>
  private un: any
  diagramViction: boolean = false
  constructor(private _UserService: UsersService, private _alert: AlertService) {
    this._unsubscribeAll = new Subject();
    this.un = takeUntil(this._unsubscribeAll);

  }
  ngOnInit() {
    // this._alert.show()
    this._UserService.miRama().pipe(this.un).subscribe((resp: any) => {
      console.log(resp)
      this.employees = resp;
      this.dataSource = new ArrayStore({
        key: '_id',
        data: resp
      });
      this.diagramViction = true
    })
  }
  itemTypeExpr(obj) {
    return `user${obj._id}`;
  }

  showInfo(employee) {
    this.currentEmployee = employee;
    this.popupVisible = true;
  }
  getLink(id: string) {
    copyText(id)
    this._alert.show(from.bottom, aling.right, status.info, 'Copied Link')
  }

}
