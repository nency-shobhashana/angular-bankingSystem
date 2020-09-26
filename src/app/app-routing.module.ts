import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddEmplyeeComponent } from './add-emplyee/add-emplyee.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'admin', component: AdminPanelComponent},
	{path: 'addEmployee', component: AddEmplyeeComponent},
	{path: 'employee', component: EmployeePanelComponent},
	{path: 'addCustomer', component: AddCustomerComponent},
	{path: 'customer', component: CustomerPanelComponent},
	// { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
