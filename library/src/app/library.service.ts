import { Injectable } from '@angular/core';
import {  HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http:HttpClient) { }

  

  getdata(){
    let url="";
    return this.http.get(url)
  }
  public login(data: any){
    let url="http://localhost:4008/loginpage";
    return this.http.post(url,data,{observe:"response"})
  }
  public loggedin(){
    return localStorage.getItem('jwttoken')
    
  }
 userdata(){
  let url="http://localhost:4008/api/user/display";
  return this.http.get(url)
 }
 updateuser(index: number,data :any){
  let url="http://localhost:4008/api/user/update/"+index
  return this.http.put(url,data)
 }
 deleteuser(data:any){
  // console.log("inside delete user service");
  
  let url="http://localhost:4008/api/user/delete/"+data
  // console.log("inside delete user service", url);
  return this.http.delete(url)
 }
 soleuser(data:any){
  let url="http://localhost:4008/api/user/soleuser/"+data
  // console.log("inside sole user service", url);
  return this.http.get(url)
 }
}
