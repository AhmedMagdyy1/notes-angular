import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formIsInvalid:boolean = false
  apiError:string = ''
  isLoading:boolean = false


  loginForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)])
  })
  constructor(private route:Router,private _authService:AuthService){}

  navigateToSignUpComponent(){
  this.route.navigateByUrl("signup")
  }


  handleLogin(form:FormGroup){
    console.log(form);
    this.apiError = ''
    // to make the user can't click
    if (form.valid && !this.isLoading){
      this.isLoading = true
      // api call here
      this._authService.handleSignIn(form.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.msg == 'done'){
            localStorage.setItem('token','3b8ny__'+res.token)
            this._authService.setUserToken()
            this.route.navigate(['notes'])
          }
        },
        error:(err)=>{
          console.log(err);
          this.apiError = err.error.msg
          this.isLoading = false
        }
      })
    }else {
      this.formIsInvalid = true
      this.isLoading = false
    }
  }
}

