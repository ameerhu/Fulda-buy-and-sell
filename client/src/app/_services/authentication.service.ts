import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/customers/login?include=user`, { username: username, password: password })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        let user;
        if (data && data.user) {
          user = { token: data.id, ...data, ...data.user};
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove customer from local storage to log customer out
    localStorage.removeItem('currentUser');
  }
}
