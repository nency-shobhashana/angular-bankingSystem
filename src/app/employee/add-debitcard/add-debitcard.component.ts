import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
@Component({
  selector: 'app-add-debitcard',
  templateUrl: './add-debitcard.component.html',
  styleUrls: ['./add-debitcard.component.css']
})
export class AddDebitcardComponent implements OnInit{

  data: DebitcardElement = {
    holder_name: '',
    debit_no: 0,
    exp_date: '',
    cvv: 0,
    acc_no: 0
    };

    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());

    constructor(private router: Router, private serverService: ServerService) { }

    ngOnInit(): void {
    }

    addDebitcard(): void {
      this.serverService.insertDebitcardData(this.data).subscribe((response) => {
        if (response != null){
          this.router.navigate(['employee/DebitcardPanel']);
        }else {
          alert('Invalid Data.');
        }
      },
        () => alert('Invalid Data.'));

    }
}
export interface DebitcardElement {
  holder_name: string;
  debit_no: number;
  exp_date: string;
  cvv: number;
  acc_no: number;
}

