import { Component, OnInit } from '@angular/core';
import { ViewBookService } from './view-book.service';
interface books{
  ID:number,
  CreatedAt:string,
  UpdatedAt:string,
  DeletedAt:string,
  id:string,
  name:string,
  author:string,
  quantity:number
}

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
 books:any
  constructor(private book:ViewBookService) { 
    this.book.getdata().subscribe(data=>{
      this.books=data;
      // console.log("books hrint here",this.books)
    }
     
      )
      
 

  }

  ngOnInit(): void {
    this.book.getdata().subscribe(data=>{
      this.books=data;
      // console.log("books hrint here",this.books)
      this.getdata(this.books) 
    
    })
  }
 
getdata(books:any){


  // console.log("book outside",this.books)

}


}
