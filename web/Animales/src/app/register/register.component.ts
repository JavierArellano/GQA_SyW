import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:string='';

  constructor(private animalService: AnimalService, private router: Router) { }

  register(username,password,passw2,email,first_name,last_name){
    if (password==passw2) {
      let data = {
        "username": String(username),
        "password": String(passw2),
        "email": String(email),
        "first_name": String(first_name),
        "last_name": String(last_name),
        "city": "1"
      }
      let user = JSON.stringify(data);
      this.animalService.register(user).subscribe(
        result=> {
          this.error='';
          console.log('registro bien', result);
        },
        error => {
          if (typeof error._body === 'string') {
            this.error=error._body;
          } else{
            this.router.navigateByUrl('/signin');
          }
        },
        () => {
          this.router.navigateByUrl('/signin');
        })
    }
  }

  ngOnInit() {

    this.animalService.authService.header('register');
  }

}
