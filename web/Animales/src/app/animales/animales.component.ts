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
  constructor(private animalService: AnimalService) {

  }

  aut(){
    this.animalService.aut()
    this.logged = true;
    this.getAnimals();
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