import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {
  public animales;
  public selectuserid;
  public logged;
  public datosPost;
  public regPost;
  constructor(private animalService: AnimalService) {

  }

  aut(){
    localStorage.setItem('user', 'anon');
    this.animalService.aut({username:'anon',password:'anonimous'})
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

  addAnimal(animalType, animalRace, profile,animalState, animalName, animalColor, animalAge, animalGenre, vaccinated, description){
    this.animalService.postAnimal(animalType, animalRace, profile, animalState, animalName, animalColor, animalAge, animalGenre, vaccinated, description).subscribe(
      data=> {
        this.datosPost=data;
      })
    //this.getAnimals();  
  }
  
  onSelect(userid){
     this.selectuserid=userid;
  }

  ngOnInit() {
    this.aut();
  }

}