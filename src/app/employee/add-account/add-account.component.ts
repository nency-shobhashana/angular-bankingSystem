import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  data: AccountElement = {
    acc_type: '',
    acc_bal: 0,
    createdDate: '',
    cust_id: 0,
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
  }

  addAccount(): void {
    this.serverService.insertAccountData(this.data).subscribe((response) => {
      if (response != null) {
        this.router.navigate(['employee/AccountPanel']);
      } else {
        alert('Invalid credentials.');
      }
    },
      () => alert('Invalid credentials.'));

  }
}
export interface AccountElement {
  acc_type: string;
  acc_bal: number;
  createdDate: string;
  cust_id: number;
}
