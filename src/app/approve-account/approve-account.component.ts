import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../server.service';

export interface ApprovedAccountViewElement {
  acc_no: string;
  emp_id: number;
}

const ELEMENT_DATA: ApprovedAccountViewElement[] = [];

@Component({
  selector: 'app-approve-account',
  templateUrl: './approve-account.component.html',
  styleUrls: ['./approve-account.component.css']
})
export class ApproveAccountComponent implements OnInit, AfterViewInit {

  constructor(private serverService: ServerService) { }

  displayedColumns: string[] = ['action', 'acc_no', 'emp_id'];
  dataSource = new MatTableDataSource<ApprovedAccountViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  loadAllData(): void {
    this.serverService.getAllNonApproveAccountData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<ApprovedAccountViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }

  approveAccount(accountNo: number): void {
    this.serverService.approveAccount(accountNo, this.serverService.loginId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to Approve'));
  }

}
