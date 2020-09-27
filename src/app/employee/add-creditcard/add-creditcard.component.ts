import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';


@Component({
  selector: 'app-add-creditcard',
  templateUrl: './add-creditcard.component.html',
  styleUrls: ['./add-creditcard.component.css']
})
export class AddCreditcardComponent implements OnInit {

  data: CreditcardElement = {
    holder_name: '',
    credit_no: 0,
    exp_date: '',
    cvv: 0,
    cust_id: 0,
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
  }

  addCreditcard(): void {
    this.serverService.insertCreditcardData(this.data).subscribe((response) => {
      if (response != null) {
        this.router.navigate(['employee/CreditcardPanel']);
      } else {
        alert('Invalid Data.');
      }
    },
      () => alert('Invalid Data.'));

  }
}
export interface CreditcardElement {
  holder_name: string;
  credit_no: number;
  exp_date: string;
  cvv: number;
  cust_id: number;
}

