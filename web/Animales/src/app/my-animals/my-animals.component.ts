import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.css']
})
export class MyAnimalsComponent implements OnInit {
	public animales;

  constructor(private animalService: AnimalService) { }

  getMyAnimals(){
    this.animalService.getMyAnimals().subscribe(data=> {
        this.animales=data;
    })
    
  }
  ngOnInit() {
  	this.getMyAnimals();
  }

}
