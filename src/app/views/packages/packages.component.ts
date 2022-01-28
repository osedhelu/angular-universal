import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { AuthService } from '@services/auth.service';
import { TransactionService } from '@services/transaction/transaction.service';
import { Web3Service } from '@services/web3Service/web3.service';
import { iPackage, PackagesService } from '@services/PackagesService/packages.service';
import { FarmsService } from '@services/FarmsService/farms.service'

@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
    houses: iPackage[];
    data: any[] = []
    currentHouse: iPackage;
    btnComprar: boolean = true
    popupVisible = false;
    ADD_TO_FAVORITES = 'buy this pack';
    REMOVE_FROM_FAVORITES = 'Remove from Favorites';
    dimencion: number = 660
    popupFram: boolean = false;
    ipackageDetail: any = {}
    screen(width): any {
        if (width > 700) {
            this.dimencion = 660
        }
        if (width < 500) {
            this.dimencion = 300
        }
        return (width < 700) ? 'sm' : 'lg';
    }
    constructor(private _package: PackagesService,
        private _venta: FarmsService,
        private _alert: AlertService, private _web3: Web3Service, private _tran: TransactionService, private _auth: AuthService, private router: Router) {
        this.screen = this.screen.bind(this)
    }


    ngOnInit() {
        // this._alert.show(from.bottom, aling.right, status.success, 'bue')

        this.getPack()
    }
    getPack() {
        this._package.get().subscribe((resp: any) => {
            this.data = resp.data
            this.houses = resp.data

            this.currentHouse = this.houses[0];
        })

    }
    async showHouse(packageo: iPackage) {
        try {
            console.log(packageo)
            if (packageo.status) {
                this._alert.show(from.bottom, aling.right, status.info, 'Este paquete ya fue vendido')
                return
            }
            if (!packageo.Favorite) {
                this.currentHouse = packageo;
                this.popupVisible = true;
                this.btnComprar = false
            } else {
                this.currentHouse = packageo;
                const infoVenta = await this._venta.getVentasToPackage(packageo?._id)
                console.log('info Venta ', infoVenta)
                this.ipackageDetail = infoVenta.data
                ////
                this.popupFram = true
            }
        } catch (e) {
            console.log('line: 60', e)
        }

    }

    async changeFavoriteState(data) {
        try {
            if (!!localStorage.getItem('eth-token') && !!localStorage.getItem('user-eth')) {
                await this._auth.validateToken()
                this.btnComprar = true
                const address = await this._web3.getAccount()
                const { web3 } = this._web3;
                const contract = await this._web3.getContract()
                const decimals = await contract.methods.decimals().call();

                const price = this.currentHouse.Price.toString()
                let priceDecimal = price.padEnd(Number(decimals) + price.length, '0')

                const amount = web3.utils.toBN(priceDecimal)
                let data = await contract.methods.transfer('0x6c80d5fC5d1758dE0248f49128CF1690e688dadc', amount).send({
                    from: address, gasLimit: 60000,
                    value: 0
                })
                this.currentHouse.Favorite = !this.currentHouse.Favorite

                this.popupVisible = false
                this.getPack()

                this._alert.show(from.top, aling.center, status.success, 'Listo')
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
            console.log('holaaaa', err)
            if (err.code === 4001) {
                this.popupVisible = false
            }
        }
    }

}
