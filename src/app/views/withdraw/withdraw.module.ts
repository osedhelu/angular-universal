
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { WithdarwComponent } from './withdraw.component';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxResponsiveBoxModule } from 'devextreme-angular/ui/responsive-box';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: 'withdraw',
        component: WithdarwComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [WithdarwComponent],
    imports: [
        RouterModule.forChild(routes),
        DxScrollViewModule,
        DxResponsiveBoxModule,
        DxButtonModule,
        CommonModule
    ],

})

export class WithdrawModule { }

