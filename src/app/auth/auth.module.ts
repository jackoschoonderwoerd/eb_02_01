import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthMaterialModule } from './auth-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    AuthRoutingModule, 
    FormsModule,
    AuthMaterialModule,
    FlexLayoutModule
  ]
})
export class AuthModule { }
