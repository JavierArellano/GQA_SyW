import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-reset-password-first',
  templateUrl: './reset-password-first.component.html',
  styleUrls: ['./reset-password-first.component.css']
})
export class ResetPasswordFirstComponent implements OnInit {

  constructor(private userService:AnimalService) { }

  forgot(em){
    this.userService.forgot({email:em}).subscribe(data=> {
        
    });
  }

  ngOnInit() {

    this.userService.authService.header('nada');
  }

}
