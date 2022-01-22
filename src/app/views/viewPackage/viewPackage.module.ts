
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { ViewAllPackagesComponent } from './viewPackage.component';
const routes: Routes = [
    {
        path: '',
        component: ViewAllPackagesComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [ViewAllPackagesComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

