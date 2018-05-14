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
    let body = new URLSearchParams();
    body.set('animal_type', String(animalType));
    body.set('race', String(animalRace));
    body.set('profile', String(profile));
    body.set('state', String(animalState));
    body.set('name', String(animalName));
    body.set('color', String(animalColor));
    body.set('age', String(animalAge));
    body.set('genre', String(animalGenre));
    body.set('vaccinated', String(vaccinated));
    body.set('description', String(description));

    return this.http.post("http://127.0.0.1:8000/nuevo_animal", body, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
}
