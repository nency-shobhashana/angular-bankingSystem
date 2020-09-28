import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ServerService } from '../server.service';


export interface LoanPaymentViewElement {
  pay_date: string;
  pay_amt: 0;
}

const ELEMENT_DATA: LoanPaymentViewElement[] = [];


@Component({
  selector: 'app-loan-paymets',
  templateUrl: './loan-paymets.component.html',
  styleUrls: ['./loan-paymets.component.css']
})
export class LoanPaymetsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['pay_date', 'pay_amt'];
  dataSource = new MatTableDataSource<LoanPaymentViewElement>(ELEMENT_DATA);
  accountNo = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private serverService: ServerService) { }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => {
        const id = params.get('id')
        if (id != null) {
          return id
        } else {
          throwError('');
        }
      })
    ).subscribe(accId => {
      if (accId == null) { return; }
      this.accountNo = accId;
      this.loadAllData(accId)
    })
  }

  loadAllData(accountId: string): void {
    this.serverService.getAllPaymentDataOfLoanAccount(accountId).subscribe(result => {
      if(result != null){
        this.dataSource = new MatTableDataSource<LoanPaymentViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid credentials."));
  }

}
