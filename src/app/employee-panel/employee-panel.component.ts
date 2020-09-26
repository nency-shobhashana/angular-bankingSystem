import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  emp_id: number;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {emp_id: 100001, first_name: 'John1', last_name: 'Smith1', dob: '12/1/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100002, first_name: 'John2', last_name: 'Smith2', dob: '12/2/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100003, first_name: 'John3', last_name: 'Smith3', dob: '12/3/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100004, first_name: 'John4', last_name: 'Smith4', dob: '12/4/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100005, first_name: 'John5', last_name: 'Smith5', dob: '12/5/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100006, first_name: 'John6', last_name: 'Smith6', dob: '12/6/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100007, first_name: 'John7', last_name: 'Smith7', dob: '12/7/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100008, first_name: 'John8', last_name: 'Smith8', dob: '12/8/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100009, first_name: 'John9', last_name: 'Smith9', dob: '12/9/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
  {emp_id: 100010, first_name: 'John10', last_name: 'Smith10', dob: '12/10/2001', gender: 'Male', address: '12, york road, Hamilnton, US, 458265'},
];

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent implements OnInit {
  displayedColumns: string[] = ['action', 'emp_id', 'first_name', 'last_name', 'dob', 'gender', 'address'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
