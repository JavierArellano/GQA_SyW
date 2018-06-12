import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth0.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active

  constructor(private authService: AuthService, private router: Router ) {
    this.authService.headerObs().subscribe(
      data => {
        this.active = data;
      })
  }

  logout() {
  	this.authService.logout();
  	this.router.navigate(['/animal']);
  }

  ngOnInit() {
  }

}
