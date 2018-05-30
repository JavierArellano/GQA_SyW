import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth0.service';


@Injectable()
export class AnimalService {


  constructor(private http: Http, private http2: HttpClient,private authService: AuthService) { }

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

  deleteAnimal(body){
    return this.http.post("http://127.0.0.1:8000/delete_animal", body, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getUser() {
    return this.http.get("http://127.0.0.1:8000/user", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getRaces() {
    return this.http.get("http://127.0.0.1:8000/tipo", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getCyties() {
    return this.http.get("http://127.0.0.1:8000/ciudades", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getAnimals(){
    return this.http.get("http://127.0.0.1:8000/animal/", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getAnimal(id){
  	return this.http.get("http://127.0.0.1:8000/animal?id="+id, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getUserAnimals(id){
  	return this.http.get("http://127.0.0.1:8000/animal?profile_id="+id, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  postAnimal(form){
    return this.http.post("http://127.0.0.1:8000/nuevo_animal", form, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
}
