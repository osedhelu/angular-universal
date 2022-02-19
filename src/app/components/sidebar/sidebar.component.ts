import { Component, OnDestroy, OnInit } from '@angular/core'
import { SocketService } from '@services/SocketService/socket.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

declare interface RouteInfo {
  path: string
  title: string
  icon: string
  class: string
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'HOME', icon: 'design_app', class: '' },
  { path: '/packages', title: 'PACK NFT', icon: 'location_map-big', class: '' },
  { path: '/token', title: 'PACK TOKEN', icon: 'location_map-big', class: '' },
  { path: '/withdraw', title: 'BALANCE', icon: 'business_bank', class: '' },
  {
    path: '/diagram',
    title: 'REFERRED',
    icon: 'design_vector',
    class: '',
  },
  {
    path: '/farms',
    title: 'buy and sales',
    icon: 'business_money-coins',
    class: '',
  },

]
export const ROUTESdefaul: RouteInfo[] = [
  { path: '/packages', title: 'PACK NFT', icon: 'location_map-big', class: '' },
  { path: '/token', title: 'PACK TOKEN', icon: 'location_map-big', class: '' },
]
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: any[]
  _unsubscribeAll!: Subject<any>
  un: any
  constructor(private _s: SocketService) {

    this._unsubscribeAll = new Subject();
    this.un = takeUntil(this._unsubscribeAll);
  }

  ngOnInit() {

    this.getURLDefaul()
    this._s.close.pipe(this.un).subscribe((event) => {

      // _("service sockert sidebar", event)
      if (event) {
        this.menuItems = ROUTES.filter((menuItem) => menuItem)
      } else {
        this.getURLDefaul()
      }
    })
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false
    }
    return true
  }
  getURLDefaul() {
    this.menuItems = ROUTESdefaul
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next()
    this._unsubscribeAll.complete()
    this._unsubscribeAll.unsubscribe()
  }
}
