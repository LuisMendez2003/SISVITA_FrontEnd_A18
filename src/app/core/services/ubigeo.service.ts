import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  //Obtener departamentos
  getDepartamentos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.config.baseUrl}/departamentos`).pipe(
      map((response: any) => response.data as any[])
    );
  }

  //Obtener provincias por departamento_id
  getProvinciasByDepartamento(idDepartamento: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.baseUrl}/provincias/departamento/${idDepartamento}`).pipe(
      map((response: any) => response.data as any[])
    );
  }

  //Obtener Distritos por provincia_id
  getDistritosByProvincia(idProvincia: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.baseUrl}/distritos/provincia/${idProvincia}`).pipe(
      map((response: any) => response.data as any[])
    );
  }

}
