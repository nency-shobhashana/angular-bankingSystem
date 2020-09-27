import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  data: CustomerElement = {
    f_name: '',
    l_name: '',
    email: '',
    pan_no: 0,
    dob: '',
    gender: '',
    state: '',
    city: '',
    street: '',
    pin: 0,
    };

    gender: Gender[] = [
      {value: 'Female', viewValue: 'Female'},
      {value: 'Male', viewValue: 'Male'}
    ];
    state: State[] = [
      {value: 'Gujarat', viewValue: 'Gujarat'},
      {value: 'Panjab', viewValue: 'Panjab'},
      {value: 'Rajsthan', viewValue: 'Rajsthan'}
    ];

    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());

    constructor(private router: Router, private serverService: ServerService) { }

    ngOnInit(): void {
    }

    addCustomer(): void {
      this.serverService.insertCustomerData(this.data).subscribe((response) => {
        if (response != null){
          this.router.navigate(['employee']);
        }else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));

    }
}
export interface CustomerElement {
  f_name: string;
  l_name: string;
  email: string;
  pan_no: number;
  dob: string;
  gender: string;
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

