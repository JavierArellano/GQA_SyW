import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth0.service';


@Injectable()
export class AnimalService {


  constructor(private http: Http, private authService: AuthService) { }

  aut(){
  	this.authService.authenticate();
  }

  getAnimals(){
  	return this.http.get("http://127.0.0.1:8000/animal/", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
  getUserAnimals(id){
  	return this.http.get("http://127.0.0.1:8000/user?user_id="+id, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
  postAnimal(animalType, animalRace, profile, animalState, animalName, animalColor, animalAge, animalGenre, vaccinated, description){
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
    return this.http.post("http://127.0.0.1:8000/nuevo_animal", body, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
}
