import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {JwtHelperService}  from '@auth0/angular-jwt';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports:[
    LoginPageComponent,
  ]
})
export class LoginModule { }
