import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteBookService {

  constructor(private http:HttpClient) { }
  getdata(){
    let url="http://localhost:4008/api/books/display";
    return this.http.get(url)

}

deletebook(id:number ){
  console.log("id value in service:",id);
    let url="http://localhost:4008/api/book/delete/"+id;
                 
    console.log("url is:",url)
    return this.http.delete(url)
    
    
}
}