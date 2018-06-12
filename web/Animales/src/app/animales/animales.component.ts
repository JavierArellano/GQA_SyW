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
  tipos;
  razas;



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

  onChangeType(tipo){
    this.razas = this.tipos[tipo-1].race;;
  }

  getRaces() {
    this.animalService.getRaces().subscribe(
      data => {
        this.tipos = data;
        this.razas = data[0].race;
      })
  }

  search(tipo, raza){
    let profile=0;
    this.animalService.getFilterAnimals(tipo,raza,profile).subscribe(data=> {
        this.animales=data;
    })
  }

  yo(){
    this.animalService.getUser().subscribe(data=> {
    })
  }
  ngOnInit() {
    this.getAnimals();
    this.getRaces();
    this.animalService.authService.header('home');
  }

}