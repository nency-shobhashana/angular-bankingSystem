import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
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

  isUpdate = false;
  accId = '';
  buttonTitle = 'Add Account';

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
      concatMap((id: string) => this.serverService.getAccountData(id))
    ).subscribe(result => {
      if (result == null) { return; }
      this.isUpdate = true;
      this.buttonTitle = 'Update Account';
      this.data = result['data'][0];
      this.accId = this.data['acc_no'];
    });
  }

  addAccount(): void {
    if (this.isUpdate) {
      this.serverService.updateAccountData(this.data, this.accId).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['employee/AccountPanel']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    } else {
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
}
export interface AccountElement {
  acc_type: string;
  acc_bal: number;
  createdDate: string;
  cust_id: number;
}
