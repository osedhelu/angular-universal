
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { ToastrModule } from 'ngx-toastr';
import { TypographyComponent } from './typography.component';
const routes: Routes = [
    {
        path: '',
        component: TypographyComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [TypographyComponent],
    imports: [
        ToastrModule.forRoot(),
        RouterModule.forChild(routes),
    ],

})

export class DashboardModule { }

