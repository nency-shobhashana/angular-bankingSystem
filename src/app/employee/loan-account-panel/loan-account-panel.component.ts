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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoanAccountInfoComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

export interface DialogData { }

@Component({
  selector: 'app-dialog-loanaccount-info',
  templateUrl: 'dialog-loanaccount-info.component.html',
})
export class DialogLoanAccountInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogLoanAccountInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
