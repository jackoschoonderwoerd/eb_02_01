import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyMaterialModule } from './company-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderDetailComponent } from './bar/order-detail/order-detail.component';



@NgModule({
  declarations: [
    BarComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CompanyMaterialModule,
    FlexLayoutModule
  ]
})
export class CompanyModule { }
