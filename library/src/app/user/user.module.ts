import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryComponent } from './library/library.component';
import { NewuserComponent } from './newuser/newuser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    LibraryComponent,
    NewuserComponent,
    ViewuserComponent,
    
   
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    LoginModule,
  ],
  exports:[
    LibraryComponent,
    NewuserComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
