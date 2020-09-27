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
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ApproveAccountComponent } from './approve-account/approve-account.component';
import { ApproveLoanComponent } from './approve-loan/approve-loan.component';


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminPanelComponent },
    { path: 'approveAccount', component: ApproveAccountComponent },
    { path: 'approveLoan', component: ApproveLoanComponent },
    { path: 'addEmployee', component: AddEmplyeeComponent },
    { path: 'employeeDetail/:id', component: AddEmplyeeComponent },

    { path: 'employee', component: EmployeePanelComponent },
    { path: 'addCustomer', component: AddCustomerComponent },
    { path: 'customerDetail/:id', component: AddCustomerComponent },

    { path: 'employee/AccountPanel', component: AccountPanelComponent },
    { path: 'employee/AddAccount', component: AddAccountComponent },
    { path: 'employee/AccountDetail/:id', component: AddAccountComponent },

    { path: 'employee/LoanAccountPanel', component: LoanAccountPanelComponent },
    { path: 'employee/AddLoanAccount', component: AddLoanAccountComponent },
    { path: 'employee/LoanAccountDetail/:id', component: AddLoanAccountComponent },

    { path: 'employee/DebitcardPanel', component: DebitcardPanelComponent },
    { path: 'employee/AddDebitcard', component: AddDebitcardComponent },
    { path: 'employee/DebitcardDetail/:id', component: AddDebitcardComponent },

    { path: 'employee/CreditcardPanel', component: CreditcardPanelComponent },
    { path: 'employee/AddCreditcard', component: AddCreditcardComponent },
    { path: 'employee/creditcardDetail/:id', component: AddCreditcardComponent },

    { path: 'customer', component: CustomerPanelComponent },
    { path: 'transaction-details/:id', component: AccountTransactionComponent },
    { path: 'addTransaction/:id', component: AddTransactionComponent },
    { path: 'loan-payments/:id', component: LoanPaymetsComponent },
    { path: 'addPayment/:id', component: AddPaymentComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
