
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DxButtonModule, DxListModule, DxTileViewModule } from 'devextreme-angular';
import { allBuyandSellComponent } from './allBuyandSell.component';
import { allBuyandSellService } from './allBuyandSell.service'
const routes: Routes = [
    {
        path: 'allBuyandSell',
        component: allBuyandSellComponent,
        // canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [allBuyandSellComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxTileViewModule,
        DxButtonModule,
        DxListModule
    ],
    providers: [
        allBuyandSellService
    ]

})

export class allBuyandSellModule { }

