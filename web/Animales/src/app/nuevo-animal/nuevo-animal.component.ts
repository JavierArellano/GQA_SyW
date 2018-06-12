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
      "animal_type": null,
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

  onChangeType(tipo){
    this.razas = this.tipos[tipo-1].race;
    this.form.get('animal_type').setValue(tipo);
  }

  onChangeRace(raza){ 
    this.form.get('race').setValue(raza);
  }

  onChangeState(state){
    this.form.get('state').setValue(state);
  }
  
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
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

    this.animalService.authService.header('nuevo');
  }

}
