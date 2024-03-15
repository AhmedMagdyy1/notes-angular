import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  formIsInvalid:boolean = false
  apiError:string = ''
  isLoading:boolean = false
  registerForm:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    age:new FormControl('',Validators.required),
  })
  constructor(private route:Router,private _authService:AuthService ){}
  
  navigateToSignInComponent(){
    this.route.navigateByUrl("signin")
  }

  handleRegister(form:FormGroup){
    console.log(form);
    this.apiError = ''
    // to make the user can't click
    if (form.valid && !this.isLoading){
      this.isLoading = true
      // api call here
      this._authService.handleSignOut(form.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.msg == 'done'){
            this.route.navigate(['signin'])
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
