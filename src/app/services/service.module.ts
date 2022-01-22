
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    providers
} from '.';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../helpers/error.interceptor';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [...providers,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class ServicesModule { }
