import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:BehaviorSubject<any>= new BehaviorSubject(null)
  constructor(private _httpClient:HttpClient,private _route:Router) {

    // if(localStorage.getItem('token')){
    //   this.userToken.next(JSON.stringify(localStorage.getItem('token')))
    // }

    // to handle refresh in any page
    this.setUserToken()
   }


  setUserToken(){
    let token  = localStorage.getItem('token')
    if (token !== null) {
      this.userToken.next(token)


      // if user is logged in already and refresh 
      // this._route.navigate(['/notes'])
    }
    // let decodedToken = jwtDecode(token)
    // console.log(decodedToken);
    
  }

  handleSignOut(userInfo:UserData):Observable<any>{
    return this._httpClient.post(environment.baseUrl +'signUp',userInfo)
  }

  handleSignIn(userLogin:UserData):Observable<any>{
    return this._httpClient.post(environment.baseUrl +'signIn',userLogin)
  }

  signOut(){
    localStorage.removeItem('token')
    this.userToken.next('')
    this._route.navigate(['signin'])
  }
}
