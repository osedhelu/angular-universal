
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { FarmsComponent } from './farms.component';
const routes: Routes = [
    {
        path: 'farms',
        component: FarmsComponent,
        // canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [FarmsComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class FarmsModule { }

