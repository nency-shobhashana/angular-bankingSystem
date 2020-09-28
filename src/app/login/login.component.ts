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
        this.serverService.loginId = response['data']['loginId'];
        sessionStorage.setItem('loginId',this.serverService.loginId)
        if (response['data']['role'] === '0') {
          this.router.navigate(['admin']);
        } else if (response['data']['role'] === '1') {
          this.router.navigate(['employee']);
        } else {
          this.router.navigate(['customer']);
        }
      } else {
        alert('Invalid credentials.');
      }
    },
      () => alert('Invalid credentials.'));
  }

}
