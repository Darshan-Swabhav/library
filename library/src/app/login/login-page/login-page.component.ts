import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { flatMap } from 'rxjs';

import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  users: any
  user;
  jwttoken = new JwtHelperService;
  helper: Object | null | undefined;
  myHeaders = new Headers();
  decodedtoken: any;
  constructor(private formBuilder: FormBuilder, private libraryservice: LibraryService,public router:Router) {
    this.user = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    }
    )
  }

  ngOnInit(): void {


    this.checkfortoken()
  }

  login() {
    // console.log(" this user print", this.user)

    this.libraryservice.login(this.user.value).subscribe({
      next(value) {
        // console.log("value in next", value);
      },


      error(err) {
        console.error(err);

      },
    })

    this.libraryservice.login(this.user.value).subscribe(resp => {
      // console.log("service login response data", resp.body)
      this.helper = resp.body
      localStorage.setItem("jwttoken", JSON.stringify(resp.body));
    })
    // console.log("service login response outside data", this.helper)

    this.checkfortoken()
if ( (localStorage.getItem("jwttoken")  != null)) {
  var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));

  this.decodedtoken = this.jwttoken.decodeToken(jwt)
  console.log(this.decodedtoken);
  
  if (this.decodedtoken.Role){
    this.router.navigate(['/home'])
  }else{

    this.router.navigate(['/library'])
  }
}

   
  }

  checkfortoken() {
   
    // console.log(jwt, "check token print");
   
    if ( (localStorage.getItem("jwttoken")  != null)){
  var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));
}
    this.decodedtoken = this.jwttoken.decodeToken(jwt)
    console.log(this.decodedtoken);
    if ( (localStorage.getItem("jwttoken")  != null)) {
      if (this.decodedtoken.Role){
        this.router.navigate(['/home'])
      }else{
    
        this.router.navigate(['/library'])
      }

  }

}
}