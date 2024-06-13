import { Injectable } from '@angular/core';
import { Pregunta } from '../interfaces/pregunta';
import { Alternativa } from '../interfaces/alternativa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http: HttpClient) { }

  getByTest(id_test:number): Observable<Pregunta[]>{
    return this.http.get<{ data: Pregunta[] }>(`${this.baseUrl}/preguntas`).pipe(
      map(response => response.data.filter(pregunta => pregunta.id_test === id_test))
    );
  }

  getByQuestion(id_pregunta:number): Observable<Alternativa[]>{
    return this.http.get<{ data: Alternativa[] }>(`${this.baseUrl}/alternativas`).pipe(
      map(response => response.data.filter(alternativa => alternativa.id_pregunta === id_pregunta))
    );
  }
}
