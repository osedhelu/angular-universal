import { Component, OnInit } from '@angular/core'
import { SocketService } from '@services/SocketService/socket.service'

declare interface RouteInfo {
  path: string
  title: string
  icon: string
  class: string
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'HOME', icon: 'design_app', class: '' },
  { path: '/packages', title: 'PACKETS', icon: 'location_map-big', class: '' },
  { path: '/withdraw', title: 'BALANCE', icon: 'business_bank', class: '' },
  {
    path: '/diagram',
    title: 'REFERRED',
    icon: 'design_vector',
    class: '',
  },
  {
    path: '/farms',
    title: 'User Profile',
    icon: 'business_money-coins',
    class: '',
  },

]
export const ROUTESdefaul: RouteInfo[] = [
  { path: '/packages', title: 'PACKETS', icon: 'location_map-big', class: '' },
]
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[]

  constructor(private _s: SocketService) { }

  ngOnInit() {
    this.menuItems = ROUTESdefaul
    this._s.close.subscribe((event) => {
      console.log("service sockert sidebar", event)
      if (event) {
        this.menuItems = ROUTES.filter((menuItem) => menuItem)
      } else {
        this.menuItems = ROUTESdefaul
      }
    })
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false
    }
    return true
  }
}
