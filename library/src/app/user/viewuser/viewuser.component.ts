import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  userrole!: boolean;
  
  jwttoken = new JwtHelperService;

  decodedtoken: any;
  user:any;
  constructor(private userserive: LibraryService) {
    this.userserive.soleuser(this.decodedtoken).subscribe(data => {
       this.user = data;
      
    }

    )

  }
  ngOnInit(): void {
    var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));
    var isadmin
    // console.log(jwt, "check token print");
    if (jwt != null) {
      this.decodedtoken = this.jwttoken.decodeToken(jwt)
      // console.log("decodec token print:", this.decodedtoken);
      isadmin = this.decodedtoken.Role
      // console.log("isAdmin Value in:", this.decodedtoken.Role);



      this.userserive.soleuser(this.decodedtoken.UID).subscribe(data => {
        this.user = data;
        // console.log("data", data)
        // console.log("userrole", this.user)
        
      })


    }

  }


}
