
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        // canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [DashboardComponent],
    imports: [
        ChartsModule,
        NgbDropdownModule,
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

