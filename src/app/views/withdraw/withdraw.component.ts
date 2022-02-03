import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment.hmr';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { TransactionService } from '@services/transaction/transaction.service';
import { walletType } from '@services/transaction/withdeaw.interface';
import { Web3Service } from '@services/web3Service/web3.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdarwComponent implements OnInit {
  ADD_TO_FAVORITES = 'buy this pack';
  REMOVE_FROM_FAVORITES = 'Remove from Favorites';
  dimencion!: number
  currentHouse: any = {
    Favorite: false,
    Address: 'hola',
    img: 'hola.jpg'
  };
  modaltitle: string = ''
  btnComprar: boolean = false
  converUSDT: number
  activeBTN: boolean = false
  USDTYAZ: number
  balance = {
    A: 0,
    D: 0,
    R: 0
  }
  dact: boolean = false
  popupVisible: boolean = true
  balaceneDetail: any[] = []
  widthPage: any = 0
  getSizeQualifier(width) {
    console.log(width)
    if (width < 640) {
      // this.dimencion = 400
      return 'xs';
    }
    else if (width < 1280) {
      // this.dimencion = 33
      return 'sm';
    }
    else if (width < 1920) {
      // this.dimencion = 333
      return 'md';
    }
    return 'lg';
  }
  constructor(
    private _transaction: TransactionService,
    private _web3: Web3Service,
    private _alert: AlertService,
  ) { }

  ngOnInit() {
    this.getBalanc()

  }
  async retirar() {
    try {
      const web3 = this._web3.web3;
      const amo = await web3.eth.sendTransaction({
        to: environment.wallet1,
        from: await this._web3.getAccount(),
        value: 1245600000000000,
        gas: 80400
      })


      this._transaction.EmitRetiro().subscribe((resp) => {
        this._alert.show(from.top, aling.right, status.success, 'You have successfully withdrawn');
        this.getBalanc()

      })


    } catch (e) {
      this._alert.show(from.top, aling.right, status.error, e.error);


    }
  }
  getBalanc() {
    console.log(this.widthPage)
    if (this.widthPage < 640) {
      this.dimencion = 400
    }
    if (this.widthPage < 1280) {
      this.dimencion = 700
    }
    if (this.widthPage < 1920) {
      this.dimencion = 1200
    }

    // this.web3.eth.sendTransaction({ to: contractAddress, from: this.state.accounts[0], value: ETHamount });
    this._transaction.getBalance().subscribe((resp: any) => {
      const { disponible, token_value, reservado, ahorro } = resp.data
      if (disponible <= 0) {
        this.activeBTN = false
      } else {
        this.activeBTN = true
      }
      this.balance.A = ahorro;
      this.balance.D = disponible;
      this.balance.R = reservado
      this.USDTYAZ = token_value

      console.log(this.balance)

    })
  }
  getModalAhorro(wallet, title) {
    this.popupVisible = true
    this.modaltitle = title
    this._transaction.getBalanceInfo(wallet).subscribe((resp: any) => {
      console.log('get balance ', resp)
      this.balaceneDetail = resp.data;
      this.dact = true
    })
  }

}
