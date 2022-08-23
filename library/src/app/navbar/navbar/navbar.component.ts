import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LibraryService } from '../../library.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userrole!: boolean;
  user: any
  jwttoken = new JwtHelperService;

  decodedtoken: any;
  navbar!:boolean;
  constructor(private userserive: LibraryService,private router:Router) {
    this.userserive.soleuser(this.decodedtoken).subscribe(data => {
      this.user = data;
      // console.log("user hrint here", this.user)
    }

    )

  }
  ngOnInit(): void {
    var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));
    var isadmin
    // console.log(jwt, "check token print");
    if (localStorage.getItem("jwttoken") !=null) {
      this.decodedtoken = this.jwttoken.decodeToken(jwt)
      // console.log("decodec token print:", this.decodedtoken);
      isadmin = this.decodedtoken.Role
      // console.log("isAdmin Value in:", this.decodedtoken.Role);
      this.navbar=true
      this.userserive.soleuser(this.decodedtoken.UID).subscribe(data => {
        this.user = data;
        // console.log("data", data)
        // console.log("userrole", this.user)
        this.userrole=this.user.isadmin
      })
    }
    // else
    // {
    //   this.navbar=false
    //   this.ngOnInit
    // }
  }




}