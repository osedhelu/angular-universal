
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { PageNotFoundComponent } from './PageNotFound.component';
const routes: Routes = [
    {
        path: '',
        component: PageNotFoundComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

