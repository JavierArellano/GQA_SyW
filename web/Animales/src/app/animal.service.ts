import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnimalService {

  constructor(private http: HttpClient) { }

  getAnimals(){
  	return this.http.get("http://127.0.0.1:8000")
  }

}
