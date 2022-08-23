import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { DeleteBookComponent } from './admin/delete-book/delete-book.component';
import { HomeComponent } from './admin/home/home.component';
import { UpdateBookComponent } from './admin/update-book/update-book.component';
import { UserdetailsComponent } from './admin/userdetails/userdetails.component';
import { ViewBookComponent } from './admin/view-book/view-book.component';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { LibraryComponent } from './user/library/library.component';
import { NewuserComponent } from './user/newuser/newuser.component';
import { ViewuserComponent } from './user/viewuser/viewuser.component';

const routes: Routes = [

  {
    path: 'addbook',
    component: AddBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'deletebook',
    component: DeleteBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user',
    component: UserdetailsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'updatebook',
    component: UpdateBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'viewbook',
    component: ViewBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,

  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newuser',
    component: NewuserComponent,

  },
  {
    path: 'viewuser',
    component: ViewuserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    component: ViewBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component:LogoutComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
