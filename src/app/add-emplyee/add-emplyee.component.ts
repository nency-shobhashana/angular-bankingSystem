import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

export interface EmployeeElement {
  f_name: string;
  l_name: string;
  contact: number;
  dob: string;
  gender: string;
  state: string;
  city: string;
  street: string;
  pin: number;
}

interface Gender {
  value: number;
  viewValue: string;
}
interface State {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-emplyee',
  templateUrl: './add-emplyee.component.html',
  styleUrls: ['./add-emplyee.component.css']
})
export class AddEmplyeeComponent implements OnInit {

  data: EmployeeElement = {
  f_name: "",
  l_name: "",
  contact: 0,
  dob: "",
  gender: "",
  state: "",
  city: "",
  street: "",
  pin: 0,
  };

  gender: Gender[] = [
    {value: 0, viewValue: 'Female'},
    {value: 1, viewValue: 'Male'}
  ];
  state: State[] = [
    {value: 0, viewValue: 'Gujarat'},
    {value: 1, viewValue: 'Panjab'},
    {value: 1, viewValue: 'Rajsthan'}
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString().split('T')[0]);

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
  }

  addEmployee(){
    this.serverService.insertEmployeeData(this.data).subscribe((response) => {
      if(response != null){
        this.router.navigate(['admin']);
      }else {
        alert("Invalid credentials.");
      }
    },
      () => alert("Invalid credentials."));

  }

}
