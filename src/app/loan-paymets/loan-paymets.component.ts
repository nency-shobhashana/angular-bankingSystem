import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServerService } from '../server.service';


export interface LoanPaymentViewElement {
  emp_id: string;
  f_name: string;
  l_name: string;
  dob: string;
  gender: string;
  address: string;
}

const ELEMENT_DATA: LoanPaymentViewElement[] = [];


@Component({
  selector: 'app-loan-paymets',
  templateUrl: './loan-paymets.component.html',
  styleUrls: ['./loan-paymets.component.css']
})
export class LoanPaymetsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['emp_id', 'first_name', 'last_name', 'dob', 'gender', 'address'];
  dataSource = new MatTableDataSource<LoanPaymentViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit(): void{
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  loadAllData(): void {
    this.serverService.getAllPaymentDataOfLoanAccount(0).subscribe(result => {
      if(result != null){
        this.dataSource = new MatTableDataSource<LoanPaymentViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid credentials."));
  }

}
