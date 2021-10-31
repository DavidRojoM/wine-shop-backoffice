import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WineItem } from '../interfaces/wine-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchWinesService {
  private API_URL = `http://localhost:3000/api/wines`;

  public wines: WineItem[];
  constructor(private http: HttpClient) {
    this.wines = [];
  }

  public getWines(): Observable<WineItem[]> {
    return this.http.get<WineItem[]>(this.API_URL);
  }

  public createWine(wine: WineItem) {
    return this.http.post(this.API_URL, wine).subscribe(
      (res) => {
        wine._id = Object.values(res)[0];
        this.wines = [...this.wines, wine];
      },
      (error) => console.error(error)
    );
  }

  public editWine(wine: WineItem) {
    return this.http.put(`${this.API_URL}/${wine._id}`, wine).subscribe(
      (res) => {
        this.wines = this.wines.map((currentWine) => {
          if (currentWine._id === wine._id) {
            return wine;
          } else {
            return currentWine;
          }
        });
        console.log(res);
      },
      (error) => console.error(error)
    );
  }

  public deleteWine(wine: WineItem) {
    return this.http.delete(`${this.API_URL}/${wine._id}`).subscribe(
      (res) => {
        this.wines = this.wines?.filter(
          (wineItem) => wineItem._id !== wine._id
        );
        console.log(res);
      },
      (error) => console.error(error)
    );
  }
}
