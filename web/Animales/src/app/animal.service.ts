import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth0.service';


@Injectable()
export class AnimalService {
  logged:boolean=false;
  constructor(private http: Http, private http2: HttpClient,private authService: AuthService) {}

  isLogged(){
    return this.logged;
  }
  setLogged(x){
    this.logged=x;
  }

  forgot(body:any){
    console.log(body);
    return this.http.post("http://127.0.0.1:8000/reset/password/", body)
      .map((response: Response) => response.json());
  }
  change(urldata:any, body:any){
    console.log(body);
    return this.http.post("http://127.0.0.1:8000/new/password/"+urldata+"/", body)
      .map((response: Response) => response.json());
  }

  aut(user: any){
  	return this.authService.authenticate(user);
  }
  
  isAuthenticated(){
  	return this.authService.isAuthenticated()
  }

  register(body:any){
  	console.log(body)
    return this.http.post("http://127.0.0.1:8000/registro", body)
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
    return this.http.get("http://127.0.0.1:8000/tipo")
      .map((response: Response) => response.json());
  }

  getCyties() {
    return this.http.get("http://127.0.0.1:8000/ciudades")
      .map((response: Response) => response.json());
  }

  getAnimals(){
    return this.http.get("http://127.0.0.1:8000/animal/")
      .map((response: Response) => response.json());
  }

  getMyAnimals(){
    return this.http.get("http://127.0.0.1:8000/my_animals/", this.authService.getHeaders())
      .map((response: Response) => {
        if (response.status != 200){
          this.authService.refresh_token()

        }
        else{
          return response.json()
        }
      });
  }

  getAnimal(id){
  	return this.http.get("http://127.0.0.1:8000/animal?id="+id)
      .map((response: Response) => response.json());
  }

  getUserAnimals(id){
  	return this.http.get("http://127.0.0.1:8000/animal?profile_id="+id, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  postAnimal(form){
    return this.http.post("http://127.0.0.1:8000/nuevo_animal", form, this.authService.getHeaders())
      .map((response: Response) => {
        if (response.status != 200){
          this.authService.refresh_token()
        }
        else{
          response.json()
        }
      });
  }
}
