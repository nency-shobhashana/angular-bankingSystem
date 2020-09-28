import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ServerService } from 'src/app/server.service';

export interface TransactionElement {
  trans_date: string;
  trans_amt: number;
  trans_type: string;
  balance: number;
  acc_no: string;
}

interface TransType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  
  data: TransactionElement = {
    trans_date: '',
    trans_amt: 0,
    trans_type: '',
    balance: 0,
    acc_no: '',
  };

  trans_type: TransType[] = [
    {value: 'Credit', viewValue: 'Credit'},
    {value: 'Debit', viewValue: 'Debit'}
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private router: Router, private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params:ParamMap) =>{
        const id = params.get('id')
        if(id != null){
          return id
        } else {
          throwError('');
        }
      })
    ).subscribe(accId => {
      if (accId == null) { return; }
      this.data.acc_no = accId
    })
  }

  addTranscation(): void {
    this.serverService.insertTransactionData(this.data).subscribe((response) => {
      if (response != null) {
        this.router.navigate(['transaction-details', this.data.acc_no]);
      } else {
        alert('Invalid credentials.');
      }
    },
      () => alert('Invalid credentials.'));

  }

}
