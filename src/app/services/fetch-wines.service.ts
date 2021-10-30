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

  public createWine(wine: WineItem) {
    return this.http.post(this.API_URL, wine).subscribe(
      (res) => console.log(res),
      (error) => console.error(error)
    );
  }

  public editWine(wine: WineItem) {
    return this.http.put(`${this.API_URL}/${wine._id}`, wine).subscribe(
      (res) => console.log(res),
      (error) => console.error(error)
    );
  }

  public deleteWine(wine: WineItem) {
    return this.http.delete(`${this.API_URL}/${wine._id}`).subscribe(
      (res) => console.log(res),
      (error) => console.error(error)
    );
  }
}
