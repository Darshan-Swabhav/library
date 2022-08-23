import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LibraryService } from 'src/app/library.service';
import { UserService } from '../user.service';

interface rentbook{
  userid:string
  bookid:string
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  userid: any  ;
  user:any;
  books: any
  usertoken:any;
  currentDate: Date = new Date();
  jwttoken = new JwtHelperService; 
  userbooks:any
  limit:boolean=true
  decodedtoken: any;
  constructor(private book: UserService,private rentbook:UserService,public library:LibraryService,public router:Router) {
    this.book.getdata().subscribe(data => {
      this.books = data;
      // console.log("books hrint here", this.books)
    }

    )

  }

  ngOnInit(): void {
    
   this.usertoken= this.library.loggedin()
  //  console.log(this.usertoken,"token print in lib init")
    this.checkfortoken(this.usertoken)
    this.getuserbooks()

    this.book.getdata().subscribe(data => {
      this.books = data;
      // console.log("books print on inot:", this.books)
      this.getdata(this.books)

    })
    this.library.soleuser(this.decodedtoken.UID).subscribe(data => {
      this.user = data;
      // console.log("data", data)
      // console.log("userrole", this.user)
      
    })
  }
  checkfortoken(jwt:any) {
 
    // console.log(jwt, "check token in library");
    if (jwt!=null) {
     this.decodedtoken=this.jwttoken.decodeToken(jwt)
    //  console.log("decodec token in library:",this.decodedtoken);
    }
    
   
  }
  getdata(books: any) {

  }
  add(bid: string) {
   
    // console.log("id print:", bid);
    let rentbook:rentbook={
      userid:this.decodedtoken.UID,
      bookid: bid
    }
    // console.log(rentbook,"rentbook data");
    
    this.rentbook.rentbook(rentbook).subscribe({
      next(value) {
        // console.log(value);
      },
      error(err) {
        console.error(err);


      }
  })
  this.getuserbooks
  this.getdata
}
getuserbooks(){



  this.book.userbooks(this.decodedtoken.UID).subscribe(data => {
    this.userbooks = data;
    // console.log("books length here", this.userbooks.length)
    this.library.soleuser(this.decodedtoken.UID).subscribe(data => {
      this.user = data;
      // console.log("data", data)
      // console.log("userrole", this.user)
      if(this.userbooks.length<5   && this.user.dues<50){
        this.limit=false
      }else{
        this.limit=true
      }
    })

  
    // if(this.userbooks.length<5   && this.user.dues<50){
    //   this.limit=false
    // }else{
    //   this.limit=true
    // }
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    // console.log("current date", this.currentDate)
    for (let i = 0; i < this.userbooks.length; i++) {
      const element = this.userbooks[i].CreatedAt;
      // console.log("createed  date", this.userbooks[i].CreatedAt)
      if(this.currentDate>element) {
   
      }
      
    }
   
    // console.log("userbooks data  here", this.userbooks)

  })
}





return(bid:string){
  // console.log("id print:", bid);
  this.rentbook.returnbook(bid).subscribe({
    next(value) {
      // console.log(value);
    },
    error(err) {
      console.error(err);


    }

})
this.getuserbooks
}

}
