import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.hmr';
import { _storage } from '@utils/index';
import { AuthService } from '@services/auth.service';
import { SocketService } from '@services/SocketService/socket.service';
import { Web3Service } from '@services/web3Service/web3.service';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { TransactionService } from '@services/transaction/transaction.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { copyText } from '@utils/copy.utils';
declare const window: any;
const { ethereum } = window;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: any;
  private un: any
  private listTitles: any[];
  public balance: {
    ahorro: number,
    disponible: number,
    reservado: number
  } = {
      ahorro: 0,
      disponible: 0,
      reservado: 0
    }
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public isCollapsed = true;
  userLogin: string
  login: Boolean = false
  username: string = '';
  constructor(location: Location,
    private _socket: SocketService,
    private element: ElementRef, private router: Router, public _web3: Web3Service, private _auth: AuthService,
    private _transctionService: TransactionService,
    private _alert: AlertService) {
    this._unsubscribeAll = new Subject();
    this.un = takeUntil(this._unsubscribeAll);
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.pipe(this.un).subscribe((event: any) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    this.activeSocket()
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        html.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };

  getTitle() {
    try {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if (titlee.indexOf('?')) {
        titlee = titlee.substr(0, titlee.indexOf('?'))
      }

      if (titlee.charAt(0) === '#') {
        titlee = titlee.slice(2);
      }
      titlee = titlee.split('/').pop();


      for (var item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
          return this.listTitles[item].title;
        }
      }
      return titlee;
    } catch (err) {
      console.error(err)
    }
  }
  async ConexionMetamask() {
    try {
      const account = await this._web3.getAccount()
      // await this._web3.selectAccount()
      const userLogin = `${account.substring(0, 4)}....${account.slice(-5)}`
      const token = await this._web3.getToken(account)
      localStorage.setItem('eth-token', token)

      this._auth.ethToken().pipe(this.un).subscribe((resp: any) => {
        this._web3.selectRed()
        localStorage.setItem('token', resp.access_token)
        localStorage.setItem('_id', resp._id)
        localStorage.setItem('user-eth', userLogin)
        this.login = true
        this.userLogin = userLogin
        this.router.navigate(['/dashboard'])
        this._socket.initConecion()
        this.activeSocket()


        // this._web3.se()
      })
      this.me()
    } catch (err) {
      console.error(err)
    }
  }
  async me() {
    const address = await this._web3.getAccount()
    this._web3.updateBalance(address)
  }
  async exit() {
    this.router.navigate(['/dashboard'])
    localStorage.removeItem('eth-token')
    localStorage.removeItem('user-eth')
    localStorage.removeItem('token')
    this.login = false
    this._socket.disconnect()
    await this._auth.deleteSeccion(await this._web3.getAccount())
    this._web3.socketTransaction.pipe(this.un).subscribe(function (error, success) {
      if (success) {

      }
    });

  }
  async getBalance() {
    this._web3.updateBalance(await this._web3.getAccount())
    this._transctionService.getBalance().pipe(this.un).subscribe((resp: any) => {
      this.balance = {
        ahorro: resp.data.ahorro,
        disponible: resp.data.disponible,
        reservado: resp.data.reservado
      }

      // this._alert.show(from.bottom, aling.right, status.info, JSON.stringify(resp.data))
    })

  }

  getUrlAfiliado(event: any): void {
    copyText(localStorage.getItem('_id'))
    this._alert.show(from.bottom, aling.right, status.info, 'Copied Link')

  }
  activeSocket() {
    if (!!localStorage.getItem('user-eth')) {
      this.userLogin = localStorage.getItem('user-eth')
      this.me()
      this._socket.on('error').pipe(this.un).subscribe((e: any) => {
        if (!e.ok) {
          localStorage.removeItem('token')
          localStorage.removeItem('eth-token')
          localStorage.removeItem('user-eth')
          this.router.navigate(['/packages'])
          this._socket.disconnect()
          this.login = false
          this._socket.update.emit(true)

          this._alert.show(from.bottom, aling.right, status.error, 'expired token you must start section again')
        }
      })
      this._socket.on('allUser').pipe(this.un).subscribe(resp => {
        // _('allUser', resp)
      })

      this.login = true
    } else {
      this.login = false
    }
    this.conect()
    this.disconext()
  }
  disconext() {
    this._socket.on("disconnect").pipe(this.un).subscribe(() => {
      this._alert.show(from.bottom, aling.right, status.error, 'Goodbye!! we will not see soon')
      this._socket.reconnect()
      this.activeSocket()
      this._socket.close.emit(false)
      this.router.navigate(['/packages'])
    });
  }
  conect() {
    this._socket.on("connect").pipe(this.un).subscribe((r: any) => {
      // _('conexxxion', r)
      this._socket.on('info').pipe(this.un).subscribe((resp: any) => {
        // _('info', resp)
        this._alert.show(from.bottom, aling.right, status.success, `Welcome!! ${resp.username}`)
        this._socket.close.emit(true)
        this.username = resp.username
      })
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
  }
}
