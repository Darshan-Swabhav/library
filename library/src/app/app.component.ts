import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LibraryService } from "./library.service"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library';
  setdata = false;
  token=JSON.parse(localStorage.getItem("jwttoken") || '{}');
 
  
  
 
}



