import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServerService } from '../server.service';


export interface TransactionDataViewElement {
  emp_id: String;
  f_name: string;
  l_name: string;
  dob: string;
  gender: string;
  address: String;
}

const ELEMENT_DATA: TransactionDataViewElement[] = [];

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.css']
})

export class AccountTransactionComponent implements OnInit {
  
  displayedColumns: string[] = ['emp_id', 'first_name', 'last_name', 'dob', 'gender', 'address'];
  dataSource = new MatTableDataSource<TransactionDataViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit() {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  loadAllData() {
    this.serverService.getAllTransactionDataOfAccount(1).subscribe(result => {
      if(result != null){
        this.dataSource = new MatTableDataSource<TransactionDataViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid credentials."));
  }

}
