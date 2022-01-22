
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { TableListComponent } from './table-list.component';
const routes: Routes = [
    {
        path: '',
        component: TableListComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [TableListComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

