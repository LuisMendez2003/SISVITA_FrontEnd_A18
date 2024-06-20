import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealizacionTestService {
  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http: HttpClient) {}

  getRealizacionesTest(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/realizaciontests`);
  }
}
