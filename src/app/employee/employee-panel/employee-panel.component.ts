import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../../server.service';

export interface CustomerViewElement {
  cust_id: string;
  f_name: string;
  l_name: string;
  email: string;
  pan_no: string;
  dob: string;
  gender: string;
  contact: number;
  address: string;
}

const ELEMENT_DATA: CustomerViewElement[] = [];


@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'cust_id', 'first_name', 'last_name', 'email', 'pan_no', 'dob', 'gender','contact', 'address'];

  dataSource = new MatTableDataSource<CustomerViewElement>(ELEMENT_DATA);
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
    this.serverService.getAllCustomerData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<CustomerViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }


  deleteData(empId: number): void {
    this.serverService.deleteCustomerData(empId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to delete'));
  }

  searchCustomer(): void {
    this.serverService.getFilterCustomerData(this.searchString).subscribe(result => {
      let data = ELEMENT_DATA;
      if (result != null) {
        data = result['data'];
      }
      this.dataSource = new MatTableDataSource<CustomerViewElement>(data);
      this.dataSource.paginator = this.paginator;
    },
      () => alert('Invalid credentials.'));
  }

}
