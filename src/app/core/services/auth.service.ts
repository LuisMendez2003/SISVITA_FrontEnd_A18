import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

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
  
  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http:HttpClient) { }

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  getStudentIdByUserId(userId: string): Observable<string> {
    const userIdNum = parseInt(userId, 10);
    return this.http.get<{ data: { id_estudiante: string } }>(`${this.baseUrl}/estudiante/usuario/${userIdNum}`)
      .pipe(
        map(response => response.data.id_estudiante),
        catchError(error => {
          console.error('Error al obtener el id_estudiante:', error);
          return of(''); // Devolver una cadena vacía si hay un error
        })
      );
  }
}

