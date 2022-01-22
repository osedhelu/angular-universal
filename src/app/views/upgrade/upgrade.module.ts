
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { UpgradeComponent } from './upgrade.component';
const routes: Routes = [
    {
        path: '',
        component: UpgradeComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [UpgradeComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

