import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavetestService {

  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http: HttpClient) { }

  realizacionTest(id_test: number, id_estudiante: string, fecha: Date): Observable<any> {
    return this.http.post(`${this.baseUrl}/realizaciontest`, { id_test, id_estudiante, fecha });
  }

  respuesta(id_realizaciontest: number, alternativa: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/respuesta`, { id_realizaciontest, alternativa });
  }
}
