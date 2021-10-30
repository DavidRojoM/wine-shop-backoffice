import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WineItem } from '../interfaces/wine-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchWinesService {
  private API_URL = `http://localhost:3000/api/wines`;
  constructor(private http: HttpClient) {}

  public getWines(): Observable<WineItem[]> {
    return this.http.get<WineItem[]>(this.API_URL);
  }
}
