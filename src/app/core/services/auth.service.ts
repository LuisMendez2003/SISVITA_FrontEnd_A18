import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';
  //private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http:HttpClient) { }

  login(email:string, contrasena: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/usuarios/login`,{email,contrasena});
  }
}
