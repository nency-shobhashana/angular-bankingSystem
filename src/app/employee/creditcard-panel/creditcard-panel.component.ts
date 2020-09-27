import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../../server.service';


@Component({
  selector: 'app-creditcard-panel',
  templateUrl: './creditcard-panel.component.html',
  styleUrls: ['./creditcard-panel.component.css']
})
export class CreditcardPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'credit_id', 'holder_name', 'credit_no', 'exp_date', 'cust_id'];
  dataSource = new MatTableDataSource<CreditcardViewElement>(ELEMENT_DATA);
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
    this.serverService.getAllCreditcardData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<CreditcardViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }


  deleteData(accountId: number): void {
    this.serverService.deleteCreditcardData(accountId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to delete'));
  }

  searchCard(): void {
    this.serverService.getAllCreditcardDataOfCustomer(this.searchString).subscribe(result => {
      let data = ELEMENT_DATA;
      if (result != null) {
        data = result['data'];
      }
      this.dataSource = new MatTableDataSource<CreditcardViewElement>(data);
      this.dataSource.paginator = this.paginator;
    },
      () => alert('Invalid credentials.'));
  }
}

export interface CreditcardViewElement {
  credit_id: string;
  holder_name: string;
  credit_no: number;
  exp_date: string;
  cvv: number;
  cust_id: number;
}
const ELEMENT_DATA: CreditcardViewElement[] = [];


