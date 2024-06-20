import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  getRespuestas(): Observable<any>  {
    return this.http.get<any>(`${this.config.baseUrl}/respuestas`);
  }

  getPreguntasAlternativasByTestId(id_test: number): Observable<any>{
    return this.http.get(`${this.config.baseUrl}/test/${id_test}/preguntas-alternativas`);
  }

}
