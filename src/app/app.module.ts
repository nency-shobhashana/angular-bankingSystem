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
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AccountTransactionComponent } from './account-transaction/account-transaction.component';
import { LoanPaymetsComponent } from './loan-paymets/loan-paymets.component';

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
