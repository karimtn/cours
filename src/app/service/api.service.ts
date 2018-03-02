import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import * as decode from 'jwt-decode';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable()
export class ApiService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId(token) {
    return decode(token).id;
  }

  getTodos() {
    return this.http.get('http://localhost:3000/api/' + this.getUserId(this.getToken()) + '/todos')
      .map(res => {
        return res.json();
      });
  }

  addTodo(todo) {
    return this.http.post('http://localhost:3000/api/' + this.getUserId(this.getToken()) + '/todos', todo)
      .map(res => {
        return res.json();
      });
  }

}
