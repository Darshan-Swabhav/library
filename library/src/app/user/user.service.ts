import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }


  getdata(){
const httpheaders=new HttpHeaders();
    let url="http://localhost:4008/api/books/display";
    return this.http.get(url,{headers:httpheaders})

}
rentbook(data: any){
  let url="http://localhost:4008/api/userbook/new";
  return this.http.post(url,data)
}
newuser(data: any){
  // console.log("data reaching newuser link:",data);
  
  let url="http://localhost:4008/api/user/new";
  return this.http.post(url,data)
}
userbooks(data:any){
  let url="http://localhost:4008/api/userbook/display/"+data;
  // console.log(url,"urlPrint")
  return this.http.get(url)
}
returnbook(data:any){
  let url="http://localhost:4008/api/userbook/delete/"+data;
  return this.http.delete(url,data)
}
}
