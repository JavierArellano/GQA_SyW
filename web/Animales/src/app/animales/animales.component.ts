import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  getAnimals(){
    this.animalService.getAnimals().subscribe(data=> {
        this.animales=data;
    })
    
  }
  
  onSelect(userid){
     this.selectuserid=userid;
  }

  deleteAnimal(id){
    let data = JSON.stringify({"id":id})
    this.animalService.deleteAnimal(data).subscribe(data=> {
    })
  }

  yo(){
    this.animalService.getUser().subscribe(data=> {
    })
  }
  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.getAnimals();
    }
  }

}