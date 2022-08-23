import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewBookService {

  constructor(private http:HttpClient) { }


  getdata(){
    let url="http://localhost:4008/api/books/display";
    return this.http.get(url)

}
}
// 