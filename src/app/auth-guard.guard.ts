import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // return localStorage.getItem('token') ? true : false

  // in case i want it to route 
  let _router = inject(Router)
  let _auth = inject(AuthService)

  // if (_auth.userToken.getValue() !== null)
  if (localStorage.getItem('token')){
    return true
  }else {
    _router.navigate(['signin'])
    return false
  }
};
