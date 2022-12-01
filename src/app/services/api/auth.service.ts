import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

import configUrl from "../../../assets/config/config.json";
import {Authorize, mapToAuthorizeResponse, Register} from "../../dto/auth.interface";

export const TOKEN_KEY = 'token';

@Injectable({providedIn: 'root'})
export class AuthService {
  urlApi = configUrl.urlApi;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
  }

  login(credentials: Authorize): Observable<void> {
    return this.http.post<void>(this.urlApi + 'sign-in', credentials).pipe(tap(this.setToken));
  }

  register(body: Register): Observable<void> {
    return this.http.post<void>(this.urlApi + 'signup', body);
  }

  logout() {
    this.clear();
  }

  private setToken(response: any) {
    if (response) {
      const res = mapToAuthorizeResponse(response);
      localStorage.setItem(TOKEN_KEY, res.accessToken);
    } else {
      this.clear();
    }
  }

  isAuth(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!(token && !this.jwtHelper.isTokenExpired(token));
  }

  public clear() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
