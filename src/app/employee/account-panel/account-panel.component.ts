import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'acc_no', 'acc_type', 'acc_bal', 'createdDate', 'cust_id'];
  dataSource = new MatTableDataSource<AccountViewElement>(ELEMENT_DATA);
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
    this.serverService.getAllAccountData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<AccountViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }


  deleteData(accountId: number): void {
    this.serverService.deleteAccountData(accountId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to delete'));
  }

  searchAccount(): void {
    this.serverService.getAllAccountDataOfCustomer(this.searchString).subscribe(result => {
      let data = ELEMENT_DATA;
      if (result != null) {
        data = result['data'];
      }
      this.dataSource = new MatTableDataSource<AccountViewElement>(data);
      this.dataSource.paginator = this.paginator;
    },
      () => alert('Invalid credentials.'));
  }
}

export interface AccountViewElement {
  acc_no: string;
  acc_type: string;
  acc_bal: string;
  createdDate: string;
  cust_id: string;
}
const ELEMENT_DATA: AccountViewElement[] = [];

