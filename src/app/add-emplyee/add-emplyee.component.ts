import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from '../server.service';
import { throwError } from 'rxjs';

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
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-emplyee',
  templateUrl: './add-emplyee.component.html',
  styleUrls: ['./add-emplyee.component.css']
})
export class AddEmplyeeComponent implements OnInit {

  data: EmployeeElement = {
    f_name: '',
    l_name: '',
    contact: 0,
    dob: '',
    gender: '',
    state: '',
    city: '',
    street: '',
    pin: 0,
  };

  gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
  ];
  state: State[] = [
    { value: 'Gujarat', viewValue: 'Gujarat' },
    { value: 'Panjab', viewValue: 'Panjab' },
    { value: 'Rajsthan', viewValue: 'Rajsthan' }
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString().split('T')[0]);

  isUpdate = false;
  empID = '';
  buttonTitle = 'Add Employee';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id != null) {
          return id as string;
        } else {
          throwError('');
        }
      }),
      switchMap((id: string) => this.serverService.getEmployeeData(id))
    ).subscribe(result => {
      this.isUpdate = true;
      this.buttonTitle = 'Update Employee';
      this.data = result['data'][0];
      this.empID = this.data['emp_id'];
    });
  }

  addEmployee(): void {
    if (this.isUpdate) {
      this.serverService.updateEmployeeData(this.data, this.empID).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['admin']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    } else {
      this.serverService.insertEmployeeData(this.data).subscribe((response) => {
        if (response != null) {
          this.router.navigate(['admin']);
        } else {
          alert('Invalid credentials.');
        }
      },
        () => alert('Invalid credentials.'));
    }

  }

}
