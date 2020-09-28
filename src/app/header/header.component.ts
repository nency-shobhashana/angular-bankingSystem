import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private serverService: ServerService, private router: Router) {
    this.isLogin = this.serverService.loginId != '0';
   }

  ngOnInit(): void {
  }

  isLogin = true;

  logout() :void{
    this.serverService.logout().subscribe(() => this.router.navigate(['/']))
  }

}
