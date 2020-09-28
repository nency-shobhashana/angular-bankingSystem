import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ServerService } from '../server.service';


export interface TransactionDataViewElement {
  trans_id: number;
  trans_date: string;
  trans_amt: number;
  trans_type: string;
  acc_no: number;
}

const ELEMENT_DATA: TransactionDataViewElement[] = [];

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.css']
})

export class AccountTransactionComponent implements OnInit {

  displayedColumns: string[] = ['trans_id', 'trans_date', 'trans_amt', 'trans_type', 'acc_no'];
  dataSource = new MatTableDataSource<TransactionDataViewElement>(ELEMENT_DATA);
  accountNo = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private serverService: ServerService) { }

  ngAfterViewInit() {
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

  loadAllData(accId: string) {
    this.serverService.getAllTransactionDataOfAccount(accId).subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<TransactionDataViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid Data."));
  }

}
