import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../interfaces/test';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'https://dsw-exposicionparcial-crud.onrender.com'; // URL base del backend

  constructor(private http: HttpClient) {}

  getTests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tests`);
  }
}
