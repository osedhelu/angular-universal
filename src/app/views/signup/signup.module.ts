import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { SignupComponent } from './signup.component';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxAutocompleteModule } from 'devextreme-angular/ui/autocomplete';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
const routes: Routes = [
    {
        path: 'signup/:id',
        component: SignupComponent,
        canActivate: [MetamaskGuard],
    }
];
@NgModule({
    declarations: [SignupComponent],

    imports: [
        RouterModule.forChild(routes),
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxButtonModule,
        DxFormModule,
        DxAutocompleteModule,
        DxTextBoxModule
    ],

})

export class SignupdModule { }

