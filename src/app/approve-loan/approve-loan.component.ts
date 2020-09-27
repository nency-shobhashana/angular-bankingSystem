import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../server.service';

export interface ApprovedLoanViewElement {
  loan_id: string;
  emp_id: number;
}

const ELEMENT_DATA: ApprovedLoanViewElement[] = [];

@Component({
  selector: 'app-approve-loan',
  templateUrl: './approve-loan.component.html',
  styleUrls: ['./approve-loan.component.css']
})
export class ApproveLoanComponent implements OnInit, AfterViewInit {

  constructor(private serverService: ServerService) { }

  displayedColumns: string[] = ['action', 'loan_id', 'emp_id'];
  dataSource = new MatTableDataSource<ApprovedLoanViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  loadAllData(): void {
    this.serverService.getAllNonApproveLoanData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<ApprovedLoanViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('no Data'));
  }

  approveLoan(loanId: number): void {
    this.serverService.approveLoan(loanId, this.serverService.loginId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to Approve'));
  }
}
