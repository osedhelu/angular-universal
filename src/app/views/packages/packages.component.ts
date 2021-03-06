import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { AuthService } from '@services/auth.service';
import { TransactionService } from '@services/transaction/transaction.service';
import { Web3Service } from '@services/web3Service/web3.service';
import { iPackage, PackagesService } from '@services/PackagesService/packages.service';
import { FarmsService } from '@services/FarmsService/farms.service'
import { countdown } from '@utils/coundow.utils';
import { environment } from '@environments/environment.hmr';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { environment } from '@environments/environment';

@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit, OnDestroy {
    _unsubscribeAll: any;
    un: any
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
    HOURS: number = 0
    MINUTES: number = 0
    SECONDS: number = 0
    callback: any
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
        this._unsubscribeAll = new Subject();
        this.un = takeUntil(this._unsubscribeAll);
    }


    ngOnInit() {
        // this._alert.show(from.bottom, aling.right, status.success, 'bue')
        // const aa = sumar_horas({ fecha: new Date(), horas: 24 })
        // const date = new Date('2022-4-02')
        this.getPack()
    }
    getPack() {
        this._package.get().pipe(this.un).subscribe((resp: any) => {
            this.data = resp.data
            this.houses = resp.data

            this.currentHouse = this.houses[0];
        })

    }
    async showHouse(packageo: iPackage) {
        try {
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
                const { bookDaily } = infoVenta.data
                for (let i = 0; i < bookDaily.length; i++) {
                    const daily = bookDaily[i]
                    if (daily.complete === 0) {
                        this.recorerTime(new Date(daily.transaction.createdAt))
                        break;
                    }
                }
                this.ipackageDetail = infoVenta.data
                ////
                this.popupFram = true
            }
        } catch (e) {
            console.error(e)
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
                let data = await contract.methods.transfer(environment.wallet1, amount).send({
                    from: address, gasLimit: 60000,
                    value: 0
                })
                this.currentHouse.Favorite = !this.currentHouse.Favorite

                this.popupVisible = false
                this.getPack()

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
    recorerTime(fecha: Date) {
        if (this.callback) {
            clearInterval(this.callback)
        }
        this.callback = countdown(fecha, (r) => {
            this.HOURS = r.hours
            this.MINUTES = r.minutes
            this.SECONDS = r.seconds
        }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS)
    }

    ngOnDestroy(): void {
        if (this.callback) {
            clearInterval(this.callback)
        }
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._unsubscribeAll.unsubscribe();

    }
}
