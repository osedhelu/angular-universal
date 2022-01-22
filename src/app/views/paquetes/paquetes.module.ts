
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { paquetesComponent } from './paquetes.component';
const routes: Routes = [
    {
        path: '',
        component: paquetesComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [paquetesComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

