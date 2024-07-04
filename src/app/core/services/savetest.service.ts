import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SavetestService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  realizacionTest(id_test: number, id_estudiante: string, fecha: Date): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/realizaciontest`, { id_test, id_estudiante, fecha });
  }

  respuesta(id_realizaciontest: number, alternativa: number): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/respuesta`, { id_realizaciontest, alternativa });
  }

  actualizarPuntaje(id_realizaciontest: number): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/actualizar_puntaje`, { id_realizaciontest });
  }
}
