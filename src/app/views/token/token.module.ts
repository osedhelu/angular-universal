import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/guard/auth.guard';
import { MetamaskGuard } from '@services/guard/authMetamask.guard';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { TokenComponent } from './token.component';
import { TokenService } from './_.service';
const routes: Routes = [
    {
        path: 'token',
        component: TokenComponent,
        canActivate: [MetamaskGuard],
    }
];
@NgModule({
    declarations: [TokenComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        DxPopupModule,
        DxButtonModule

    ],
    providers: [TokenService],


})

export class TokenModule { }

