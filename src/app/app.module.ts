import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HeaderComponent } from './header/header.component';

import { CustomMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { AddEmplyeeComponent } from './add-emplyee/add-emplyee.component';
import { EmployeePanelComponent } from './employee/employee-panel/employee-panel.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { AccountTransactionComponent } from './account-transaction/account-transaction.component';
import { LoanPaymetsComponent } from './loan-paymets/loan-paymets.component';
import { AddCustomerComponent } from './employee/add-customer/add-customer.component';
import { AddAccountComponent } from './employee/add-account/add-account.component';
import { AddLoanAccountComponent } from './employee/add-loan-account/add-loan-account.component';
import { AddCreditcardComponent } from './employee/add-creditcard/add-creditcard.component';
import { AddDebitcardComponent } from './employee/add-debitcard/add-debitcard.component';
import { DebitcardPanelComponent } from './employee/debitcard-panel/debitcard-panel.component';
import { CreditcardPanelComponent } from './employee/creditcard-panel/creditcard-panel.component';
import { LoanAccountPanelComponent } from './employee/loan-account-panel/loan-account-panel.component';
import { AccountPanelComponent } from './employee/account-panel/account-panel.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPanelComponent,
    HeaderComponent,
    AddEmplyeeComponent,
    EmployeePanelComponent,
    CustomerPanelComponent,
    AddCustomerComponent,
    AccountTransactionComponent,
    LoanPaymetsComponent,
    AddAccountComponent,
    AddLoanAccountComponent,
    AddCreditcardComponent,
    AddDebitcardComponent,
    DebitcardPanelComponent,
    CreditcardPanelComponent,
    LoanAccountPanelComponent,
    AccountPanelComponent,
    AddTransactionComponent,
    AddPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
