import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  decodedtoken: any;
  jwttoken: JwtHelperService = new JwtHelperService;

  constructor() { }

  ngOnInit(): void {
    var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));
    // console.log(jwt, "check token print");
    if (jwt != null) {
      this.decodedtoken = this.jwttoken.decodeToken(jwt)
      // console.log("decodec token print:", this.decodedtoken);
    } else {
      // console.log("empty")
    }
  }
  login() {
    throw new Error('Method not implemented.');
  }

}
