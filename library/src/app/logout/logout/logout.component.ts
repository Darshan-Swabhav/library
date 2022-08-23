import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/library.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public libservice: LibraryService,private router: Router) { }

  ngOnInit(): void {

this.logout()
  }
  logout(){
    localStorage.removeItem("jwttoken");
    this.router.navigate(['/login'])
  }
}


