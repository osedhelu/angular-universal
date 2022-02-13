
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { userEditComponent } from './userEdit.component';
import { UserEditService } from './_.service';
const routes: Routes = [
    {
        path: 'UserEdit',
        component: userEditComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [userEditComponent],
    imports: [
        RouterModule.forChild(routes),
        DxDataGridModule,
        DxButtonModule,
        CommonModule
    ],
    providers: [UserEditService]
})

export class userEditModule { }