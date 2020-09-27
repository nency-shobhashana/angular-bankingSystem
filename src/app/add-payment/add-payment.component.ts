import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerService } from 'src/app/server.service';

export interface PaymentElement {
  pay_date: string;
  pay_amt: number;
  loan_id: string;
}

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  data: PaymentElement = {
    pay_date: '',
    pay_amt: 0,
    loan_id: ''
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private router: Router, private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params:ParamMap) =>{
        const id = params.get('id')
        if(id != null){
          return id
        } else {
          throwError('');
        }
      })
    ).subscribe(accId => this.data.loan_id = accId)
  }

  addTranscation(): void {
    this.serverService.insertPaymentData(this.data).subscribe((response) => {
      if (response != null) {
        this.router.navigate(['loan-payments',  this.data.loan_id]);
      } else {
        alert('Invalid credentials.');
      }
    },
      () => alert('Invalid credentials.'));

  }

}
