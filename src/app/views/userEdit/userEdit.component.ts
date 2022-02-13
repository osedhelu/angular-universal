import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { PaisesService } from '@services/PaisesService/paises.service';
import { iUser, UsersService } from '@services/UsersService/Users.service';
import { Employee } from '@views/diagram/diagram.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State, UserEditService } from './_.service';

@Component({
  selector: 'app-usedEdit',
  templateUrl: './userEdit.component.html',
  styleUrls: ['./userEdit.component.scss']
})
export class userEditComponent implements OnInit, OnDestroy {
  _unsubscribeall: Subject<any>
  un: any
  dataSource: iUser[];
  states: State[];
  events: Array<string> = [];
  arrayUser: iUser[] = []
  showFilterRow: boolean;
  currentFilter!: any
  constructor(service: UserEditService, private _userService: UsersService, private _country: PaisesService, private _alert: AlertService) {
    this._unsubscribeall = new Subject();
    this.un = takeUntil(this._unsubscribeall);
  }

  ngOnInit(): void {
    this.getAllUser()
    this.getCountries()
    this.showFilterRow = true
  }

  logEvent(eventName) {
    this.events.unshift(eventName);
  }


  clearEvents() {
    this.events = [];
  }
  EditEvent(e: any) {
    console.log('Edit____', e)
    // this.arrayUser = this.dataSource.filter((result) => result._id !== e.data._id)
  }
  getAllUser() {
    this._userService.getAllUser().pipe(this.un).subscribe((result: any) => {
      this.dataSource = result.data
      this.arrayUser = result.data
      console.log(result)
    })

  }
  getCountries() {
    this._country.get().pipe(this.un).subscribe((result: any) => {
      this.states = result.data
    })

  }
  SaveUser(e: any) {
    console.log(e)
    this._userService.Edit(e.newData, e.key).subscribe((resp) => {
      this._alert.show(from.bottom, aling.right, status.success, 'User Update')
      this.getAllUser()

    })
  }
  ngOnDestroy(): void {
    this._unsubscribeall.next()
    this._unsubscribeall.complete()
    this._unsubscribeall.unsubscribe()
  }
  an(s: any): string {
    // return JSON.stringify(s)

    const account = s.data.address_wallet
    const userLogin = `${account.substring(0, 4)}....${account.slice(-5)}`
    return userLogin
  }
  viewBuy({ data }): string {
    return data.userVentas.length === 0 ? 'txdanger' : 'txsuccess'
  }
}
