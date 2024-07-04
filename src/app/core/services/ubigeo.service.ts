import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  //Obtener departamentos
  getDepartamentos(): Observable<any>{
    return this.http.get<any[]>(`${this.config.baseUrl}/departamentos`)
  }

  //Obtener provincias por departamento_id
  getProvinciasByDepartamento(idDepartamento: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.baseUrl}/provincias/departamento/${idDepartamento}`);
  }

  //Obtener Distritos por provincia_id
  getDistritosByProvincia(idProvincia: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.baseUrl}/distritos/provincia/${idProvincia}`);
  }

}
