import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth0.service';


@Injectable()
export class AnimalService {


  constructor(private http: Http, private authService: AuthService) { }

  aut(user: any){
  	this.authService.authenticate(user);
  }
  
  isAuthenticated(){
  	this.authService.isAuthenticated()
  }

  register(body:any){
  	console.log(body)
    return this.http.post("http://127.0.0.1:8000/registro", body, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getUser() {
    return this.http.get("http://127.0.0.1:8000/yo", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getAnimals(){
  	return this.http.get("http://127.0.0.1:8000/animal/", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getUserAnimals(id){
  	return this.http.get("http://127.0.0.1:8000/user?user_id="+id, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  postAnimal(datos){
  	console.log(datos);
    return this.http.post("http://127.0.0.1:8000/nuevo_animal", datos, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
}
