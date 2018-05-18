import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  public animales;
  public selectuserid;
  public logged;
  public datosPost;
  public regPost;



  constructor(private animalService: AnimalService) {

  }

  login(user,pass){
    this.animalService.aut({username:user,password:pass});
    localStorage.removeItem('user')
    if (!localStorage.getItem('user')) {
      this.logged = true;
      this.getAnimals();
    }
  }

  register(username,password,email,first_name,last_name,city){
    let data = {
      "username": String(username),
      "password": String(password),
      "email": String(email),
      "first_name": String(first_name),
      "last_name": String(last_name),
      "city": String(city)
    }
    let user = JSON.stringify(data);
    this.animalService.register(user).subscribe(
      data=> {
        this.regPost=data;
      })
  }

  getAnimals(){
    this.animalService.getAnimals().subscribe(data=> {
        this.animales=data;
    })
    
  }
  
  onSelect(userid){
     this.selectuserid=userid;
  }

  yo(){
    this.animalService.getUser().subscribe(data=> {
    })
  }
  ngOnInit() {
    this.yo();
  }

}