
import { Routes } from '@angular/router';
import { InitComponent } from './init.component';
export const appRoutes: Routes = [
    {
        path: '',
        component: InitComponent,
        children: [
            {
                path: "dashboard",
                loadChildren: () => import("./dashboard/dashboard.module").then(
                    (m) => m.DashboardModule
                ),
            },
            {
                path: 'packages',
                loadChildren: () => import("./packages/packages.module").then((m) => m.PackagesModule)
            },
            {
                path: '',
                loadChildren: () => import('./signup/signup.module').then((m) => m.SignupdModule)
            },
            {
                path: '',
                loadChildren: () => import('@views/diagram/diagram.module').then((m) => m.DiagramModule)
            },
            {
                path: '',
                loadChildren: () => import('@views/invoice/invoice.module').then((m) => m.invoiceModule)
            },
            {
                path: '',
                loadChildren: () => import('@views/icons/icons.module').then((m) => m.IconsModule)
            },
            {
                path: '',
                loadChildren: () => import('@views/farms/farms.module').then((m) => m.FarmsModule)
            },
            {
                path: '',
                loadChildren: () => import('@views/withdraw/withdraw.module').then((m) => m.WithdrawModule)
            }
        ]
    }
]

export const declarations = [
    InitComponent
]

