
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxDiagramModule } from 'devextreme-angular/ui/diagram';
import { DiagramComponent } from './diagram.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: 'diagram',
        component: DiagramComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [DiagramComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxDiagramModule,
        DxPopupModule
    ],

})

export class DiagramModule { }

