import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {
  public animales;
  constructor(private animalService: AnimalService) {

  }

  getAnimals(){
    this.animalService.getAnimals().subscribe(data=> {
        this.animales=data;
    })
    
  }
  
  getUserAnimals(id){
    this.animalService.getUserAnimals(id).subscribe(data=> {
        this.animales=data;
    })
    
  }

  ngOnInit() {
    this.getAnimals();
  }

}