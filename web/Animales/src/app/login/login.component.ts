import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private animalService: AnimalService) { }

  login(user,pass){
    this.animalService.aut({username:user,password:pass});
    localStorage.removeItem('user')
    if (!localStorage.getItem('user')) {
    }
  }

  ngOnInit() {
  }

}
