import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes, declarations } from '.'
import { ComponentsModule } from '@components/components.module';
import { ServicesModule } from '@services/service.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes),
    ComponentsModule,
    ServicesModule
  ],
  declarations,
})

export class initModule { }
