import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import * as decode from 'jwt-decode';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  login(user) {
    return this.http.post('http://localhost:3000/auth/login', user).map(res => {
      return res.json();
    }).catch((err, caugth) => {
      return Observable.throw(err);
    });
  }

  logout() {
    localStorage.clear();
  }

  validToken() {
    // if (localStorage.getItem('token') || this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
    if (tokenNotExpired('token')) {
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  }


  register(formData) {
    return this.http.post('http://localhost:3000/auth/register', formData).map(res => {
      console.log(res);
      return res.json();
    }).catch((err, caugth) => {
      return Observable.throw(err);
    });
  }

}
