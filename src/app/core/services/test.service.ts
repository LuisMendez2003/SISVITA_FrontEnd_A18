import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'https://dsw-exposicionparcial-crud.onrender.com';

  constructor(private http: HttpClient) {}

  getTests(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tests`);
  }

  getTestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/test/${id}`).pipe(
      map(response => response.data) 
    );
  }
}
