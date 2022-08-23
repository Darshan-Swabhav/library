import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddBookService } from '../add-book/add-book.service';
import { book } from '../view-book/book-class';
import { UpdateBookService } from './update-book.service';

interface books {
  id:string;
  name: string;
  author: string;
  quantity: number;
}



@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
toggle:boolean=false;
  globalindex!: number;
  book;
  updatebookservice: any;


  constructor(private formBuilder: FormBuilder, private addbookservice: AddBookService, private updatebook: UpdateBookService) {
    this.book = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      author: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],

    }
    )
  }
  books: any
  ngOnInit(): void {
    this.getdata(this.books)
  }


  getdata(books: any) {
    this.updatebook.getdata().subscribe(data => {
      this.books = data;
      // console.log("books hrint here", this.books)
    })
  }


  update(index: number) {
    // console.log("books in uppadte", this.books);
    // console.log("index",index)


for (let i = 0; i < this.books.length; i++) {
  if (this.books[i].ID==index) {
    index=i
    // console.log("books in loop", this.books[index].ID );
    
  }
  
}

    // console.log("books in uppadte", this.books[index].ID );
    
    this.toggle=true
    const element = this.books[index];

    // console.log(element, "element print")

    this.globalindex=element.ID
    this.book.patchValue({
      id: element.id,
      name: element.name,
      author: element.author,
      quantity: element.quantity,
    });

  }
  updatebtn() {
    // console.log(" book value" , this.book.value)
    console.log("index captured",this.globalindex)



  // this.updatebook.updatebook(this.globalindex,this.book.value).subscribe({
  //   next(value) {
  //       // console.log("valuein next",value);
        
  //   },
  //   error(err) {
  //       console.error(err);
        
  //   },
    
  // },
  // )

  this.updatebook.updatebook(this.globalindex,this.book.value).subscribe(data => {
    this.books = data;
    // console.log("books hrint here", this.books)
    this.getdata(this.books)
  })

  this.book.reset()
   this.toggle=false
 
  }
}
