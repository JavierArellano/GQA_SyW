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
    return this.http.get("http://127.0.0.1:8000/yo", this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getRaces() {
    return this.http.get("http://127.0.0.1:8000/tipo", this.authService.getHeaders())
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

  postAnimal(form){
    let formData = this.prepareSave(form);
    return this.http2.post("http://127.0.0.1:8000/xmlnuevo", formData, this.getHeaders())
      .map((response: Response) => response.json());
  }

  private prepareSave(form):any{
    console.log(form);
    let input = new FormData();
    input.append('animal_type', form.type);
    input.append('race', form.race);
    input.append('state', form.state);
    input.append('name',form.name);
    input.append('color', form.color);
    input.append('age', form.age);
    input.append('genre', form.genre);
    input.append('vaccinated', form.vaccinated);
    input.append('description', form.description);
    input.append('file', form.image);
    console.log(input);
    return input;
  }

  getHeaders() {
    const access_token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + access_token
      })
    }
    return httpOptions;
  }
}
