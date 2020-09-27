import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Observable, throwError, of, from } from 'rxjs';
import { EmployeeElement } from './add-emplyee/add-emplyee.component';
import { CustomerElement } from './employee/add-customer/add-customer.component';

import { AccountElement } from './employee/add-account/add-account.component';
import { LoanAccountElement } from './employee/add-loan-account/add-loan-account.component';
import { DebitcardElement } from './employee/add-debitcard/add-debitcard.component';
import { CreditcardElement } from './employee/add-creditcard/add-creditcard.component';
import { TransactionElement } from './add-transaction/add-transaction.component';
import { PaymentElement } from './add-payment/add-payment.component';

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

  auth = -1;

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

  loginAuth = (username: string, password: string) => of({ username, password }).pipe(
    switchMap((data) => from(this.request('POST', `${environment.serverUrl}/login`, data)))
  )

  logout() {
    this.auth = -1;
    return of({ status: 'success' }).pipe(delay(1000));
  }

/**** employee *****/
  insertEmployeeData = (data: EmployeeElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/employee`, body)))
  )

  getEmployeeData = (empId: number) => of(empId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/employee/${id}`, [])))
  )

  getAllEmployeeData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/employee`, [])))
  )

  deleteEmployeeData = (empId: number) => of(empId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/employee/${id}`, [])))
  )

  /**** customer *****/
  insertCustomerData = (data: CustomerElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/customer`, body)))
  )

  getCustomerData = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/customer/${id}`, [])))
  )

  getAllCustomerData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/customer`, [])))
  )

  deleteCustomerData = (empId: number) => of(empId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/customer/${id}`, [])))
  )

  /**** account *****/
  insertAccountData = (data: AccountElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/account`, body)))
  )

  getAccountData = (accountID: number) => of(accountID).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/account/${id}`, [])))
  )

  getAllAccountData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/account`, [])))
  )

  getAllAccountDataOfCustomer = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/account/customer/${id}`, [])))
  )

  deleteAccountData = (accountId: number) => of(accountId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/account/${id}`, [])))
  )

  /**** loan account *****/
  insertLoanAccountData = (data: LoanAccountElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/loan_account`, body)))
  )

  getLoanAccountData = (accountID: number) => of(accountID).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/loan_account/${id}`, [])))
  )

  getAllLoanAccountData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/loan_account`, [])))
  )

  getAllLoanAccountDataOfCustomer = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/loan_account/customer/${id}`, [])))
  )

  deleteLoanAccountData = (accountId: number) => of(accountId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/loan_account/${id}`, [])))
  )

  /**** credit card *****/
  insertCreditcardData = (data: CreditcardElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/credit_card`, body)))
  )

  getAllCreditcardData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/credit_card`, [])))
  )

  getCreditcardData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/credit_card/${id}`, [])))
  )

  getAllCreditcardDataOfCustomer = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/credit_card/customer/${id}`, [])))
  )

  deleteCreditcardData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/credit_card/${id}`, [])))
  )

  /**** debit card *****/
  insertDebitcardData = (data: DebitcardElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/debit_card`, body)))
  )

  getAllDebitcardData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/debit_card`, [])))
  )

  getDebitcardData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/debit_card/${id}`, [])))
  )

  getAllDebitcardDataOfAccount = (accountID: number) => of(accountID).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/debit_card/account/${id}`, [])))
  )

  getAllDebitcardDataOfCustomer = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/debit_card/customer/${id}`, [])))
  )

  deleteDebitcardData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/debit_card/${id}`, [])))
  )

  /**** transaction  *****/
  insertTransactionData = (data: TransactionElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/transaction`, body)))
  )

  getAllTransactionData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/transaction`, [])))
  )

  getTransactionData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/transaction/${id}`, [])))
  )

  getAllTransactionDataOfAccount = (accountID: String) => of(accountID).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/transaction/account/${id}`, [])))
  )

  getAllTransactionDataOfCustomer = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/transaction/customer/${id}`, [])))
  )

  deleteTransactionData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/transaction/${id}`, [])))
  )

  /**** payment *****/
  insertPaymentData = (data: PaymentElement) => of(data).pipe(
    switchMap((body) => from(this.request('PUT', `${environment.serverUrl}/payment`, body)))
  )

  getAllPaymentData = () => of(1).pipe(
    switchMap(() => from(this.request('GET', `${environment.serverUrl}/payment`, [])))
  )

  getPaymentData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/payment/${id}`, [])))
  )

  getAllPaymentDataOfLoanAccount = (accountID: string) => of(accountID).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/payment/loan/${id}`, [])))
  )

  getAllPaymentDataOfCustomer = (custId: number) => of(custId).pipe(
    switchMap((id) => from(this.request('GET', `${environment.serverUrl}/payment/customer/${id}`, [])))
  )

  deletePaymentData = (cardId: number) => of(cardId).pipe(
    switchMap((id) => from(this.request('DELETE', `${environment.serverUrl}/payment/${id}`, [])))
  )
}
