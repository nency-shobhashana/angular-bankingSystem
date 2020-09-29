import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string;
  password: string;

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.serverService.loginAuth(this.username, this.password).subscribe((response) => {
      if (response != null) {
        if (response['data']['role'] === '0') {
          this.serverService.loginId = response['data']['emp_id'];
          sessionStorage.setItem('loginId',this.serverService.loginId)
          this.router.navigate(['admin']);
        } else if (response['data']['role'] === '1') {
          this.serverService.loginId = response['data']['emp_id'];
          sessionStorage.setItem('loginId',this.serverService.loginId)
          this.router.navigate(['employee']);
        } else {
          this.serverService.loginId = response['data']['cust_id'];
          sessionStorage.setItem('loginId',this.serverService.loginId)
          this.router.navigate(['customer']);
        }
      } else {
        alert('Invalid credentials.');
      }
    },
      () => alert('Invalid credentials.'));
  }

}
