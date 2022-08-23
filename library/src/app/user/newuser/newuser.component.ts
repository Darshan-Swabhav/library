import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LibraryService } from 'src/app/library.service';
import { UserService } from '../user.service';
class userdata {
  username!: string;
  fname!: string;
  lname!: string
  password!: string
  address!: string
  gender!: boolean
  number!: number
  isadmin!: boolean
}
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  admin!: boolean;
  toggle: boolean = false;
  users: any
  user;
  role: any;
  jwttoken = new JwtHelperService;
  decodedtoken: any;
  userrole: any;
  constructor(private formBuilder: FormBuilder, private userservice: UserService, public libservice: LibraryService) {
    this.user = formBuilder.group({
      username: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', [Validators.required, Validators.min(7000000000), Validators.max(9999999999)]],
      isadmin: [false],

    }
    )
  }

  ngOnInit(): void {


    var jwt = (JSON.parse(localStorage.getItem("jwttoken") || '{}'));


    if (localStorage.getItem("jwttoken") != null) {
      this.decodedtoken = this.jwttoken.decodeToken(jwt)
      // console.log("decodec token print:", this.decodedtoken);
      this.admin = this.decodedtoken.Role
      // console.log("isAdmin Value in:", this.decodedtoken.Role);
    }

  }
  adduser() {
    // console.log(" thisuser print", this.user)
    this.user.patchValue({ isadmin: this.toggle })


    this.userservice.newuser(this.user.value).subscribe({
      next(value: any) {
        // console.log(value);
      },
      error(err: any) {
        console.error(err);
      }

    })
    this.user.reset();
  }
  onCheckboxChange(event: any) {
    console.log(event)
    if (event.target.checked) {
      this.toggle = true
    } else {
      this.toggle = false
    }
    console.log(" toggle value:", this.toggle);

  }
}


