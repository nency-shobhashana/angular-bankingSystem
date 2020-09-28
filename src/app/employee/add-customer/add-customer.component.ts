import { concatMap, map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  data: CustomerElement = {
    f_name: '',
    l_name: '',
    email: '',
    pan_no: 0,
    dob: '',
    gender: '',
    contact: 0,
    state: '',
    city: '',
    street: '',
    pin: 0,
  };

  gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
  ];
  state: State[] = [
    { value: 'Gujarat', viewValue: 'Gujarat' },
    { value: 'Panjab', viewValue: 'Panjab' },
    { value: 'Rajsthan', viewValue: 'Rajsthan' }
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  isUpdate = false;
  custID = '';
  buttonTitle = 'Add Customer';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => {
        const id = params.get('id');
        if (id != null) {
          return id as string;
        } else {
          throwError('');
        }
      }),
      concatMap((id: string) => this.serverService.getCustomerData(id))
    ).subscribe(result => {
      if (result == null) { return; }
      this.isUpdate = true;
      this.buttonTitle = 'Update Customer';
      this.data = result['data'][0];
      this.custID = this.data['cust_id'];
    });
  }

  addCustomer(): void {
    if (this.isUpdate) {
      this.serverService.updateCustomerData(this.data, this.custID).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    } else {
      this.serverService.insertCustomerData(this.data).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    }
  }
}
export interface CustomerElement {
  f_name: string;
  l_name: string;
  email: string;
  pan_no: number;
  dob: string;
  gender: string;
  contact: number;
  state: string;
  city: string;
  street: string;
  pin: number;
}

interface Gender {
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}

