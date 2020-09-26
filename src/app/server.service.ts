import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Observable, throwError, of, from } from 'rxjs';

export const environment = {
  production: false,
  serverUrl: 'http://localhost:8080'
};


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

      const result = this.http.request(method, url, {
        body: data,
        responseType: 'json',
        observe: 'body',
      });
      return new Promise((resolve, reject) => {
        result.subscribe(resolve, reject);
      });
    }
   
    getEvents() {
      return this.request('GET', `${environment.serverUrl}/event`);
    }

    deleteEvent(event) {
      return this.request('DELETE', `${environment.serverUrl}/event/${event.id}`);
    }  

  auth: number = -1;
  loginAuth = (username: string, password: string) => of({ username, password }).pipe(
      switchMap((data) =>from(this.request('POST', `${environment.serverUrl}/login`, data)))
  );

  logout() {
      this.auth = -1;
      return of({ status: 'success' }).pipe(delay(1000));
  }

  insertTestData = (user: String, pwd: String) => of({ user, pwd }).pipe(
      switchMap((data) =>from(this.request('PUT', `${environment.serverUrl}/login`, data)))
  )
}
