
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { __Component } from './__.component';
const routes: Routes = [
    {
        path: '',
        component: __Component,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [__Component],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

