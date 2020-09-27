import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Observable, throwError, of, from } from 'rxjs';
import { EmployeeElement } from './add-emplyee/add-emplyee.component';
import { CustomerElement } from './add-customer/add-customer.component';

export const environment = {
  production: false,
  serverUrl: 'http://192.168.0.204:8080'
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
    switchMap((data) => from(this.request('POST', `${environment.serverUrl}/login`, data)))
  );

  logout() {
    this.auth = -1;
    return of({ status: 'success' }).pipe(delay(1000));
  }

  

  insertEmployeeData = (data:EmployeeElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/employee`, body)))
  )

  getAllEmployeeData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/employee`, [])))
  )

  deleteEmployeeData = (emp_id:number) => of(emp_id).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/employee/${id}`, [])))
  )

  insertCustomerData = (data:CustomerElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/employee`, body)))
  )

  getAllCustomerData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/employee`, [])))
  )

  deleteCustomerData = (emp_id:number) => of(emp_id).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/employee/${id}`, [])))
  )

  getCustomerAccData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/employee`, [])))
  )

  getAccTransactionData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/employee`, [])))
  )

  getLoanPaymentData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/employee`, [])))
  )

}
