import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-add-debitcard',
  templateUrl: './add-debitcard.component.html',
  styleUrls: ['./add-debitcard.component.css']
})
export class AddDebitcardComponent implements OnInit {

  data: DebitcardElement = {
    holder_name: '',
    debit_no: 0,
    exp_date: '',
    cvv: 0,
    acc_no: 0
  };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  isUpdate = false;
  cardId = '';
  buttonTitle = 'Add Debit Card';

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
      concatMap((id: string) => this.serverService.getDebitcardData(id))
    ).subscribe(result => {
      if (result == null) { return; }
      this.isUpdate = true;
      this.buttonTitle = 'Update Debit Card';
      this.data = result['data'][0];
      this.cardId = this.data['debit_id'];
    });
  }

  addDebitcard(): void {
    if (this.isUpdate) {
      this.serverService.updateDebitcardData(this.data, this.cardId).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee/DebitcardPanel']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    } else {
      this.serverService.insertDebitcardData(this.data).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee/DebitcardPanel']);
        } else {
          alert('Invalid Data.');
        }
      },
        () => alert('Invalid Data.'));
    }
  }
}
export interface DebitcardElement {
  holder_name: string;
  debit_no: number;
  exp_date: string;
  cvv: number;
  acc_no: number;
}

