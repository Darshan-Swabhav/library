import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {  HttpClientModule } from "@angular/common/http";
import { UpdateBookComponent } from './update-book/update-book.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddBookComponent,
    ViewBookComponent,
    DeleteBookComponent,
    UpdateBookComponent,
    UserdetailsComponent,
 
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports:[
    AddBookComponent,
    DeleteBookComponent,
    HomeComponent,
    ViewBookComponent,
    UpdateBookComponent,
    UserdetailsComponent,
  ],

})
export class AdminModule { }
