import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private animalService: AnimalService) { }

  register(username,password,email,first_name,last_name){
    let data = {
      "username": String(username),
      "password": String(password),
      "email": String(email),
      "first_name": String(first_name),
      "last_name": String(last_name),
      "city": "1"
    }
    let user = JSON.stringify(data);
    this.animalService.register(user).subscribe(
      data=> {
      })
  }

  ngOnInit() {

    this.animalService.authService.header('register');
  }

}
