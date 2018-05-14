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
  constructor(private animalService: AnimalService) {

  }

  aut(){
    this.animalService.aut()
  }

  getAnimals(){
    this.animalService.getAnimals().subscribe(data=> {
        this.animales=data;
    })
    
  }
  
  onSelect(userid){
     this.selectuserid=userid;
  }

  ngOnInit() {
    this.getAnimals();
  }

}