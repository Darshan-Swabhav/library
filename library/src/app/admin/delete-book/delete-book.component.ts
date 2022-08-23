import { Component, OnInit } from '@angular/core';
import { DeleteBookService } from './delete-book.service';


@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
 

  constructor( private deletebook: DeleteBookService) { }
books:any
  ngOnInit(): void {
    this.getdata(this.books) 
  
  }
 
getdata(books:any){
  this.deletebook.getdata().subscribe(data=>{
    this.books=data;
    // console.log("books hrint here",this.books)
   
  })


}
remove(index: number){
  // console.log("index captured",index)
    this.deletebook.deletebook(index).subscribe({
      next(value) {
          // console.log(value);
      },
      error(err) {
          console.error(err);
          
      },
    })
  this.getdata(this.books) 
  
}
}