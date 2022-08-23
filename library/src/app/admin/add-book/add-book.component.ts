import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddBookService } from './add-book.service';

interface book {
  name: string;
  author: string;
  quantity: number;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  books: any
  book;
 
  constructor(private formBuilder: FormBuilder, private addbookservice: AddBookService) {
    this.book = formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],

    }
    )
  }

  ngOnInit(): void {
  }

  addbook() {
    // console.log(" thisbook print" , this.book)
    
 
   
    // console.log("book detail", this.book);
    this.addbookservice.newbook(this.book.value).subscribe((addbook) => {
      this.book.reset();
    })

//
  }
}
