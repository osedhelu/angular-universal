import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '@services/UsersService/Users.service';
import { DxDiagramComponent } from 'devextreme-angular/ui/diagram';
import ArrayStore from 'devextreme/data/array_store';
import { Employee, employees } from './diagram.service';


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
  @ViewChild(DxDiagramComponent, { static: false }) diagram: DxDiagramComponent;
  currentEmployee: Employee = new Employee();

  employees: Employee[];

  dataSource: ArrayStore;

  popupVisible = false;

  constructor(private _UserService: UsersService) {
    this.employees = employees;
    this.dataSource = new ArrayStore({
      key: 'ID',
      data: employees
    });
  }
  ngOnInit() {
    // this._alert.show()
    this._UserService.miRama().subscribe(resp => {
      console.log(resp)
    })
  }
  itemTypeExpr(obj) {
    return `employee${obj.ID}`;
  }

  showInfo(employee) {
    this.currentEmployee = employee;
    this.popupVisible = true;
  }


}
