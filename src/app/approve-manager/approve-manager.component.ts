import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../server.service';

export interface ApprovedManagerViewElement {
  username: string;
  loginId: number;
}

const ELEMENT_DATA: ApprovedManagerViewElement[] = [];

@Component({
  selector: 'app-approve-manager',
  templateUrl: './approve-manager.component.html',
  styleUrls: ['./approve-manager.component.css']
})
export class ApproveManagerComponent implements OnInit, AfterViewInit {

  constructor(private serverService: ServerService) { }

  displayedColumns: string[] = ['action', 'username', 'loginId'];
  dataSource = new MatTableDataSource<ApprovedManagerViewElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadAllData();
    this.dataSource.paginator = this.paginator;
  }

  loadAllData(): void {
    this.serverService.getAllNonManagerData().subscribe(result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource<ApprovedManagerViewElement>(result['data']);
        this.dataSource.paginator = this.paginator;
      }
    },
      () => alert('no Data'));
  }

  promoteManager(empId: number): void {
    this.serverService.promoteManager(empId).subscribe(() => {
      this.loadAllData();
    },
      () => alert('Not able to Approve'));
  }
}
