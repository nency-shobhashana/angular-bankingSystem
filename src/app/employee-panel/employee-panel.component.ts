import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServerService } from '../server.service';

export interface CustomerViewElement{
  emp_id: String;
  f_name: string;
  l_name: string;
  dob: string;
  gender: string;
  address: String;
}

const ELEMENT_DATA: CustomerViewElement[] = [];


@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent implements OnInit {
  displayedColumns: string[] = ['action', 'emp_id', 'first_name', 'last_name', 'dob', 'gender', 'address'];
  dataSource = new MatTableDataSource<CustomerViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit() {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  loadAllData() {
    this.serverService.getAllEmployeeData().subscribe(result => {
      if(result != null){
        this.dataSource = new MatTableDataSource<CustomerViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid credentials."));
  }


  deleteData(emp_id:number) {
    this.serverService.deleteCustomerData(emp_id).subscribe(() => {
      this.loadAllData();
    },
    () => alert("Not able to delete"));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeInfo, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

export interface DialogData {}

@Component({
  selector: 'dialog-customer-info',
  templateUrl: 'dialog-customer-info.html',
})
export class DialogEmployeeInfo {

  constructor(
    public dialogRef: MatDialogRef<DialogEmployeeInfo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onOkClick(): void {
    this.dialogRef.close();
  }

}
