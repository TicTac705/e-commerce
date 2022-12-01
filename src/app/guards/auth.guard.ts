import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import {TOKEN_KEY} from "../services/api/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  canActivate() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(["sign-in"]).then();
    return false;
  }
}
