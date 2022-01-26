
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { FarmsComponent } from './farms.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxAccordionModule } from 'devextreme-angular/ui/accordion'
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: 'farms',
        component: FarmsComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [FarmsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxDataGridModule,
        DxCheckBoxModule,
        DxAccordionModule
    ],

})

export class FarmsModule { }

