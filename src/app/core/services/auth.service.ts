import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private config: ConfigService) { }

  login(email:string, contrasena: string): Observable<any>{
    return this.http.post(`${this.config.baseUrl}/usuarios/login`,{email,contrasena});
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/usuario`, data);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private userId: string = '';

  constructor(private http:HttpClient, private config: ConfigService) { }

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  getStudentIdByUserId(userId: string): Observable<string> {
    const userIdNum = parseInt(userId, 10);
    return this.http.get<{ data: { id_estudiante: string } }>(`${this.config.baseUrl}/estudiante/usuario/${userIdNum}`)
      .pipe(
        map(response => response.data.id_estudiante),
        catchError(error => {
          console.error('Error al obtener el id_estudiante:', error);
          return of(''); 
        })
      );
  }
}

