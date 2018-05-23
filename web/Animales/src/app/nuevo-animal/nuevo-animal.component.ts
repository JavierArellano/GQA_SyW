import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../animal.service';


@Component({
  selector: 'app-nuevo-animal',
  templateUrl: './nuevo-animal.component.html',
  styleUrls: ['./nuevo-animal.component.css']
})
export class NuevoAnimalComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  tipos;
  razas;
  tipoObj: string;
  razaObj: string;
  estadoObj:string;
  estados = ['Adopcion','Perdido','Encontrado','Acogida','Otro'];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private animalService: AnimalService, private fb:FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      "type": null,
      "race": null,
      "state": null,
      "name": '',
      "color": '',
      "age": '',
      "genre": '',
      "vaccinated": null,
      "description": '',
      "image": null
    });
  }

  addAnimal(animalType, animalRace, animalState, animalName, animalColor, animalAge, animalGenre, vaccinated, description){
    let data = {
	    "animal_type": String(animalType),
	    "race": String(animalRace),
	    "state": String(animalState),
	    "name": String(animalName),
	    "color": String(animalColor),
	    "age": String(animalAge),
	    "genre": String(animalGenre),
	    "vaccinated": String(vaccinated),
	    "description": String(description)
	  }
    let body = JSON.stringify(data);
    console.log(body);
    this.animalService.postAnimal(body).subscribe(
      data=> {
      })
  }
  onChangeType(tipo){
    this.razas = this.tipos[tipo-1].race;
    this.form.get('type').setValue(tipo);
  }

  onChangeRace(raza){ 
    this.form.get('race').setValue(raza);
  }

  onChangeState(state){
    this.form.get('state').setValue(state);
  }

  onFileChange(event){
    if ( event.target.files.length > 0 ) {
      let file = event.target.files[0];  
      this.form.get('image').setValue(file);
      console.log(this.form);
    }
  }

  onSubmit(){
    this.loading=true;
    this.animalService.postAnimal(this.form.value).subscribe(
      data => {
        this.loading=false;
      }
    )
  }

  clearFile(){
    this.form.get("image").setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  

  getRaces() {
    this.animalService.getRaces().subscribe(
      data => {
        this.tipos = data;
        this.razas = data[0].race;
      })
  }

  ngOnInit() {
    this.getRaces();
  }

}
