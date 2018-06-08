import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth0.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Guau que Animales';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  	const token = this.authService.getAccessToken();
    if (token) {
    	this.authService.refresh_token();
    }
  }

}
