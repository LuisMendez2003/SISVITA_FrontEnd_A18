import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RealizacionTestService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  getRealizacionesTest(): Observable<any> {
    return this.http.get<any>(`${this.config.baseUrl}/realizaciontests`);
  }
}
