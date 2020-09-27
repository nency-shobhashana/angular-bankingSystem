import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-debitcard-panel',
  templateUrl: './debitcard-panel.component.html',
  styleUrls: ['./debitcard-panel.component.css']
})
export class DebitcardPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'debit_id', 'holder_name', 'debit_no', 'exp_date', 'acc_id'];
  dataSource = new MatTableDataSource<DebitcardViewElement>(ELEMENT_DATA);
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
    this.serverService.getAllDebitcardData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<DebitcardViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }


  deleteData(accountId: number): void {
    this.serverService.deleteDebitcardData(accountId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to delete'));
  }

  searchCard(): void {
    this.serverService.getAllDebitcardDataOfAccount(this.searchString).subscribe(result => {
      let data = ELEMENT_DATA;
      if (result != null) {
        data = result['data'];
      }
      this.dataSource = new MatTableDataSource<DebitcardViewElement>(data);
      this.dataSource.paginator = this.paginator;
    },
      () => alert('Invalid credentials.'));
  }
}

export interface DebitcardViewElement {
  debit_id: string;
  holder_name: string;
  debit_no: number;
  exp_date: string;
  cvv: number;
  acc_no: number;
}
const ELEMENT_DATA: DebitcardViewElement[] = [];


