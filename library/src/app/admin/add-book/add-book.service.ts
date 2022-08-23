import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {

  constructor(private http:HttpClient) { }


 
  newbook(data: any){
    let url="http://localhost:4008/api/books/new";
    return this.http.post(url,data)
  }
}