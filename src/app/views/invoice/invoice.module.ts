
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { InvoiceComponent } from './invoice.component';
const routes: Routes = [
    {
        path: 'invoice',
        component: InvoiceComponent,
        canActivate: [AuthGuard, MetamaskGuard],
    }
];
@NgModule({
    declarations: [InvoiceComponent],
    imports: [
        RouterModule.forChild(routes),
    ],

})

export class invoiceModule { }

