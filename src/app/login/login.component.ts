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

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  login() {
    this.serverService.loginAuth(this.username, this.password).subscribe((response) => {
      if(response != null){
        this.router.navigate(['admin']);
      }else {
        alert("Invalid credentials.");
      }
    },
      () => alert("Invalid credentials."));
  }

}
