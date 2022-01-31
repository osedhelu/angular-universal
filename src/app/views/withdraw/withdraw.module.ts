
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { WithdarwComponent } from './withdraw.component';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxResponsiveBoxModule } from 'devextreme-angular/ui/responsive-box';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';
import { priceUSDT } from 'src/app/pipes/price.pipe';
import { DxDataGridModule, DxPopupModule } from 'devextreme-angular';

const routes: Routes = [
    {
        path: 'withdraw',
        component: WithdarwComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [WithdarwComponent, priceUSDT],
    imports: [
        RouterModule.forChild(routes),
        DxScrollViewModule,
        DxResponsiveBoxModule,
        DxPopupModule,
        DxButtonModule,
        CommonModule,
        DxDataGridModule
    ],

})

export class WithdrawModule { }

