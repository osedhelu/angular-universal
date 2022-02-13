import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@environments/environment.hmr';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { AuthService } from '@services/auth.service';
import { Web3Service } from '@services/web3Service/web3.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenService } from './_.service';

@Component({
  selector: 'app-sample',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit, OnDestroy {
  _unsubscribeall: Subject<any>
  un: any
  tokens: any[] = [{ status: false, img: '/public/package/1.jpg', name: 'token1', Price: 330000, Favorite: true, ID: 1, }]
  currentToken: any = {}
  popupVisible: boolean = false
  btn_Compra: boolean = false
  dimencion = 660
  ADD_TO_FAVORITES = 'buy this pack';
  REMOVE_FROM_FAVORITES = 'Remove from Favorites';

  screen(width): any {
    if (width > 700) {
      // this.dimencion = 660
    }
    if (width < 500) {
      // this.dimencion = 300
    }
    return (width < 700) ? 'sm' : 'lg';
  }
  constructor(
    private _service: TokenService,
    private _alert: AlertService,
    private _auth: AuthService,
    private _web3: Web3Service

  ) { }

  ngOnInit(): void {
    this._unsubscribeall = new Subject();
    this.un = takeUntil(this._unsubscribeall);
    this.allToken()
  }
  allToken() {
    this._service.get().pipe(this.un).subscribe((result: any) => {
      this.tokens = result.data
      console.log(result)
    })

  }
  async descriptionToken(e: any) {
    this.currentToken = e;
    this.popupVisible = true;
    this.btn_Compra = false
    console.log(e)
    if (e.status_Venta) {
      this._alert.show(from.bottom, aling.right, status.info, 'Este paquete ya fue vendido')
      return
    }
    if (!e.active) {

    }
    // this.ipackageDetail = infoVenta.data
    ////
    // this.popupFram = true
  }
  async changeFavoriteState(e) {
    console.log(e)
    try {
      if (!!localStorage.getItem('eth-token') && !!localStorage.getItem('user-eth')) {
        await this._auth.validateToken()
        this.btn_Compra = true
        const address = await this._web3.getAccount()
        const { web3 } = this._web3;
        const contract = await this._web3.getContract()
        const decimals = await contract.methods.decimals().call();

        const price = this.currentToken.price.toString()
        let priceDecimal = price.padEnd(Number(decimals) + price.length, '0')

        const amount = web3.utils.toBN(priceDecimal)
        let data = await contract.methods.transfer(environment.wallet1, amount).send({
          from: address, gasLimit: 60000,
          value: 0
        })
        this.currentToken.active = !this.currentToken.active

        this.popupVisible = false
        this.allToken()

        this._alert.show(from.top, aling.center, status.success, 'Successful Purchase')
      } else {
        this.popupVisible = false
        // notify('inicia seccion primero')
        this._alert.show(from.top, aling.center, status.info, 'Connect your metamask wallet')
        this._web3.connect()
      }
      // 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
      // const favoriteState = !this.currentHouse.Favorite;
      // const message = `This item has been ${favoriteState ? 'added to' : 'removed from'
      // } the Favorites list!`;
      // this.currentHouse.Favorite = favoriteState;
      // 
      // notify({
      // message,
      // width: 450,
      // },
      // favoriteState ? 'success' : 'error',
      // 2000);

    } catch (err) {
      console.error(err)
      if (err.code === 4001) {
        this.popupVisible = false
      }
    }

  }
  ngOnDestroy(): void {
    this._unsubscribeall.next()
    this._unsubscribeall.complete()
    this._unsubscribeall.unsubscribe()
  }
}
