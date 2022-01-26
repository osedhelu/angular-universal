
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DashboardComponent } from './dashboard.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DxChartModule, DxPieChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [DashboardComponent],
    imports: [
        NgbDropdownModule,
        RouterModule.forChild(routes),
        DxChartModule,
        DxSelectBoxModule,
        DxPieChartModule,
        CommonModule

    ],
    providers: [DashboardService]

})

export class DashboardModule { }

