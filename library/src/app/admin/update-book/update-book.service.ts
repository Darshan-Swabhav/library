import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateBookService {

constructor(private http:HttpClient) { }
getdata(){
  let url="http://localhost:4008/api/books/display";
  return this.http.get(url)

}

updatebook(id:number,data:any ){
console.log("id value in service:",id);
  let url="http://localhost:4008/api/books/update/"+id;
  console.log("data in urlservice:",data);          
  console.log("url is:",url)
  return this.http.put(url,data)
  
}

}