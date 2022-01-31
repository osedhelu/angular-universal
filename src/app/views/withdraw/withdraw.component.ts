import { Component, OnInit } from '@angular/core';
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
  dimencion: number = 660
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
  popupVisible: boolean = false
  balaceneDetail: any[] = []
  screen(width): any {

    return (width < 700) ? 'sm' : 'lg';
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
        to: '0x6c80d5fC5d1758dE0248f49128CF1690e688dadc',
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
