
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { IconsComponent } from './icons.component';
const routes: Routes = [
    {
        path: 'icons',
        component: IconsComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [IconsComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class IconsModule { }

