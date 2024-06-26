import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable()
export class TestService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  getTests(): Observable<any> {
    return this.http.get<any>(`${this.config.baseUrl}/tests`);
  }

  getTestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.config.baseUrl}/test/${id}`).pipe(
      map(response => response.data) 
    );
  }
}

