import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';


// Providers
import { AuthService } from './auth0.service';

@Injectable()
export class APIService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }

  getUser() {
    const url = `http://127.0.0.1:8000/API/user/`;
    return this.http.get(url, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getCities() {
    const url = `http://127.0.0.1:8000/API/cities/`;
    return this.http.get(url, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getServices() {
    const url = `http://127.0.0.1:8000/API/services/`;
    return this.http.get(url, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getMyOps() {
    const url = `http://127.0.0.1:8000/API/myops/`;
    return this.http.get(url, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getCity(latitude: Number, longitud: Number) {
    const url = `http://127.0.0.1:8000/API/city/?lat=${latitude}&lon=${longitud}`;
    return this.http.get(url, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getCityPost(latitude: Number, longitud: Number) {
    const url = `http://127.0.0.1:8000/API/city/`;

    let body = new URLSearchParams();
    body.set('lat', String(latitude));
    body.set('lon', String(longitud));

    return this.http.post(url, body, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }

  getBusiness(city_id: Number) {
    const url = `http://127.0.0.1:8000/API/business/?city=${city_id}`;
    return this.http.get(url, this.authService.getHeaders())
      .map((response: Response) => response.json());
  }
}
