import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http:HttpClient) { }

  login(email:string, contrasena: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/usuarios/login`,{email,contrasena});
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private userId: string = '';

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }
}
