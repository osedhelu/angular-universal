import { Component, OnInit } from '@angular/core'

declare interface RouteInfo {
  path: string
  title: string
  icon: string
  class: string
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Inicio', icon: 'design_app', class: '' },
  { path: '/packages', title: 'Paquetes', icon: 'location_map-big', class: '' },
  { path: '/withdraw', title: 'withdraw', icon: 'business_bank', class: '' },


  {
    path: '/diagram',
    title: 'Diagram',
    icon: 'design_vector',
    class: '',
  },
  // {
  //   path: '/user-profile/nuevo',
  //   title: 'User Profile',
  //   icon: 'users_single-02',
  //   class: '',
  // },
  // {
  //   path: '/table-list',
  //   title: 'Table List',
  //   icon: 'design_bullet-list-67',
  //   class: '',
  // },
  // {
  //   path: '/typography',
  //   title: 'Typography',
  //   icon: 'text_caps-small',
  //   class: '',
  // },
  // {
  //   path: '/upgrade',
  //   title: 'Upgrade to PRO',
  //   icon: 'objects_spaceship',
  //   class: 'active active-pro',
  // },
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[]

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem)
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false
    }
    return true
  }
}