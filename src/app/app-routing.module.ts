import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddEmplyeeComponent } from './add-emplyee/add-emplyee.component';
import { EmployeePanelComponent } from './employee/employee-panel/employee-panel.component';
import { AddCustomerComponent } from './employee/add-customer/add-customer.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { AccountTransactionComponent } from './account-transaction/account-transaction.component';
import { LoanPaymetsComponent } from './loan-paymets/loan-paymets.component';
import { AddAccountComponent } from './employee/add-account/add-account.component';
import { AddLoanAccountComponent } from './employee/add-loan-account/add-loan-account.component';
import { AddCreditcardComponent } from './employee/add-creditcard/add-creditcard.component';
import { AddDebitcardComponent } from './employee/add-debitcard/add-debitcard.component';
import { DebitcardPanelComponent } from './employee/debitcard-panel/debitcard-panel.component';
import { CreditcardPanelComponent } from './employee/creditcard-panel/creditcard-panel.component';
import { LoanAccountPanelComponent } from './employee/loan-account-panel/loan-account-panel.component';
import { AccountPanelComponent } from './employee/account-panel/account-panel.component';


const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'admin', component: AdminPanelComponent },
	{ path: 'addEmployee', component: AddEmplyeeComponent },
	{ path: 'employee', component: EmployeePanelComponent },
	{ path: 'addCustomer', component: AddCustomerComponent },
	{ path: 'customer', component: CustomerPanelComponent },
	{ path: 'transaction-details', component: AccountTransactionComponent },
	{ path: 'loan-payments', component: LoanPaymetsComponent },

	{ path: 'employee/AddAccount', component: AddAccountComponent },
	{ path: 'employee/AddLoanAccount', component: AddLoanAccountComponent },
	{ path: 'employee/AddCreditcard', component: AddCreditcardComponent },
	{ path: 'employee/AddDebitcard', component: AddDebitcardComponent },
	{ path: 'employee/DebitcardPanel', component: DebitcardPanelComponent },
	{ path: 'employee/CreditcardPanel', component: CreditcardPanelComponent },
	{ path: 'employee/LoanAccountPanel', component: LoanAccountPanelComponent },
	{ path: 'employee/AccountPanel', component: AccountPanelComponent }
	// { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
