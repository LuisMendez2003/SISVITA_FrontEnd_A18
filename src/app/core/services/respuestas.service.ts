import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http: HttpClient) {}

  getRespuestas(): Observable<any>  {
    return this.http.get<any>(`${this.baseUrl}/respuestas`);
  }

}
