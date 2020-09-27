import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../server.service';


export interface EmployeeViewElement {
  emp_id: string;
  f_name: string;
  l_name: string;
  dob: string;
  gender: string;
  address: string;
  contact: number;
}

const ELEMENT_DATA: EmployeeViewElement[] = [];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, private serverService: ServerService) { }
  displayedColumns: string[] = ['action', 'emp_id', 'first_name', 'last_name', 'dob', 'gender', 'contact', 'address'];
  dataSource = new MatTableDataSource<EmployeeViewElement>(ELEMENT_DATA);
  searchString = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void { }

  loadAllData(): void {
    this.serverService.getAllEmployeeData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<EmployeeViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('Invalid credentials.'));
  }

  deleteData(empId: number): void {
    this.serverService.deleteEmployeeData(empId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to delete'));
  }

  searchEmployee(): void {
    this.serverService.getFilterEmployeeData(this.searchString).subscribe(result => {
      let data = ELEMENT_DATA;
      if (result != null) {
        data = result['data'];
      }
      this.dataSource = new MatTableDataSource<EmployeeViewElement>(data);
      this.dataSource.paginator = this.paginator;
    },
      () => alert('Invalid credentials.'));
  }

}

