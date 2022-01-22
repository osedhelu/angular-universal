
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { PackagesComponent } from './packages.component';
import { DxPopupModule } from 'devextreme-angular/ui/popup'
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxTemplateModule } from 'devextreme-angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxResponsiveBoxModule } from 'devextreme-angular/ui/responsive-box';

const routes: Routes = [
    {
        path: '',
        component: PackagesComponent,
        canActivate: [MetamaskGuard],
    }
];
@NgModule({
    declarations: [PackagesComponent],
    imports: [
        CommonModule,
        DxButtonModule, DxPopoverModule,
        DxResponsiveBoxModule,
        DxPopupModule,
        DxTemplateModule,
        DxScrollViewModule,
        RouterModule.forChild(routes),
    ],

})

export class PackagesModule { }

