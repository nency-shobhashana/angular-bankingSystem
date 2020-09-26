import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServerService } from '../server.service';


export interface EmployeeViewElement{
  emp_id: String;
  f_name: string;
  l_name: string;
  dob: string;
  gender: string;
  address: String;
}

const ELEMENT_DATA: EmployeeViewElement[] = [];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
	displayedColumns: string[] = ['action', 'emp_id', 'first_name', 'last_name', 'dob', 'gender', 'address'];
  dataSource = new MatTableDataSource<EmployeeViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit() {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  loadAllData() {
    this.serverService.getAllEmployeeData().subscribe(result => {
      if(result != null){
        this.dataSource = new MatTableDataSource<EmployeeViewElement>(result["data"]);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert("Invalid credentials."));
  }

  deleteData(emp_id:number) {
    this.serverService.deleteEmployeeData(emp_id).subscribe(() => {
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
  selector: 'dialog-employee-info',
  templateUrl: 'dialog-employee-info.html',
})
export class DialogEmployeeInfo {

  constructor(
    public dialogRef: MatDialogRef<DialogEmployeeInfo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onOkClick(): void {
    this.dialogRef.close();
  }

}

