import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import {  HttpClientModule } from "@angular/common/http";
import { LibraryComponent } from './user/library/library.component';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';



@NgModule({
  declarations: [
    AppComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   AdminModule,
    LoginModule,
   HttpClientModule,
    UserModule,
    NavbarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
