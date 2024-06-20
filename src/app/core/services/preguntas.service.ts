import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import { Alternativa } from '../models/alternativa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getByTest(id_test:number): Observable<Pregunta[]>{
    return this.http.get<{ data: Pregunta[] }>(`${this.config.baseUrl}/preguntas`).pipe(
      map(response => response.data.filter(pregunta => pregunta.id_test === id_test))
    );
  }

  getByQuestion(id_pregunta:number): Observable<Alternativa[]>{
    return this.http.get<{ data: Alternativa[] }>(`${this.config.baseUrl}/alternativas`).pipe(
      map(response => response.data.filter(alternativa => alternativa.id_pregunta === id_pregunta))
    );
  }
}
