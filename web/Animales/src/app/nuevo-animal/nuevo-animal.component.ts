import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { AnimalService } from '../animal.service';


@Component({
  selector: 'app-nuevo-animal',
  templateUrl: './nuevo-animal.component.html',
  styleUrls: ['./nuevo-animal.component.css']
})
export class NuevoAnimalComponent implements OnInit {
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(private animalService: AnimalService) { }

  addAnimal(animalType, animalRace, profile,animalState, animalName, animalColor, animalAge, animalGenre, vaccinated, description){
    let data = {
	    "animal_type": String(animalType),
	    "race": String(animalRace),
	    "profile": String(profile),
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
    this.upload(body);
  }

  upload(body) {
  	console.log('upload');
  	console.log(body);
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    formData.append('body',body);
	  if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        formData.append('file[]', inputEl.files.item(i));
      }
    }
    this.animalService.postAnimal(body).subscribe(
      data=> {
      })
  }

  ngOnInit() {
  }

}
