import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.css']
})
export class CustomerPanelComponent implements OnInit, AfterViewInit {
  
  dataSource: CustomerDataViewElement;

  accountDisplayedColumns: string[] = ['action', 'acc_no', 'acc_type', 'acc_bal', 'createdDate'];
  accountDataSource = new MatTableDataSource<AccountDataViewElement>(ACCOUNT_ELEMENT_DATA);

  loanDisplayedColumns: string[] = ['action', 'loan_id','loan_type','status','interest','duration','amount','remain_amt','start_date'];
  loanDataSource = new MatTableDataSource<LoanAccountDataViewElement>(LOAN_ACCOUNT_ELEMENT_DATA);

  debitDisplayedColumns: string[] = ['holder_name','debit_no','exp_date','cvv','acc_id'];
  debitcardDataSource = new MatTableDataSource<DebitcardDataViewElement>(DEBIT_CARD_ELEMENT_DATA);

  creditDisplayedColumns: string[] = ['holder_name', 'credit_no', 'exp_date', 'cvv', 'cust_id'];
  creditcardDataSource = new MatTableDataSource<CreditcardDataViewElement>(CREDIT_CARD_ELEMENT_DATA);

  @ViewChild(MatPaginator) accountPaginator: MatPaginator;
  @ViewChild(MatPaginator) loanPaginator: MatPaginator;
  @ViewChild(MatPaginator) debitPaginator: MatPaginator;
  @ViewChild(MatPaginator) creditPaginator: MatPaginator;

  constructor(public dialog: MatDialog, private serverService: ServerService) { }

  ngAfterViewInit():void  {
    this.loadCustomerData();
    this.loadAccountData();
    this.loadLoanAccountData();
    this.loadDebitcardData();
    this.loadCreditcardData();
    this.accountDataSource.paginator = this.accountPaginator;
    this.loanDataSource.paginator = this.loanPaginator;
    this.debitcardDataSource.paginator = this.debitPaginator;
    this.creditcardDataSource.paginator = this.creditPaginator;
  }

  ngOnInit(): void {}

  loadCustomerData(): void {
    this.serverService.getCustomerData(1).subscribe(result => {
      if(result != null){
        console.log(result);
        this.dataSource = result["data"][0];
      }
    },
      () => alert("Invalid credentials."));
  }

  loadAccountData(): void {
    this.serverService.getAllAccountDataOfCustomer(1).subscribe(result => {
      if(result != null){ 
        this.accountDataSource = new MatTableDataSource<AccountDataViewElement>(result["data"]);
        this.accountDataSource.paginator = this.accountPaginator;
      }
    },
      () => alert("Invalid credentials."));
  }

  loadLoanAccountData(): void {
    this.serverService.getAllLoanAccountDataOfCustomer(1).subscribe(result => {
      if(result != null){
        this.loanDataSource = new MatTableDataSource<LoanAccountDataViewElement>(result["data"]);
        this.loanDataSource.paginator = this.loanPaginator;
      }
    },
      () => alert("Invalid credentials."));
  }
  
  loadDebitcardData(): void {
    this.serverService.getAllDebitcardDataOfCustomer(1).subscribe(result => {
      if(result != null){
        this.debitcardDataSource = new MatTableDataSource<DebitcardDataViewElement>(result["data"]);
        this.debitcardDataSource.paginator = this.debitPaginator;
      }
    },
      () => alert("Invalid credentials."));
  }

  loadCreditcardData(): void {
    this.serverService.getAllCreditcardDataOfCustomer(1).subscribe(result => {
      if(result != null){
        this.creditcardDataSource = new MatTableDataSource<CreditcardDataViewElement>(result["data"]);
        this.creditcardDataSource.paginator = this.creditPaginator;
      }
    },
      () => alert("Invalid credentials."));
  }
}

export interface CustomerDataViewElement{
  cust_id: string;
  f_name: string;
  l_name: string;
  email: string;
  pan_no: string;
  dob: string;
  gender: string;
  address: string;
}

export interface AccountDataViewElement{
  acc_no: string;
  acc_type: string;
  acc_bal: string;
  createdDate: string;
  cust_id: string;
}
const ACCOUNT_ELEMENT_DATA: AccountDataViewElement[] = [];

export interface LoanAccountDataViewElement{
  loan_id: string;
  loan_type: string;
  status: string;
  interest: number;
  duration: number;
  amount: number;
  remain_amt: number;
  start_date: string;
  cust_id: number;
}
const LOAN_ACCOUNT_ELEMENT_DATA: LoanAccountDataViewElement[] = [];

export interface DebitcardDataViewElement{
  debit_id: string;
  holder_name: string;
  debit_no: number;
  exp_date: string;
  cvv: number;
  acc_no: number;
}
const DEBIT_CARD_ELEMENT_DATA: DebitcardDataViewElement[] = [];

export interface CreditcardDataViewElement{
  credit_id: string;
  holder_name: string;
  credit_no: number;
  exp_date: string;
  cvv: number;
  cust_id: number;
}
const CREDIT_CARD_ELEMENT_DATA: CreditcardDataViewElement[] = [];
