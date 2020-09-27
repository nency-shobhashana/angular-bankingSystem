import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-add-loan-account',
  templateUrl: './add-loan-account.component.html',
  styleUrls: ['./add-loan-account.component.css']
})
export class AddLoanAccountComponent implements OnInit {

  data: LoanAccountElement = {
    loan_type: '',
    status: 'new',
    interest: 0,
    duration: 0,
    amount: 0,
    remain_amt: 0,
    start_date: '',
    cust_id: 0,
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  isUpdate = false;
  loanId = '';
  buttonTitle = 'Add Loan Account';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id != null) {
          return id as string;
        } else {
          throwError('');
        }
      }),
      switchMap((id: string) => this.serverService.getLoanAccountData(id))
    ).subscribe(result => {
      this.isUpdate = true;
      this.buttonTitle = 'Update Loan Account';
      this.data = result['data'][0];
      this.loanId = this.data['loan_id'];
    });
  }

  addLoanAccount(): void {
    if (this.isUpdate) {
      this.serverService.updateLoanAccountData(this.data, this.loanId).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee/LoanAccountPanel']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    } else {
      this.data.remain_amt = this.data.amount;
      this.serverService.insertLoanAccountData(this.data).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee/LoanAccountPanel']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    }
  }
}
export interface LoanAccountElement {
  loan_type: string;
  status: string;
  interest: number;
  duration: number;
  amount: number;
  remain_amt: number;
  start_date: string;
  cust_id: number;
}

