import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    cust_id: '',
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  isUpdate = false;
  cardId = '';
  buttonTitle = 'Add Credit Card';

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
      concatMap((id: string) => this.serverService.getCreditcardData(id))
    ).subscribe(result => {
      if (result == null) { return; }
      this.isUpdate = true;
      this.buttonTitle = 'Update Credit Card';
      this.data = result['data'][0];
      this.cardId = this.data['credit_id'];
    });
  }

  addCreditcard(): void {
    if (this.isUpdate) {
      this.serverService.updateCreditcardData(this.data, this.cardId).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee/CreditcardPanel']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    } else {
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
}
export interface CreditcardElement {
  holder_name: string;
  credit_no: number;
  exp_date: string;
  cvv: number;
  cust_id: string;
}

