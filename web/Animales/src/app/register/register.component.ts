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
  paises;
  ciudades;

  constructor(private animalService: AnimalService, private router: Router) {
    this.getCities();
  }

  register(username,password,passw2,email,first_name,last_name,ciudad){
    if (password==passw2) {
      let data = {
        "username": String(username),
        "password": String(passw2),
        "email": String(email),
        "first_name": String(first_name),
        "last_name": String(last_name),
        "city": String(ciudad)
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

  onChangePais(tipo){
    this.ciudades = this.paises[tipo-1].cities;
    console.log(this.ciudades);
  }

  getCities() {
    this.animalService.getCities().subscribe(
      data => {
        this.paises = data;
        this.ciudades = data[0].cities;
        console.log(this.paises);
        console.log('ciudades get cities');
        console.log(this.ciudades);
      })
  }

  ngOnInit() {
    this.animalService.authService.header('register');
  }

}
