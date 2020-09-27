import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../../server.service';


@Component({
  selector: 'app-loan-account-panel',
  templateUrl: './loan-account-panel.component.html',
  styleUrls: ['./loan-account-panel.component.css']
})
export class LoanAccountPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'loan_id', 'loan_type', 'status', 'interest', 'duration', 'amount', 'remain_amt', 'start_date', 'cust_id'];
  dataSource = new MatTableDataSource<LoanAccountViewElement>(ELEMENT_DATA);
  searchString = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit(): void {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  loadAllData(): void {
    this.serverService.getAllLoanAccountData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<LoanAccountViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }


  deleteData(accountId: number): void {
    this.serverService.deleteLoanAccountData(accountId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to delete'));
  }

  searchAccount(): void {
    this.serverService.getAllLoanAccountDataOfCustomer(this.searchString).subscribe(result => {
      let data = ELEMENT_DATA;
      if (result != null) {
        data = result['data'];
      }
      this.dataSource = new MatTableDataSource<LoanAccountViewElement>(data);
      this.dataSource.paginator = this.paginator;
    },
      () => alert('Invalid credentials.'));
  }
}

export interface LoanAccountViewElement {
  loan_id: string;
  loan_type: string;
  status: string;
  interest: number;
  duration: number;
  amount: number;
  remain_amt: number;
  start_date: string;
  cust_id: number;
}
const ELEMENT_DATA: LoanAccountViewElement[] = [];

