import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private animalService: AnimalService, private router: Router) { }

  login(user,pass){
    if (this.animalService.aut({username:user,password:pass})){
      this.router.navigateByUrl('/animal');
    }
  }

  ngOnInit() {
  }

}
