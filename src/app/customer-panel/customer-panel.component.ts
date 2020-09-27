import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServerService } from '../server.service';


export interface AccountDataViewElement{
  emp_id: String;
  f_name: string;
  l_name: string;
  dob: string;
  gender: string;
  address: String;
}

const ELEMENT_DATA: AccountDataViewElement[] = [];

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.css']
})
export class CustomerPanelComponent implements OnInit {
  
  displayedColumns: string[] = ['action', 'emp_id', 'first_name', 'last_name', 'dob', 'gender', 'address'];
  dataSource = new MatTableDataSource<AccountDataViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit() {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  loadAllData() {
    this.serverService.getCustomerAccData().subscribe(result => {
      if(result != null){
        this.dataSource = new MatTableDataSource<AccountDataViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid credentials."));
  }

}
