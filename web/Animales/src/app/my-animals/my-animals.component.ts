import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.css']
})
export class MyAnimalsComponent implements OnInit {
	public animales;
  public razas;
  public tipos;
  private profile;

  constructor(private animalService: AnimalService) { }

  getMyAnimals(){
    this.animalService.getMyAnimals().subscribe(data=> {
        this.animales=data;
        this.profile = data[0].profile;
    })
    
  }

  deleteAnimal(id, index){
    this.animales.splice(index,1)
    let data = JSON.stringify({"id":id})
    this.animalService.deleteAnimal(data).subscribe(data=> {})
    
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
    this.animalService.getFilterAnimals(tipo,raza,this.profile).subscribe(data=> {
        this.animales=data;
    })
  }
  ngOnInit() {
  	this.getMyAnimals();
    this.getRaces();

    this.animalService.authService.header('mios');
  }

}
