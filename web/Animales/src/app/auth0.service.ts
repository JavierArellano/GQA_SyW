import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


// Important Documentation to read https://github.com/PhilipGarnero/django-rest-framework-social-oauth2

@Injectable()
export class AuthService {

  public authenticated = false;

  constructor(
    private http: Http,
  ) {
    const token = this.getAccessToken();
    if (token) {
      this.authenticated = true;
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  authenticate(user: any) {

    // curl -X POST -d "client_id=<client_id>&client_secret=<client_secret>&grant_type=password&username=<user_name>&password=<password>" http://localhost:8000/auth/token

    const body = {
      'grant_type': 'password',
      'client_id': 'QziqygUeN9sOZNfn7UzsoVzJxJSmNh98EvobaEhY',
      'client_secret': 'pytNUOoYHf0qq0oFb5ZqfOQNTlpOU7S7mItBAAhA6RKcQIzsdFj1VxuzDikdG9KpCICS7kYF3gB2Ux6r7mHdlAZ90WSwEJl7P01sRCyR1OWguDajuyCXbglaFFkXGzfr',
      'username': user.username,
      'password': user.password
    };

    const url = `http://127.0.0.1:8000/auth/token/`;
    return this.http.post(url, body)
    .toPromise()
    .then(
      (response) => {
        this.setAccessToken(response.json().access_token);
        this.setRefreshToken(response.json().refresh_token);
        this.authenticated = true;
        return true;
      },
      (error) => {
        const error2 = 'Usuario o contraseña incorrectos';
        console.log(JSON.stringify(error2));
        return Promise.reject(error2);
      }
    );
  }

  register(user: any) {

    const body = {
      'username': user.username,
      'password1': user.password1,
      'password2': user.password2,
      'email': user.email
    };

    const url = `http://127.0.0.1:8000/rest-auth/registration/`;
    return this.http.post(url, body)
    .toPromise()
    .then(
      (response) => {
        return Promise.resolve('ok');
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  refresh_token() {

    // curl -X POST -d "grant_type=refresh_token&client_id=<client_id>&client_secret=<client_secret>&refresh_token=<your_refresh_token>" http://localhost:8000/auth/token

    const refresh_token = this.getRefreshToken();

    const body = {
      'grant_type': 'refresh_token',
      'client_id': 'QziqygUeN9sOZNfn7UzsoVzJxJSmNh98EvobaEhY',
      'client_secret': 'pytNUOoYHf0qq0oFb5ZqfOQNTlpOU7S7mItBAAhA6RKcQIzsdFj1VxuzDikdG9KpCICS7kYF3gB2Ux6r7mHdlAZ90WSwEJl7P01sRCyR1OWguDajuyCXbglaFFkXGzfr',
      'refresh_token': refresh_token
    };

    const url = `http://127.0.0.1:8000/auth/token/`;
    return this.http.post(url, body)
      .toPromise()
      .then(
        (response) => {
          this.setAccessToken(response.json().access_token);
          this.setRefreshToken(response.json().refresh_token);
          this.authenticated = true;
        });
  }

  // Deprecated
  resetPassword(email) {

    // curl -X POST -d "email=bukosabino@gmail.com" https://wuauapp.com/rest-auth/password/reset/

    const url = `http://127.0.0.1:8000/rest-auth/password/reset/`;
    const body = {
      'email': email
    };

    return this.http.post(url, body)
      .toPromise()
      .then(
        (response) => {
          return Promise.resolve(1);
        },
        (error) => {
          const error2 = 'Error reseteando la contraseña de usuario.';
          console.log(JSON.stringify(error));
          return Promise.reject(error2);
        }
      );
  }

  convertTokenFbtoOauth(token: any) {

    // curl -X POST -d "grant_type=convert_token&client_id=''&client_secret=''&backend=facebook&token=''" https://wuauapp.com/auth/convert-token

    const url = `http://127.0.0.1:8000/auth/convert-token/`;
    const body = {
      'grant_type': 'convert_token',
      'client_id': 'QziqygUeN9sOZNfn7UzsoVzJxJSmNh98EvobaEhY',
      'client_secret': 'pytNUOoYHf0qq0oFb5ZqfOQNTlpOU7S7mItBAAhA6RKcQIzsdFj1VxuzDikdG9KpCICS7kYF3gB2Ux6r7mHdlAZ90WSwEJl7P01sRCyR1OWguDajuyCXbglaFFkXGzfr',
      'backend': 'facebook',
      'token': token
    };

    return this.http.post(url, body)
      .toPromise()
      .then(
        (response) => {
          this.setAccessToken(response.json().access_token);
          this.setRefreshToken(response.json().refresh_token);
          this.authenticated = true;
        },
        (error) => {
          const error2 = 'Error convirtiendo el token de facebook al sistema';
          return Promise.reject(error2);
        }
      );
  }

  logout() {
    this.authenticated = false;
    this.deleteAccessToken();
    this.deleteRefreshToken();
    localStorage.removeItem('user_django');
    localStorage.removeItem('login_type');
  }

  getHeaders() {
    const access_token = this.getAccessToken();
    const contentHeadersPrivate = new Headers();
    contentHeadersPrivate.append('Accept', 'application/json');
    contentHeadersPrivate.append('Content-Type', 'application/x-www-form-urlencoded');
    contentHeadersPrivate.append('Authorization', 'Bearer ' + access_token);
    const headers = {
      headers: contentHeadersPrivate
    };
    return headers;
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  deleteAccessToken() {
    localStorage.removeItem('access_token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  deleteRefreshToken() {
    localStorage.removeItem('refresh_token');
  }

}
