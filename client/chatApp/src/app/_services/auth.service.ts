import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const AUTH_API = 'http://localhost:8800/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + 'signin', {
      username,
      password
    }, httpOptions);
  }

 

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  getUsers = () => {
    return this.http.get(environment.API_ENDPOINT +'getUsers')
        .pipe(map((body: any) => body));

}
}
